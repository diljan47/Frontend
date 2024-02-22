// const Category = () => {
//   const [dropdown, setDropdown] = useState(false);
//   return (
//     <div className="main-container">
//       <div className="category-cont">
//         <div className="filter-heading " onClick={() => setDropdown(!dropdown)}>
//           <span>Gender</span>
//           <FaAngleDown size={20} />
//         </div>
//         {dropdown && (
//           <div className="filter-sub">
//             {data.map(
//               (group, index) =>
//                 group.gender && (
//                   <div key={index}>
//                     {group?.gender.map((gen, i) => (
//                       <span className="sub-menu" key={i}>
//                         {gen}
//                       </span>
//                     ))}
//                   </div>
//                 )
//             )}
//           </div>
//         )}
//         {/* second cat */}
//         <div className="filter-heading " onClick={() => setDropdown(!dropdown)}>
//           <span>Gender</span>
//           <FaAngleDown size={20} />
//         </div>
//         {dropdown && (
//           <div className="filter-sub">
//             {data.map(
//               (group, index) =>
//                 group.gender && (
//                   <div key={index}>
//                     {group?.gender.map((gen, i) => (
//                       <span className="sub-menu" key={i}>
//                         {gen}
//                       </span>
//                     ))}
//                   </div>
//                 )
//             )}
//           </div>
//         )}
//       </div>

//       <div className="products-cont">sssds</div>
//     </div>
//   );
// };
