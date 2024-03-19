import { Layout } from 'antd';
import './_dashboard.scss';
import React from 'react';
import DashboardSidebar from 'components/dashboardSidebar'
import DashboardHeader from 'components/dashboardHeader'
import moment from 'moment';

const { Content, Footer } = Layout;

const App = () => {
  const year = moment().year();

  return (
    <Layout id='dashborad-stylling'>
      {/* dashboard sidebar */}
      <DashboardSidebar />
      <Layout className='dashboard-content-layout'>
        {/* dashboard header */}
        <DashboardHeader />

        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              height: "100vh",
              background: "white",
              borderRadius: 20,
            }}
          >
            content
          </div>
          {/* dashboard footer */}
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Copyright &copy; {year}. All rights reserved
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;