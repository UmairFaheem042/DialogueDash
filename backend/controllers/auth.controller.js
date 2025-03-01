const signUp = (req, res) => {
  res.send("SIGN UP");
};

const signIn = (req, res) => {
  res.send("SIGN IN");
};

const signOut = (req, res) => {
  res.send("SIGN OUT");
};

export { signIn, signUp, signOut };
