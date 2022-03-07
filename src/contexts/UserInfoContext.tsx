import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "build/index.main.mjs";
import { Account, Backend } from "@reach-sh/stdlib/dist/types/ETH";
import React, { createContext, useState, useMemo } from "react";
import { Contract } from "@reach-sh/stdlib/dist/types/ETH_like";
import { useNavigate } from "react-router-dom";

const reach = loadStdlib("ETH");

const HAND = ["Rock", "Paper", "Scissors"];

type UserInfoContextProps = {
  account?: Account;
  actualAddress?: string;
  faucet?: Account;
  role: "Deploy" | "Attach";
  outcome: string;
  contractInfo: string | undefined;
  loadingContract: boolean;
  selectRole: (role: "Deploy" | "Attach") => Promise<void> | null;
  selectHand: (handNumber: number) => void;
  runAction: (ctcInfo?: string) => void;
  setContractInfo: (ctcInfo: string) => void;
};

const UserInfoContext = createContext<UserInfoContextProps>({
  account: undefined,
  actualAddress: "Connecting...",
  faucet: undefined,
  role: "Attach",
  outcome: "",
  contractInfo: undefined,
  loadingContract: false,
  selectRole: () => null,
  selectHand: () => null,
  runAction: () => null,
  setContractInfo: () => null,
});

export const UserInfoProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();

  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [faucet, setFaucet] = useState<Account>();
  const [actualAddress, setActualAddress] = useState("Connecting...");

  const [role, setRole] = useState<"Deploy" | "Attach">("Attach");
  const [hand, setHand] = useState<number>(0);
  const [ctc, setCtc] = useState<Contract | undefined>(undefined);
  const [ctcInfoStr, setCtcInfoStr] = useState<string>();
  const [loadingCtc, setLoadingCtc] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<string>("");
  const [OUTCOME, setOUTCOME] = useState<string[]>([
    "You lose",
    "Draw",
    "You win",
  ]);

  useMemo(async () => {
    try {
      const _acc = await reach.getDefaultAccount();
      setAccount(_acc);
      setActualAddress(await _acc.networkAccount.getAddress());
      setFaucet(await reach.getFaucet());
    } catch (error) {
      setActualAddress(`Error connecting to wallet`);
    }
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function selectRole(_role: "Deploy" | "Attach") {
    setRole(_role);
    navigate("/hands");
    if (_role === "Deploy") {
      setLoadingCtc(true);
      const _ctc = account?.contract(backend as Backend);
      setCtc(_ctc);
      setCtcInfoStr(JSON.stringify(await _ctc?.getInfo(), null, 2));
      setLoadingCtc(false);
    } else setOUTCOME(["You win", "Draw", "You lose"]);
  }
  function setContractInfo(_ctcInfoStr: string) {
    setCtcInfoStr(_ctcInfoStr);
  }

  function selectHand(handNumber: number) {
    setHand(handNumber);
    navigate("/connect");
  }

  async function runAction(ctcInfo?: string) {
    const interact = {
      getHand: () => {
        const strAction = `${role === "Deploy" ? "Host" : "Client"} played ${
          HAND[hand]
        }`;
        console.log(strAction);
        return hand;
      },
      seeOutcome: (_outcome: number) => {
        setOutcome(OUTCOME[_outcome]);
      },
    };
    if (ctcInfo && role === "Attach") {
      const _ctc = account?.contract(
        backend as unknown as Backend,
        ctcInfo as unknown as Promise<string>
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
        loadingContract: loadingCtc,
        selectRole,
        selectHand,
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
