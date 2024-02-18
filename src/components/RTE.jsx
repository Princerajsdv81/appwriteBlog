import React from "react";
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from "react-hook-form";
export default function RTE({ name, control, label,
    defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">
                {label}</label>}

            <Controller
                name={name || "content"}
                control={control}

                render={({ field: { onChange } }) => (
                    <Editor
                    apiKey='hdv0hn62ln0i08hn6qwsi2c6bze22sh6d0b3t67jbb80rkp6'
                    initialValue={defaultValue}
                        init={{
                           initialValue:defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
                 ],
                            toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                                'alignleft aligncenter alignright alignjustify | ' +
                                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'    

                        }}
                        onEditorChange={onChange}
                        />
            )}
            />
        </div>

    )
}