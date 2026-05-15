import CompanyForm from "@/components/company/CompanyForm";

export default function SignupPage() {
  return (
    <div className="w-full h-screen bg-amber-50 flex items-center justify-center p-5">
      <div className="w-6xl h-auto bg-white border p-8 border-neutral-500 rounded-xl">
        <CompanyForm />
      </div>
    </div>
  );
}
