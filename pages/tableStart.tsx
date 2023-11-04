import Layout from "@/components/Layout";
import Table from "@/components/Table";
import React from "react";
import { useSession, signIn } from "next-auth/react";

interface Props {}


const TableStartPage = (props: Props) => {
  return (
    <>
      <Layout>
        <Table />
      </Layout>
    </>
  );
};
export default TableStartPage;
