// ref solidjs: https://github.com/solidjs/solid/blob/19013bffa7c2494b9ce43d0f00172ee529996134/packages/solid/src/render/flow.ts

/**
 * Selects a content based on condition when inside a `<Switch>` control flow
 * ```typescript
 *   <Show when={state.count > 0} fallback={<div>Loading...</div>}>
 *   <div>My Content</div>
 *   </Show>
 * ```
 */
export function Show<T>(props: {
    when: T | undefined | null | false;
    fallback?: JSX.Element;
    children: JSX.Element;
}): JSX.Element | null {
    return props.when ? props.children : props.fallback ?? null;
}

/**
 * Switches between content based on mutually exclusive conditions
 * ```typescript
 * <Switch fallback={<FourOhFour />}>
 *   <Match when={state.route === 'home'}>
 *     <Home />
 *   </Match>
 *   <Match when={state.route === 'settings'}>
 *     <Settings />
 *   </Match>
 * </Switch>
 * ```
 */
export function Switch(props: {
    fallback?: JSX.Element;
    children: JSX.Element | JSX.Element[];
}): JSX.Element | null {
    let conds = props.children as unknown as MatchProps<unknown>[];
    if (!Array.isArray(conds)) {
        conds = [conds];
    }
    for (let i = 0; i < conds.length; ++i) {
        if (conds[i].when) {
            return conds[i].children;
        }
    }
    return props.fallback ?? null;
}

export type MatchProps<T> = {
    when: T | undefined | null | false;
    children: JSX.Element;
};

/**
 * Selects a content based on condition when inside a `<Switch>` control flow
 * ```typescript
 * <Match when={condition()}>
 *   <Content/>
 * </Match>
 * ```
 */
export function Match<T>(props: MatchProps<T>): JSX.Element | null {
    return props.when ? props.children : null;
}
