import { useParams, useNavigate, useLocation } from "react-router-dom";

const withRouter = (ClassComp) => {
  return (props) => {
    const match = { params: useParams() };
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <ClassComp
        {...props}
        match={match}
        navigate={navigate}
        location={location}
      />
    );
  };
};

// function withRouter(Children) {
//   return (props) => {
//     const match = { params: useParams() };
//     return <Children {...props} match={match} />;
//   };
// }

// const withRouter = (WrappedComponent) => (props) => {
//   const params = useParams();
//   const navigate = useNavigate();

//   return <WrappedComponent {...props} params={params} navigate={navigate} />;
// };

export default withRouter;
