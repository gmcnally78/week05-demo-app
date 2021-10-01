// filesystem package/module
import fs from 'fs'; 
// path 
import path from 'path';

// use path to build a filepath to our data subdirectory
const dataDir = path.join( process.cwd(), "data" );

// console.log(dataDir);

export default function handler(req, res) {
  const filepath = path.join( dataDir, "persons.json" );

  const jsondata = fs.readFileSync( filepath, "utf8" );

  const jsonObj = JSON.parse( jsondata );

  jsonObj.sort(
    function(a,b) {
      return a.name.localeCompare(b.name);
    }
  );

  res.status(200).json( jsonObj );
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// cd// filesystem pachage/module
// import fs from 'fs';
// // path
// import path from 'path';

// // use pat to build a filepath to our data subdirectory
// const dataDir = path.join( process.cwd(), "data");
// // const carDataDir = path.join( process.cwd(), "cardata");

// // console.log(dataDir);

// export default function handler(req, res) {
//   const filepath = path.join( dataDir, "persons.json" );
//   // const filepath = path.join( cardataDir, "carinfo.json" );

// const jsondata = fs.readFileSync( filepath, "utf8" );

// const jsonObj = JSON.parse( jsondata );

// jsonObj.sort(
//   function(a,b) {
//     return a.name.localeCompare(b.name);
//   }
// );

//   res.status(200).json( jsonObj );
// }
// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// // export default function handler2(req, res) {
// //   const filepath = path.join( dataDir, "carinfo.json" );
 

// const jsondata = fs.readFileSync( filepath, "utf8" );

// const jsonObj = JSON.parse( jsondata );

// // jsonObj.sort(
// //   function(a,b) {
// //     return a.make.localeCompare(b.make);
// //   }
// // );

//   res.status(200).json( jsonObj );
// // }
// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction