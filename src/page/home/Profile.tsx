import { Nav } from "@/components/Nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserData } from "./hooks/useUserData";
import { SquarePen } from "lucide-react";
import LabledTextPros from "./components/LabledTextPros";

export const Profile = () => {
  const { data, isLoading, isError } = useUserData();
  console.log(data);
  return (
    <>
      <Card className="w-3/5 mx-auto mt-10 p-0 min-w-[600px]">
        <div className="w-1/4 ml-auto bg-pink-200 p-3 rounded-r-xl">
          <CardHeader className="space-y-2 py-4">
            <p>img</p>
            <CardTitle className="whitespace-nowrap text-lg truncate w-full">
              {data?.firstname} {data?.lastname}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2 break-words">
              <LabledTextPros label="username" value={data?.username!}/>
              <LabledTextPros label="password" value={"•".repeat(5)}/>
              <LabledTextPros label="email" value={data?.email!}/>
              <LabledTextPros label="city" value={data?.city!}/>
            </div>
          </CardContent>
          <div className="flex justify-end p-2">
            <SquarePen size={18} className="text-pink-800" />
          </div>
        </div>
      </Card>
    </>
  );
};
