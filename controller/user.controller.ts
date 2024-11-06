import { asyncHandler } from "../utils/asyncHandler.ts";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new Error("Email Password required")
  }

//   const user = await prisma
});

export { loginUser };
