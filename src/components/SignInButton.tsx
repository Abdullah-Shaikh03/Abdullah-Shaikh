import { Button } from "./ui/button";
import SignIn from "./sign-in";

export const SignInButton = () => {
  return (
    <Button variant="outline" className="rounded-full">
      <SignIn />
    </Button>
  );
};
