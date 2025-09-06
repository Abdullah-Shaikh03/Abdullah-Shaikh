import { signIn } from "@/auth";
import { FaGithub } from "react-icons/fa";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button type="submit">
        <FaGithub className="inline mr-2" size={4} />
      </button>
    </form>
  );
}
