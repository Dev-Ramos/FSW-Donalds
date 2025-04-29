"use client";
import { ConsumptionMethod } from "@prisma/client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConsumptionMethodOptionProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
  slug: string;
}

export const ConsumptionMethodOption = ({
  imageAlt,
  imageUrl,
  buttonText,
  option,
  slug,
}: ConsumptionMethodOptionProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1}}
      transition={{ type: "spring", bounce: 0.7 , duration: 2}}
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      onTap={() => {
        linkRef.current?.click();
      }}
    >
      <Card>
        <CardContent className="flex flex-col items-center gap-8 py-8">
          <motion.div
            animate={{ y:[0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity}}
            className="relative h-[80px] w-[80px]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-contain"
            />
          </motion.div>
          <Button variant="secondary" className="rounded-full" asChild>
            <Link
              ref={linkRef}
              href={`/${slug}/menu?consumptionMethod=${option}`}
            >
              {buttonText}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
