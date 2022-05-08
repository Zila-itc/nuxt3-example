const useUserData = () =>
  useState("userData", () => {
    return {
      gameId: "",
      action: "",
      chars: [],
      words: [],
      user: {},
      tokens: 0,
    };
  });

export default useUserData;
