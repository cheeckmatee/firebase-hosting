// src/components/common/form/form.tsx
import { InformationCircleSolid } from "@medusajs/icons";
import {
  Hint as HintComponent,
  Label as LabelComponent,
  Text,
  Tooltip,
  clx
} from "@medusajs/ui";

// ../../../node_modules/@radix-ui/react-slot/dist/index.mjs
import * as React2 from "react";

// ../../../node_modules/@radix-ui/react-compose-refs/dist/index.mjs
import * as React from "react";
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
function useComposedRefs(...refs) {
  return React.useCallback(composeRefs(...refs), refs);
}

// ../../../node_modules/@radix-ui/react-slot/dist/index.mjs
import { Fragment, jsx } from "react/jsx-runtime";
var Slot = React2.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React2.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React2.Children.count(newElement) > 1)
          return React2.Children.only(null);
        return React2.isValidElement(newElement) ? newElement.props.children : null;
      } else {
        return child;
      }
    });
    return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: React2.isValidElement(newElement) ? React2.cloneElement(newElement, void 0, newChildren) : null });
  }
  return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
});
Slot.displayName = "Slot";
var SlotClone = React2.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (React2.isValidElement(children)) {
    const childrenRef = getElementRef(children);
    return React2.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      // @ts-ignore
      ref: forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef
    });
  }
  return React2.Children.count(children) > 1 ? React2.Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
var Slottable = ({ children }) => {
  return /* @__PURE__ */ jsx(Fragment, { children });
};
function isSlottable(child) {
  return React2.isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// src/components/common/form/form.tsx
import {
  createContext,
  forwardRef as forwardRef2,
  useContext,
  useId
} from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var Provider = FormProvider;
var FormFieldContext = createContext(
  {}
);
var Field = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx2(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx2(Controller, { ...props }) });
};
var FormItemContext = createContext(
  {}
);
var useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within a FormField");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formLabelId: `${id}-form-item-label`,
    formDescriptionId: `${id}-form-item-description`,
    formErrorMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
var Item = forwardRef2(
  ({ className, ...props }, ref) => {
    const id = useId();
    return /* @__PURE__ */ jsx2(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx2(
      "div",
      {
        ref,
        className: clx("flex flex-col space-y-2", className),
        ...props
      }
    ) });
  }
);
Item.displayName = "Form.Item";
var Label = forwardRef2(({ className, optional = false, tooltip, icon, ...props }, ref) => {
  const { formLabelId, formItemId } = useFormField();
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-1", children: [
    /* @__PURE__ */ jsx2(
      LabelComponent,
      {
        id: formLabelId,
        ref,
        className: clx(className),
        htmlFor: formItemId,
        size: "small",
        weight: "plus",
        ...props
      }
    ),
    tooltip && /* @__PURE__ */ jsx2(Tooltip, { content: tooltip, children: /* @__PURE__ */ jsx2(InformationCircleSolid, { className: "text-ui-fg-muted" }) }),
    icon,
    optional && /* @__PURE__ */ jsxs(Text, { size: "small", leading: "compact", className: "text-ui-fg-muted", children: [
      "(",
      t("fields.optional"),
      ")"
    ] })
  ] });
});
Label.displayName = "Form.Label";
var Control = forwardRef2(({ ...props }, ref) => {
  const {
    error,
    formItemId,
    formDescriptionId,
    formErrorMessageId,
    formLabelId
  } = useFormField();
  return /* @__PURE__ */ jsx2(
    Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formErrorMessageId}`,
      "aria-invalid": !!error,
      "aria-labelledby": formLabelId,
      ...props
    }
  );
});
Control.displayName = "Form.Control";
var Hint = forwardRef2(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx2(
    HintComponent,
    {
      ref,
      id: formDescriptionId,
      className,
      ...props
    }
  );
});
Hint.displayName = "Form.Hint";
var ErrorMessage = forwardRef2(({ className, children, ...props }, ref) => {
  const { error, formErrorMessageId } = useFormField();
  const msg = error ? String(error?.message) : children;
  if (!msg || msg === "undefined") {
    return null;
  }
  return /* @__PURE__ */ jsx2(
    HintComponent,
    {
      ref,
      id: formErrorMessageId,
      className,
      variant: error ? "error" : "info",
      ...props,
      children: msg
    }
  );
});
ErrorMessage.displayName = "Form.ErrorMessage";
var Form = Object.assign(Provider, {
  Item,
  Label,
  Control,
  Hint,
  ErrorMessage,
  Field
});

// src/lib/client/client.ts
import Medusa from "@medusajs/js-sdk";
var backendUrl = __BACKEND_URL__ ?? "/";
var sdk = new Medusa({
  baseUrl: backendUrl,
  auth: {
    type: "session"
  }
});
if (typeof window !== "undefined") {
  ;
  window.__sdk = sdk;
}

export {
  useComposedRefs,
  Slot,
  Form,
  sdk
};
