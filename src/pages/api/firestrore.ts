import type { APIRoute } from "astro";
import { app } from "../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const prerender = false;

const db = getFirestore("test1");

export const POST: APIRoute = async ({ request, redirect }) => {
  // CAN BE USED FOR UPDATING AS WELL!
  const data = await db.collection("test").doc("anySlug").set({
    test: "asdsaTEST2",
  });

  return new Response(JSON.stringify(data), {
    status: 201,
  });
};

export const GET = async () => {
  const list = (await db.collection("test").get()).docs;

  return new Response(JSON.stringify(list[0].data()), {
    status: 200,
  });
};

export const PUT: APIRoute = async ({ request, redirect }) => {
  const data = (
    await db.collection("test").where("test", "==", "asdsaTEST").get()
  ).docs[0].id;

  db.collection("test").doc(data).update({
    test: "BOBBYas",
  });

  return new Response(JSON.stringify(data), {
    status: 200,
  });

  return redirect("/dashboard");
};
