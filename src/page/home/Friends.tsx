import { Nav } from "@/components/Nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserRoundX } from "lucide-react";
import { Mail } from "lucide-react";
import { useFriendsData } from "./hooks/useFriendsData";
import { useDeleteFriend } from "./hooks/useDeleteFriend";

export const Friends = () => {
  const { data, isLoading, isError } = useFriendsData();
  const deleteMutation = useDeleteFriend();

  if (isLoading) return <p>Loading friends...</p>;
  if (isError) return <p>Failed to load friends.</p>;

  const deleteFriend = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <Card className="w-3/5 mx-auto mt-10 min-w-[600px]">
      <CardContent>
        {data?.map((friend, index) => (
          <div
            key={friend.userId ?? index}
            className="border-b-2 border-pink-100 p-3 flex items-center justify-between w-full"
          >
            <div className="flex space-x-6">
              <p>Img</p>
              <p className="flex space-x-3">
                <span>{friend.firstname}</span>
                <span>{friend.lastname}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="cursor-pointer">
                <Mail size={18} />
              </Button>
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={() => deleteFriend(friend.userId)}
              >
                <UserRoundX size={18} className="text-red-600" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
