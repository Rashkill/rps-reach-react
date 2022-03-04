import { loadStdlib } from "@reach-sh/stdlib";
import { Account } from "@reach-sh/stdlib/dist/types/ETH";
import React, { createContext, useState, useMemo } from "react";

const reach = loadStdlib("ETH");

type UserInfoContextProps = {
  account?: Account;
  actualAddress?: string;
  faucet?: Account;
};

const UserInfoContext = createContext<UserInfoContextProps>({
  account: undefined,
  actualAddress: "Connecting...",
  faucet: undefined,
});

export const UserInfoProvider: React.FC = ({ children }) => {
  const [account, setAccount] = useState(undefined);
  const [faucet, setFaucet] = useState();
  const [actualAddress, setActualAddress] = useState("Connecting...");

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

  return (
    <UserInfoContext.Provider
      value={{
        account,
        actualAddress,
        faucet,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const MemberConsumer = UserInfoContext.Consumer;

export default UserInfoContext;
