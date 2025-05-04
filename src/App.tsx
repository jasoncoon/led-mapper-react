import { GithubOutlined } from '@ant-design/icons';
import { Layout as AntLayout, Divider, Menu, Tabs } from 'antd';
import { useState } from 'react';
import './App.css';
import ExternalLink from './components/ExternalLink';
import CoordinatesInput from './components/Input/Coordinates';
import LayoutInput from './components/Input/Layout';
import PixelblazeInput from './components/Input/PixelBlaze';
import Preview from './components/Preview';
import { GlassesCoordinatesInput } from './input/fixtures/coordinates-glasses';
import { GlassesLayoutInput } from './input/fixtures/layout-glasses';
import { GlassesPixelblazeInput } from './input/fixtures/pixelblaze-glasses';
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
            { key: 'config', label: '2. Map Config' },
            { key: 'debug', label: 'Debug Info' }
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
        <ExternalLink href="https://github.com/jasoncoon/led-mapper-react" title="Source Code on GitHub"><GithubOutlined /></ExternalLink>
      </Header>
      <Content>
        {selectedKeys.includes('input') && (
          <Tabs
            items={[{
              key: 'layout',
              label: 'Layout',
              children: <LayoutInput initialValue={GlassesLayoutInput} onChange={(ledMap) => { setLedMap(ledMap); }} />
            }, {
              key: 'coordinates',
              label: 'Coordinates',
              children: <CoordinatesInput initialValue={GlassesCoordinatesInput} onChange={(ledMap) => { setLedMap(ledMap); }} />
            }, {
              key: 'pixelblaze',
              label: 'Pixelblaze Map',
              children: <PixelblazeInput initialValue={GlassesPixelblazeInput} onChange={(ledMap) => { setLedMap(ledMap); }} />
            }, {
              key: 'image',
              label: 'Image'
            }]} />
        )}
        {selectedKeys.includes('debug') && (
          <pre>{JSON.stringify(ledMap, null, 2)}</pre>
        )}
        <Divider style={{ margin: '4px 0px' }} />
        <Preview ledMap={ledMap} />
      </Content>
    </AntLayout>
  )
}

export default App
