import { updateAllTabel } from "../../../Models";
export default async function handler(req, res) {
  const ok = await updateAllTabel();
  if (!ok) {
    res.status(501).json({ message: "server error" });
  }
  res.status(200).json({ message: "ok" });
}
