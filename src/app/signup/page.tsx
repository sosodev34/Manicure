import { AuthForm } from "../components/AuthForm";
import { PageShell } from "../components/PageShell";

export default function SignupPage() {
  return (
    <PageShell>
      <AuthForm mode="signup" />
    </PageShell>
  );
}
