import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ProductPage() {
  return (
    <div className="background-gray-500 rounded-xl border p-4">
      <h1>Product Page</h1>
      <Button>Click me</Button>
      <Input placeholder="Test the shadcn input" />
    </div>
  );
}

export default ProductPage;
