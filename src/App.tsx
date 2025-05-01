import { GithubOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Menu, Space, Splitter, Tabs } from 'antd';
import { useState } from 'react';
import './App.css';
import Canvas from './Canvas';
import { DrawFunction } from './CanvasHook';
import ExternalLink from './components/ExternalLink';

const { Header, Content } = Layout;

function App() {
  // const searchParams = new URLSearchParams(document.location.search)
  const [sizes, setSizes] = useState<(number | string)[]>(['20%', '80%']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['input']);

  let elapsed = 0;
  let fps = 0;

  const onDraw: DrawFunction<CanvasRenderingContext2D> = (context, frameCount, elapsedTime) => {
    elapsed += elapsedTime;

    if (elapsed >= 1_000) {
      fps = 1_000 / elapsedTime;
      elapsed = 0;
      console.log({ fps, frameCount, elapsedTime });
    }

    const height = context.canvas.height;
    const width = context.canvas.width;

    // const centerX = width / 2;
    // const centerY = height / 2;

    // console.log({ height, width, centerX, centerY });

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.lineWidth = 1;
    context.textBaseline = "top";
    context.textAlign = "left";
    context.font = `12px monospace`;
    context.fillStyle = 'white';
    context.fillText(`${fps.toLocaleString(undefined, { maximumFractionDigits: 1 })} FPS`, 10, 10);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '1rem' }}>LED Mapper</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          onSelect={(info) => setSelectedKeys(info.selectedKeys)}
          items={[{ key: 'input', label: '1. Input' }, { key: 'Map Config', label: '2. Map Config' }]}
          style={{ flex: 1, minWidth: 0 }}
        />
        <ExternalLink href="https://github.com" title="Source Code on GitHub"><GithubOutlined /></ExternalLink>
      </Header>
      <Layout>
        <Content>
          <Splitter layout='vertical' onResize={setSizes}>
            <Splitter.Panel size={sizes[0]} style={{ paddingLeft: '1rem' }}>
              {selectedKeys?.includes('input') && (
                <Tabs
                  tabBarStyle={{ paddingTop: 0, marginTop: 0 }} style={{ paddingTop: 0, marginTop: 0 }}
                  items={[{
                    key: 'layout',
                    label: 'Layout',
                    children: <>
                      Paste an LED layout copied from <ExternalLink href="https://sheets.google.com" >Google Sheets</ExternalLink> or other spreadsheet in tab-delimited text format, with a unique LED index in each cell. LED indices should start at zero. Cells without an LED should be empty.
                      <Input.TextArea rows={4} />
                      <Space.Compact>
                        <Button size='small'>Parse Layout</Button>
                        <Button size='small'>Copy</Button>
                      </Space.Compact>
                    </>
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
                  }]} />)}
            </Splitter.Panel>
            <Splitter.Panel size={sizes[1]}>
              <Canvas<CanvasRenderingContext2D>
                contextType={'2d'}
                draw={onDraw}
                style={{ height: 'calc(100% - 10px)', width: '100%' }}
              /></Splitter.Panel>
          </Splitter>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
