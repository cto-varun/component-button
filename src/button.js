import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

export default function ButtonComponent(props) {
    const { component } = props;

    const { params } = component;

    const {
        href = null,
        htmlType = 'button',
        type = '',
        orientation = '',
        onClick = '',
        buttonText = '',
        parentClassName = '',
        startDisabled = null,
        html = false,
    } = params;

    const [buttonLoading, setButtonLoading] = useState(false);
    const [disabled, setDisabled] = useState(startDisabled);

    useEffect(() => {
        if (component && component.id) {
            window[window.sessionStorage?.tabId][`${component.id}setButtonLoading`] = setButtonLoading;
        }

        return () => {
            if (component && component.id) {
                delete window[window.sessionStorage?.tabId][`${component.id}setButtonLoading`];
            }
        };
    });

    window[window.sessionStorage?.tabId][`${component.id}_showButton`] = () => {
        setDisabled(false);
        const el = document.querySelector(`.${component.id}-button`);
        if (el.hasAttribute('disabled')) {
            el.removeAttribute('disabled');
        }
    };
    window[window.sessionStorage?.tabId][`${component.id}_hideButton`] = () => {
        setDisabled(true);
        const el = document.querySelector(`.${component.id}-button`);
        if (!el.hasAttribute('disabled')) {
            el.setAttribute('disabled', true);
        }
    };

    // Needed for IE 11
    const crossBrowserEval = function (input) {
        if (window[window.sessionStorage?.tabId].execScript) {
            window[window.sessionStorage?.tabId].execScript(input);

            return null;
        }
        return window[window.sessionStorage?.tabId].eval ? window[window.sessionStorage?.tabId].eval(input) : eval(input);
    };

    return (
        <div
            className={parentClassName}
            style={
                orientation === 'right'
                    ? {
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'flex-end',
                      }
                    : {}
            }
        >
            <Button
                loading={buttonLoading}
                href={href}
                htmlType={htmlType}
                type={type}
                onClick={crossBrowserEval(onClick)}
                className={`${component.id}-button ant-btn-${type}`}
                disabled={disabled}
            >
                {html ? (
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                    buttonText
                )}
            </Button>
        </div>
    );
}
