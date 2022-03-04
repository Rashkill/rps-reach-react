import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "build/index.main.mjs";
import { Account, Backend } from "@reach-sh/stdlib/dist/types/ETH";
import React, { createContext, useState, useMemo } from "react";
import { Contract } from "@reach-sh/stdlib/dist/types/ETH_like";

const reach = loadStdlib("ETH");

const HAND = ["Rock", "Paper", "Scissors"];
const OUTCOME = ["Bob wins", "Draw", "Alice wins"];

type UserInfoContextProps = {
  account?: Account;
  actualAddress?: string;
  faucet?: Account;
  role: "Deploy" | "Attach";
  outcome: string;
  contractInfo: string | undefined;
  selectRole: (role: "Deploy" | "Attach") => Promise<void> | null;
  runAction: (action: number, ctcInfo?: string) => void;
  setContractInfo: (ctcInfo: string) => void;
};

const UserInfoContext = createContext<UserInfoContextProps>({
  account: undefined,
  actualAddress: "Connecting...",
  faucet: undefined,
  role: "Attach",
  outcome: "",
  contractInfo: undefined,
  selectRole: () => null,
  runAction: () => null,
  setContractInfo: () => null,
});

export const UserInfoProvider: React.FC = ({ children }) => {
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [faucet, setFaucet] = useState<Account>();
  const [actualAddress, setActualAddress] = useState("Connecting...");

  const [role, setRole] = useState<"Deploy" | "Attach">("Attach");
  const [ctc, setCtc] = useState<Contract | undefined>(undefined);
  const [ctcInfoStr, setCtcInfoStr] = useState<string>();
  const [outcome, setOutcome] = useState<string>("");

  useMemo(async () => {
    try {
      const _acc = await reach.getDefaultAccount();
      setAccount(_acc);
      setActualAddress(await _acc.networkAccount.getAddress());
      setFaucet(await reach.getFaucet());
    } catch (error) {
      setActualAddress(`Error connecting to wallet`);
    }
  }, []);

  async function selectRole(_role: "Deploy" | "Attach") {
    setRole(_role);
    if (_role === "Deploy") {
      const _ctc = account?.contract(backend as Backend);
      setCtc(_ctc);
      console.log("Getting ContractInfo");
      setCtcInfoStr(JSON.stringify(await _ctc?.getInfo(), null, 2));
      console.log("done");
    }
  }
  function setContractInfo(_ctcInfoStr: string) {
    setCtcInfoStr(_ctcInfoStr);
  }

  async function runAction(action: number, ctcInfo?: string) {
    const interact = {
      getHand: () => {
        const hand = Math.floor(Math.random() * 3);
        console.log(
          `${role === "Deploy" ? "Alice" : "Bob"} played ${HAND[hand]}`
        );
        return hand;
      },
      seeOutcome: (_outcome: number) => {
        setOutcome(OUTCOME[_outcome]);
      },
    };
    if (ctcInfo && role === "Attach") {
      const _ctc = account?.contract(
        backend as unknown as Backend,
        JSON.parse(ctcInfo)
      );

      await backend.Bob(_ctc, interact);
    } else if (role === "Deploy") await backend.Alice(ctc, interact);
  }

  return (
    <UserInfoContext.Provider
      value={{
        account,
        actualAddress,
        faucet,
        role,
        outcome,
        contractInfo: ctcInfoStr,
        selectRole,
        runAction,
        setContractInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const MemberConsumer = UserInfoContext.Consumer;

export default UserInfoContext;
