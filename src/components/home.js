import { PageHeader, Input } from 'antd';
import PostGrid from './postgrid';

const { Search } = Input;

function Home(props) {
  return (
    <>
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <Search placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={null}/>
          <PageHeader className="site-page-header"
            title="Web API Development Blog"
            subTitle="Welcome to the demo blog."/>
        </div>  
        <PostGrid />
      </div>
    </>  
  );
}

export default Home;
