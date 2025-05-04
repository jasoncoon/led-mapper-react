import { GithubOutlined } from '@ant-design/icons';
import { Layout as AntLayout, Divider, Menu } from 'antd';
import { useState } from 'react';
import './App.css';
import ExternalLink from './components/ExternalLink';
import LedMapInput from './components/Input/LedMapInput';
import LedMapOutput from './components/LedMapOutput';
import Preview from './components/Preview';
import { GlassesLayoutInput } from './input/fixtures/layout-glasses';
import { parseLayoutText } from './input/layout';
import { LedMap } from './types';

const { Header, Content } = AntLayout;

function App() {
  // const searchParams = new URLSearchParams(document.location.search)
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['input']);
  const [ledMap, setLedMap] = useState<LedMap>(parseLayoutText(GlassesLayoutInput));

  return (
    <AntLayout style={{ height: '100%' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '1rem' }}>LED Mapper</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          onSelect={(info) => { setSelectedKeys(info.selectedKeys); }}
          items={[
            { key: 'input', label: '1. Input' },
            { key: 'config', label: '2. Config' },
            { key: 'output', label: '3. Output' },
            { key: 'debug', label: 'Debug Info' }
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
        <ExternalLink href="https://github.com/jasoncoon/led-mapper-react" title="Source Code on GitHub"><GithubOutlined /></ExternalLink>
      </Header>
      <Content>
        {selectedKeys.includes('input') && (
          <LedMapInput onChange={(ledMap) => { setLedMap(ledMap); }} />
        )}
        {selectedKeys.includes('debug') && (
          <pre>{JSON.stringify(ledMap, null, 2)}</pre>
        )}
        {selectedKeys.includes('output') && (
          <LedMapOutput ledMap={ledMap} />
        )}
        <Divider style={{ margin: '4px 0px' }} />
        <Preview ledMap={ledMap} />
      </Content>
    </AntLayout>
  )
}

export default App
