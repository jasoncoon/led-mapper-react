import { GithubOutlined } from '@ant-design/icons';
import { Layout as AntLayout, Divider, Menu } from 'antd';
import { useState } from 'react';
import { JSONTree } from 'react-json-tree';
import './App.css';
import LedMapConfig from './components/Config';
import ExternalLink from './components/ExternalLink';
import LedMapInput from './components/Input/LedMapInput';
import LedMapOutput from './components/Output/LedMapOutput';
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
        {selectedKeys.includes('config') && (
          <LedMapConfig ledMap={ledMap} onChange={(ledMap) => { setLedMap(ledMap); }} />
        )}
        {selectedKeys.includes('debug') && (
          <JSONTree data={ledMap} theme={theme} />
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

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};