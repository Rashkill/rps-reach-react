"reach 0.1";

const Player = {
  getHand: Fun([], UInt),
  seeOutcome: Fun([UInt], Null),
  seeOtherHand: Fun([UInt], Null),
};

export const main = Reach.App(() => {
  const Alice = Participant("Alice", {
    ...Player,
  });
  const Bob = Participant("Bob", {
    ...Player,
  });
  init();

  Alice.only(() => {
    const handAlice = declassify(interact.getHand());
  });
  Alice.publish(handAlice);
  commit();

  Bob.only(() => {
    const handBob = declassify(interact.getHand());
  });
  Bob.publish(handBob);

  const outcome = (handAlice + (4 - handBob)) % 3;
  commit();

  Alice.interact.seeOtherHand(handBob);
  Bob.interact.seeOtherHand(handAlice);
  each([Alice, Bob], () => {
    interact.seeOutcome(outcome);
  });
});
