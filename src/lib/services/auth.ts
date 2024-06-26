import { getServerSession } from "next-auth";
import { authOptions } from "../config/auth";

export const getAuthSession = async () => await getServerSession(authOptions);
