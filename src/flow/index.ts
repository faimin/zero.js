// ref solidjs: https://github.com/solidjs/solid/blob/19013bffa7c2494b9ce43d0f00172ee529996134/packages/solid/src/render/flow.ts

/**
 * Selects a content based on condition when inside a `<Switch>` control flow
 * ```typescript
 *   <ZShow when={state.count > 0} fallback={<div>Loading...</div>}>
 *      <div>My Content</div>
 *   </ZShow>
 * ```
 */
export function ZShow<T>(props: {
    when: T | undefined | null | false;
    fallback?: JSX.Element;
    children: JSX.Element;
}): JSX.Element | null {
    return props.when ? props.children : props.fallback ?? null;
}

/**
 * Switches between content based on mutually exclusive conditions
 * ```typescript
 * <ZSwitch fallback={<FourOhFour />}>
 *   <ZMatch when={state.route === 'home'}>
 *     <Home />
 *   </ZMatch>
 *   <ZMatch when={state.route === 'settings'}>
 *     <Settings />
 *   </ZMatch>
 * </ZSwitch>
 * ```
 */
export function ZSwitch(props: {
    fallback?: JSX.Element;
    children: JSX.Element | JSX.Element[];
}): JSX.Element | null {
    let conds = props.children;

    if (!Array.isArray(conds)) {
        conds = [conds];
    }

    for (let i = 0; i < conds.length; ++i) {
        const matchProps = conds[i].props;
        if (matchProps?.when) {
            return matchProps.children;
        }
    }
    return props.fallback ?? null;
}

export type ZMatchProps<T> = {
    when: T | undefined | null | false;
    children: JSX.Element;
};

/**
 * Selects a content based on condition when inside a `<Switch>` control flow
 * ```typescript
 * <ZMatch when={condition()}>
 *   <Content/>
 * </ZMatch>
 * ```
 */
export function ZMatch<T>(props: ZMatchProps<T>): JSX.Element | null {
    return props.when ? props.children : null;
}
