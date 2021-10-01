import fs from 'fs';
import path from 'path';

// get filepath to data directory
const dataDir = path.join(process.cwd(), 'data');

// function returns ids for all json objects in array
// called from [cid].js getStaticPaths() function 
export function getAllCIds() {
  // get filepath to json file
  const filePath = path.join(dataDir, 'carinfo.json');
  // load json file contents
  const jsonString = fs.readFileSync(filePath, 'utf8');
  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonString);
  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {
      params: {
        cid: item.cid.toString()
      }
    }
  });
  // above code returns an array with nested obj values that looks like this:
  // [
  //   {
  //     params: {
  //       cid: 3
  //     }
  //   },
  //   {
  //     params: {
  //       cid: 2
  //     }
  //   }
  // ]
}

// function returns names and ids for all json objects in array, sorted by name property
export function getSortedCList() {
  // get filepath to json file
  const filePath = path.join(dataDir, 'carinfo.json');
  // load json file contents
  const jsonString = fs.readFileSync(filePath, 'utf8');
  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonString);
  // sort json array by name property
  jsonObj.sort(function (a, b) {
      return a.make.localeCompare(b.make);
  });

  // use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(item => {
    return {
      cid: item.cid.toString(),
      make: item.make
    }
  });
}

// called from [cid].js getStaticProps function
export async function getCData(idRequested) {

  // get filepath to json file
  const filePath = path.join(dataDir, 'carinfo.json');
  const filePath2 = path.join(dataDir, 'crelations.json');

  // load json file contents
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonString2 = fs.readFileSync(filePath2, 'utf8');

  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonString);
  const jsonObj2 = JSON.parse(jsonString2);

  // find object value in array that has matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.cid.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];

  // find matching owner_cid in prelations data model
  const objMatch2 = jsonObj2.filter(obj => {
    return obj.owner_cid.toString() === idRequested;
  }

  );
  if (objMatch2.length > 0) {
    // since we found an entry in prelations, now let's find all the rows 
    // of persons that have id in the array of related_pids
    const objMatch3 = jsonObj.filter(obj => {
      return objMatch2[0].related_cids.includes( obj.cid );
    }
    );

    if (objMatch3.length > 0) {
      objReturned.related = objMatch3;
    }
  }

  } else {
    objReturned = {};
  }
  // console.log(objReturned);

  // return object value found
  return objReturned;
}