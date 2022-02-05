import "./Sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  const sidebarList = [
    { icon: <RssFeed className="sidebarIcon" />, title: "Feed" },
    { icon: <Chat className="sidebarIcon" />, title: "Chats" },
    {
      icon: <PlayCircleFilledOutlined className="sidebarIcon" />,
      title: "Videos",
    },
    {
      icon: <Group className="sidebarIcon" />,
      title: "Groups",
    },
    {
      icon: <Bookmark className="sidebarIcon" />,
      title: "Bookmarks",
    },
    {
      icon: <HelpOutline className="sidebarIcon" />,
      title: "Questions",
    },
    {
      icon: <WorkOutline className="sidebarIcon" />,
      title: "Jobs",
    },
    {
      icon: <Event className="sidebarIcon" />,
      title: "Events",
    },
    {
      icon: <School className="sidebarIcon" />,
      title: "Courses",
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {sidebarList.map((item, i) => (
            <li className="sidebarListItem" key={i}>
              {item.icon}
              <span className="sidebarListItemText">{item.title}</span>
            </li>
          ))}
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((user) => (
            <CloseFriend key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}
