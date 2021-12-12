import { Pagination } from "react-bootstrap";

const MyPagination = (props) => {
  const currentPage = props.current;
  const totalPage = props.total;
  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  console.log(startPage)
  console.log(currentPage)
  console.log(endPage)

  if (startPage < 0) {
    startPage = 0;
  }
  if (endPage >= totalPage) {
    endPage = totalPage;
  }
  const onClickHandler = (e) =>{
    
        if(e.target.text){
            props.onSelect(+e.target.text)

        }
  }

  const onClickStart = ()=>{
    props.onSelect(0)
  }
  const onClickEnd = ()=>{
    props.onSelect(totalPage)

}
  
  const pageShown = [];
  for (let index = startPage; index <= endPage; index++) {
    if(index === currentPage){
        pageShown.push(<Pagination.Item onClick={onClickHandler} key={index}  active>{index}</Pagination.Item>);
    }
    else{
        pageShown.push(<Pagination.Item onClick={onClickHandler}  key={index} >{index}</Pagination.Item>);

    }
  }

  return (
    <Pagination>
      <Pagination.First onClick={onClickStart} />
        {pageShown}
      <Pagination.Last  onClick={onClickEnd}/>
    </Pagination>
  );
};

export default MyPagination;
