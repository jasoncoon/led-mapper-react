import { Tabs } from "antd";
import { GlassesCoordinatesInput } from "../../input/fixtures/coordinates-glasses";
import { GlassesLayoutInput } from "../../input/fixtures/layout-glasses";
import { GlassesPixelblazeInput } from "../../input/fixtures/pixelblaze-glasses";
import { LedMap } from "../../types";
import CoordinatesInput from "./Coordinates";
import LayoutInput from "./Layout";
import PixelblazeInput from "./PixelBlaze";

export default function LedMapInput(
  { onChange }: { onChange: (ledMap: LedMap) => void }
) {
  return (
    <Tabs
      items={[{
        key: 'layout',
        label: 'Layout',
        children: <LayoutInput initialValue={GlassesLayoutInput} onChange={onChange} />
      }, {
        key: 'coordinates',
        label: 'Coordinates',
        children: <CoordinatesInput initialValue={GlassesCoordinatesInput} onChange={onChange} />
      }, {
        key: 'pixelblaze',
        label: 'Pixelblaze Map',
        children: <PixelblazeInput initialValue={GlassesPixelblazeInput} onChange={onChange} />
      }, {
        key: 'image',
        label: 'Image'
      }]} />
  );
}