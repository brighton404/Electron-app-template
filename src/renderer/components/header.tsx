import { X, Monitor, Minus, Grip } from 'lucide-react';
import Tooltip from './tooltip';

const Header = () => {
    return (
    <header style={{ display: 'flex', gap: '0px', WebkitAppRegion: 'drag' }as any}>
        <div className="win-Buttons" style={{ display: 'flex', gap: '0px', WebkitAppRegion: 'no-drag' }as any}>
            <Tooltip text="minimize" position='bottom'>
                <button onClick={() => window.electronAPI.minimize()}>
                <Minus color="gray" size={18} />
                </button>
            </Tooltip>
            <Tooltip text="maximize" position='bottom'>
                <button onClick={() => window.electronAPI.maximize()}>
                    <Monitor color="gray" size={16} />
                </button>
            </Tooltip>
            <Tooltip text="Close" position='bottom'>
                <button onClick={() => window.electronAPI.close()} className='critical'>
                    <X color="gray" size={18} />
                </button>
            </Tooltip>
        </div>
    </header>
    )
}
export default Header;