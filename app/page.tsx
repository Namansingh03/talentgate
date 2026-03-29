import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Button>
        <Link href={"/signup"}>SIGNUP</Link>
      </Button>
    </div>
  );
}
