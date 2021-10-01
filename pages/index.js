import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedPList } from '../lib/pdata';
import { getSortedCList } from '../lib/cdata';

export async function getStaticProps() {
  const allPData = getSortedPList();
  const allCData = getSortedCList();
  return {
    props: {
      allPData, allCData
    }
  }
}

export default function Home({ allPData, allCData }) {
  return (
      <Layout home>
        <h1>List of Names</h1>
        <div className="list-group">
          {allPData ?
            allPData.map(({ pid, name }) => (
            <Link key={pid} href={`/persons/${pid}`}>
              <a className="list-group-item list-group-item-action">{name}</a>
            </Link>
          ))
          : null }
        </div>
        <br/>
         <h1>List of Cars</h1>
        <div className="list-group">
          {allCData ?
          allCData.map(({ cid, make }) => (
            <Link key={cid} href={`/cars/${cid}`}>
              <a className="list-group-item list-group-item-action">{make}</a>
            </Link>
          ))
          : null }
        </div>

      </Layout>

  );
}

