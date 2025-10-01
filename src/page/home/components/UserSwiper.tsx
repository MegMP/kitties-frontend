import { useState } from "react";
import type { FullFriendsResponse } from "../types/FullFriendResponse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LabledTextPros from "./LabledTextPros";
import { Heart, X } from "lucide-react";
import { useAddFriend } from "../hooks/useAddFriend";
import { motion, AnimatePresence } from "framer-motion";

interface UserSwiperProps {
  users: FullFriendsResponse[];
}

export const UserSwiper = ({ users }: UserSwiperProps) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const addMutation = useAddFriend();

  const handleExitComplete = () => {
    setDirection(null);
  };

  const accept = (id: string) => {
    setDirection("right");
    addMutation.mutate(id);
  };

  const decline = () => {
    setDirection("left");
    setIndex((prev) => prev + 1);
  };

  if (index >= users.length) {
    return <div className="text-center mt-10">No more users</div>;
  }

  return (
    <div className="relative w-3/5 mx-auto mt-10 min-w-[600px]">
      <AnimatePresence onExitComplete={handleExitComplete} mode="wait">
        <motion.div
          key={users[index].id}
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: direction === "right" ? 300 : -300,
          }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <Card className="p-0">
            <div className="w-1/4 ml-auto bg-pink-200 p-3 rounded-r-xl">
              <CardHeader className="space-y-2 py-4">
                <p>img</p>
                <CardTitle className="whitespace-nowrap text-lg truncate w-full">
                  {users[index].firstname} {users[index].lastname}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col space-y-2 break-words">
                  <LabledTextPros
                    label="username"
                    value={users[index].username}
                  />
                  <LabledTextPros label="city" value={users[index].city} />
                </div>
              </CardContent>
            </div>
          </Card>
          <div className="absolute top-1/2 right-[-40px] -translate-y-1/2">
            <Heart
              onClick={() => accept(users[index].id)}
              size={26}
              className="text-green-600 cursor-pointer"
            />
          </div>
          <div className="absolute top-1/2 left-[-40px] -translate-y-1/2">
            <X
              onClick={decline}
              size={26}
              className="text-red-600 cursor-pointer"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
