import { GithubOutlined } from '@ant-design/icons';
import { Layout as AntLayout, Input, Menu, Tabs } from 'antd';
import { useState } from 'react';
import './App.css';
import ExternalLink from './components/ExternalLink';
import LayoutInput from './components/Input/Layout';
import Preview from './components/Preview';
import { GlassesLayoutInput } from './input/fixtures/layout-glasses';
import { LedMap, parseLayoutText } from './input/layout';

const { Header, Content } = AntLayout;

function App() {
  // const searchParams = new URLSearchParams(document.location.search)
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['input']);
  const [ledMap, setLedMap] = useState<LedMap>(parseLayoutText(GlassesLayoutInput));

  return (
    <AntLayout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '1rem' }}>LED Mapper</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          onSelect={(info) => { setSelectedKeys(info.selectedKeys); }}
          items={[
            { key: 'input', label: '1. Input' },
            { key: 'config', label: '2. Map Config' },
            { key: 'debug', label: 'Debug Info' }
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
        <ExternalLink href="https://github.com/jasoncoon/led-mapper-react" title="Source Code on GitHub"><GithubOutlined /></ExternalLink>
      </Header>
      <AntLayout>
        <Content>
          {selectedKeys.includes('input') && (
            <Tabs
              tabBarStyle={{ paddingTop: 0, marginTop: 0 }} style={{ paddingTop: 0, marginTop: 0 }}
              items={[{
                key: 'layout',
                label: 'Layout',
                children: <LayoutInput initialValue={GlassesLayoutInput} onChange={(ledMap) => { setLedMap(ledMap); }} />
              }, {
                key: 'coordinates',
                label: 'Coordinates',
                children: <Input.TextArea rows={4} />
              }, {
                key: 'pixelblaze',
                label: 'Pixelblaze Map',
                children: <Input.TextArea rows={4} />
              }, {
                key: 'image',
                label: 'Image'
              }]} />
          )}
          {selectedKeys.includes('debug') && (
            <pre>{JSON.stringify(ledMap, null, 2)}</pre>
          )}
          <Preview ledMap={ledMap} />
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

export default App
