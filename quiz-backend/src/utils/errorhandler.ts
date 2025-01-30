export const errorHandler = (res: any, error: any) => {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  };
  