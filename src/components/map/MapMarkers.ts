import L from 'leaflet';
import { STATUS_CONFIG } from '@/lib/constants';
import { AvailabilityStatus } from '@/store/appStore';

export function createUserIcon(status: AvailabilityStatus, avatar: string): L.DivIcon {
  const color = STATUS_CONFIG[status].color;
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position:relative;width:44px;height:44px;">
        <div style="
          width:44px;height:44px;border-radius:50%;
          border:3px solid ${color};
          background:white;
          overflow:hidden;
          box-shadow:0 2px 12px rgba(0,0,0,0.15);
          display:flex;align-items:center;justify-content:center;
        ">
          <img src="${avatar}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;" />
        </div>
        <div style="
          position:absolute;bottom:-2px;right:-2px;
          width:14px;height:14px;border-radius:50%;
          background:${color};border:2px solid white;
        "></div>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -26],
  });
}

export function createEventIcon(emoji: string): L.DivIcon {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position:relative;width:48px;height:48px;">
        <div class="marker-pulse" style="
          position:absolute;inset:0;border-radius:50%;
          background:hsl(243 80% 69% / 0.2);
        "></div>
        <div style="
          position:relative;width:48px;height:48px;border-radius:50%;
          background:linear-gradient(135deg, hsl(243, 80%, 69%), hsl(280, 70%, 65%));
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 16px hsl(243 80% 69% / 0.3);
          font-size:22px;
        ">${emoji}</div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -28],
  });
}

export function createCurrentUserIcon(): L.DivIcon {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position:relative;width:20px;height:20px;">
        <div style="
          position:absolute;inset:-6px;border-radius:50%;
          background:hsl(243 80% 69% / 0.15);
          animation: pulse-ring 2s infinite;
        "></div>
        <div style="
          width:20px;height:20px;border-radius:50%;
          background:hsl(243, 80%, 69%);
          border:3px solid white;
          box-shadow:0 2px 8px hsl(243 80% 69% / 0.4);
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}
