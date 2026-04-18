import { AuthForm } from "../components/AuthForm";
import { PageShell } from "../components/PageShell";

export default function LoginPage() {
  return (
    <PageShell>
      <AuthForm mode="login" />
    </PageShell>
  );
}
