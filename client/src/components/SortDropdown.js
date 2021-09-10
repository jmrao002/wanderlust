// import React, { useEffect } from "react";
// import { useQuery } from "@apollo/react-hooks";
// import { useStoreContext } from "../utils/GlobalState";
// import { UPDATE_SORT, UPDATE_CURRENT_SORT } from "../utils/actions";
// import { QUERY_SORT } from "../utils/queries";
// import { idbPromise } from "../utils/helpers";

// function SortDropdown() {
//   const [state, dispatch] = useStoreContext();

//   const { sortoptions } = state;

//   const { loading, data: sortData } = useQuery(QUERY_SORT);

//   useEffect(() => {
//     if (sortData) {
//       dispatch({
//         type: UPDATE_SORT,
//         sortoptions: sortData.sortoptions,
//       });
//       sortData.sortoptions.forEach((sortoption) => {
//         idbPromise("sortoptions", "put", sortoption);
//       });
//     } else {
//       idbPromise("sortoptions", "get").then((sortoptions) => {
//         dispatch({
//           type: UPDATE_SORT,
//           sortoptions: sortoptions,
//         });
//       });
//     }
//   }, [sortData, loading, dispatch]);

//   const handleSelect = (id) => {
//     dispatch({
//       type: UPDATE_CURRENT_SORT,
//       currentSort: id,
//     });
//   };
//   // update look and feel of below
//   return (
//     <div>
//       <label for="sortoptions">Sort by:</label>
//       <select name="sortoptions" id="sortoptions">
//         {sortoptions.map((item) => (
//           <option
//             key={item._id}
//             onSelect={() => {
//               handleSelect(item.name);
//             }}
//           >
//             {item.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default SortDropdown;
