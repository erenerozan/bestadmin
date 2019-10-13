import React, { useState } from "react";
import {
  DraftailEditor,
  createEditorStateFromRaw,
  serialiseEditorStateToRaw,
  ENTITY_TYPE
} from "draftail";
import { convertToRaw, convertFromRaw, AtomicBlockUtils } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";

// nicht gebraucht, da draftail eigene funktionen besitzt
// import { EditorState, ContentState, convertToRaw } from "draft-js";

import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";

// Beispiel:
import allContentState from "./allContentState";
import {
  INLINE_CONTROL,
  BLOCK_CONTROL,
  ENTITY_CONTROL,
  exporterConfig
} from "./ui";

import linkifyPlugin from "./plugins/linkifyPlugin";
import autoEmbedPlugin from "./plugins/autoEmbedPlugin";
import createHashtagPlugin from "draft-js-hashtag-plugin";
import createMentionPlugin, {
  defaultSuggestionsFilter
} from "draft-js-mention-plugin";

import ReadingTime from "./components/ReadingTime";

const linkify = linkifyPlugin();
const autoEmbed = autoEmbedPlugin();
const hashtagPlugin = createHashtagPlugin();
const mentionPlugin = createMentionPlugin();

export default function Editor(props) {
  // const initContent = ContentState.createFromBlockArray(
  //   allContentState.blocks,
  //   allContentState.entityMap
  // );
  const initEditorState = createEditorStateFromRaw(allContentState);
  const [editorState, setEditorState] = useState(initEditorState);

  const mentions = [
    {
      name: "matthew",
      title: "Senior Software Engineer",
      avatar:
        "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"
    },
    {
      name: "julian",
      title: "United Kingdom",
      avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400"
    },
    {
      name: "jyoti",
      title: "New Delhi, India",
      avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400"
    },
    {
      name: "max",
      title:
        "Travels around the world, brews coffee, skis mountains and makes stuff on the web.",
      avatar:
        "https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg"
    },
    {
      name: "nik",
      title: "Passionate about Software Architecture, UX, Skiing & Triathlons",
      avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400"
    },
    {
      name: "pascal",
      title: "HeathIT hacker and researcher",
      avatar:
        "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png"
    }
  ];

  const [suggestionsState, setSuggestionsState] = useState(mentions);
  // let contentState = editorState.getCurrentContent();
  // let blocks = contentState.blockMap.map((e, i) => (
  //   <li key={i}>
  //     <b>
  //       {i}: {e.text}
  //     </b>
  //   </li>
  // ));
  // let cursorData = editorState.getSelection();

  // const onSave = content => {
  //   console.log("saving", content);
  //   localStorage.setItem("draftail:content", JSON.stringify(content));
  //   // setEditorState(content);
  // };

  const onChange = editorState => {
    const raws = convertToRaw(editorState.getCurrentContent());
    console.log(raws);
    console.log("raws");

    // const html = convertToHTML(editorState.getCurrentContent());
    // toHTML(raws);
    console.log(convertToHTML(exporterConfig)(convertFromRaw(raws)));
    setEditorState(editorState);
  };

  const myKeyBindingFn = e => {
    console.log(e.keyCode);
    // if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    //   return 'myeditor-save';
    // }
    // return getDefaultKeyBinding(e);
  };
  const onSave = raw => {
    console.log(toHTML(raw));
  };
  const onSearchChange = ({ value }) => {
    setSuggestionsState(defaultSuggestionsFilter(value, mentions));
  };
  const { MentionSuggestions } = mentionPlugin;
  const toHTML = raw =>
    raw ? convertToHTML(exporterConfig)(convertFromRaw(raw)) : "Boş";

  return (
    <div style={{ display: "flex", flexWrap: "nowrap" }}>
      <div style={{ flex: "1 0 50%" }}>
        <DraftailEditor
          // onSave={raw => console.log(toHTML(raw))}

          rawContentState={allContentState}
          editorState={editorState}
          onChange={onChange}
          stripPastedStyles={false}
          // enableHorizontalRule={{
          //   description: "Horizontal rule"
          // }}
          // enableLineBreak={{
          //   description: "Soft line break"
          // }}
          // showUndoControl={{
          //   description: "Undo last change"
          // }}
          // showRedoControl={{
          //   description: "Redo last change"
          // }}
          // maxListNesting={6}
          // blockTypes={Object.values(BLOCK_CONTROL)}
          // inlineStyles={Object.values(INLINE_CONTROL)}
          entityTypes={[
            ENTITY_CONTROL.IMAGE,
            ENTITY_CONTROL.LINK,
            ENTITY_CONTROL.EMBED,
            ENTITY_CONTROL.DOCUMENT
          ]}
          plugins={[autoEmbed, linkify, hashtagPlugin, mentionPlugin]}
          // controls={[ReadingTime]}
          // keyBindingFn={myKeyBindingFn}
        />
        {/* <MentionSuggestions
          onSearchChange={onSearchChange}
          suggestions={suggestionsState}
        /> */}
      </div>
      <div
        style={{
          flex: "0 0 50%",
          width: "50%",
          textAlign: "left",
          wordBreak: "break-all"
        }}
      >
        <div style={{ padding: "0 15px" }}>
          <div>contentstate:</div>
          <pre>
            {JSON.stringify(serialiseEditorStateToRaw(editorState), 0, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
