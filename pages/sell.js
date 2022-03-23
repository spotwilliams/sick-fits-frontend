import CreateProduct from "../components/CreateProduct";
import PleaseSignIn from "../components/PleaseSignIn";
import { appName } from "../config";
import Head from "next/head";

export default function SellPage() {
  return (
    <>
      {" "}
      <Head>
        <title>{appName}</title>
      </Head>
      <PleaseSignIn>
        <CreateProduct />
      </PleaseSignIn>
    </>
  );
}
