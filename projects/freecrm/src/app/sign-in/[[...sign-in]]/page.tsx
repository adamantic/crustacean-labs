import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <SignIn />
    </div>
  );
}
