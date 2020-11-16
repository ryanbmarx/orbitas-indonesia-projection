
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function noop() { }
  const identity = x => x;
  function assign(tar, src) {
      // @ts-ignore
      for (const k in src)
          tar[k] = src[k];
      return tar;
  }
  function add_location(element, file, line, column, char) {
      element.__svelte_meta = {
          loc: { file, line, column, char }
      };
  }
  function run(fn) {
      return fn();
  }
  function blank_object() {
      return Object.create(null);
  }
  function run_all(fns) {
      fns.forEach(run);
  }
  function is_function(thing) {
      return typeof thing === 'function';
  }
  function safe_not_equal(a, b) {
      return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
  }
  function is_empty(obj) {
      return Object.keys(obj).length === 0;
  }
  function validate_store(store, name) {
      if (store != null && typeof store.subscribe !== 'function') {
          throw new Error(`'${name}' is not a store with a 'subscribe' method`);
      }
  }
  function subscribe(store, ...callbacks) {
      if (store == null) {
          return noop;
      }
      const unsub = store.subscribe(...callbacks);
      return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function component_subscribe(component, store, callback) {
      component.$$.on_destroy.push(subscribe(store, callback));
  }
  function set_store_value(store, ret, value = ret) {
      store.set(value);
      return ret;
  }

  const is_client = typeof window !== 'undefined';
  let now = is_client
      ? () => window.performance.now()
      : () => Date.now();
  let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

  const tasks = new Set();
  function run_tasks(now) {
      tasks.forEach(task => {
          if (!task.c(now)) {
              tasks.delete(task);
              task.f();
          }
      });
      if (tasks.size !== 0)
          raf(run_tasks);
  }
  /**
   * Creates a new task that runs on each raf frame
   * until it returns a falsy value or is aborted
   */
  function loop(callback) {
      let task;
      if (tasks.size === 0)
          raf(run_tasks);
      return {
          promise: new Promise(fulfill => {
              tasks.add(task = { c: callback, f: fulfill });
          }),
          abort() {
              tasks.delete(task);
          }
      };
  }

  function append(target, node) {
      target.appendChild(node);
  }
  function insert(target, node, anchor) {
      target.insertBefore(node, anchor || null);
  }
  function detach(node) {
      node.parentNode.removeChild(node);
  }
  function destroy_each(iterations, detaching) {
      for (let i = 0; i < iterations.length; i += 1) {
          if (iterations[i])
              iterations[i].d(detaching);
      }
  }
  function element(name) {
      return document.createElement(name);
  }
  function svg_element(name) {
      return document.createElementNS('http://www.w3.org/2000/svg', name);
  }
  function text(data) {
      return document.createTextNode(data);
  }
  function space() {
      return text(' ');
  }
  function empty() {
      return text('');
  }
  function listen(node, event, handler, options) {
      node.addEventListener(event, handler, options);
      return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
      if (value == null)
          node.removeAttribute(attribute);
      else if (node.getAttribute(attribute) !== value)
          node.setAttribute(attribute, value);
  }
  function children(element) {
      return Array.from(element.childNodes);
  }
  function claim_element(nodes, name, attributes, svg) {
      for (let i = 0; i < nodes.length; i += 1) {
          const node = nodes[i];
          if (node.nodeName === name) {
              let j = 0;
              const remove = [];
              while (j < node.attributes.length) {
                  const attribute = node.attributes[j++];
                  if (!attributes[attribute.name]) {
                      remove.push(attribute.name);
                  }
              }
              for (let k = 0; k < remove.length; k++) {
                  node.removeAttribute(remove[k]);
              }
              return nodes.splice(i, 1)[0];
          }
      }
      return svg ? svg_element(name) : element(name);
  }
  function claim_text(nodes, data) {
      for (let i = 0; i < nodes.length; i += 1) {
          const node = nodes[i];
          if (node.nodeType === 3) {
              node.data = '' + data;
              return nodes.splice(i, 1)[0];
          }
      }
      return text(data);
  }
  function claim_space(nodes) {
      return claim_text(nodes, ' ');
  }
  function set_style(node, key, value, important) {
      node.style.setProperty(key, value, important ? 'important' : '');
  }
  function select_option(select, value) {
      for (let i = 0; i < select.options.length; i += 1) {
          const option = select.options[i];
          if (option.__value === value) {
              option.selected = true;
              return;
          }
      }
  }
  function select_value(select) {
      const selected_option = select.querySelector(':checked') || select.options[0];
      return selected_option && selected_option.__value;
  }
  function toggle_class(element, name, toggle) {
      element.classList[toggle ? 'add' : 'remove'](name);
  }
  function custom_event(type, detail) {
      const e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, false, false, detail);
      return e;
  }
  function query_selector_all(selector, parent = document.body) {
      return Array.from(parent.querySelectorAll(selector));
  }

  const active_docs = new Set();
  let active = 0;
  // https://github.com/darkskyapp/string-hash/blob/master/index.js
  function hash(str) {
      let hash = 5381;
      let i = str.length;
      while (i--)
          hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
      return hash >>> 0;
  }
  function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
      const step = 16.666 / duration;
      let keyframes = '{\n';
      for (let p = 0; p <= 1; p += step) {
          const t = a + (b - a) * ease(p);
          keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
      }
      const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
      const name = `__svelte_${hash(rule)}_${uid}`;
      const doc = node.ownerDocument;
      active_docs.add(doc);
      const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
      const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
      if (!current_rules[name]) {
          current_rules[name] = true;
          stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
      }
      const animation = node.style.animation || '';
      node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
      active += 1;
      return name;
  }
  function delete_rule(node, name) {
      const previous = (node.style.animation || '').split(', ');
      const next = previous.filter(name
          ? anim => anim.indexOf(name) < 0 // remove specific animation
          : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
      );
      const deleted = previous.length - next.length;
      if (deleted) {
          node.style.animation = next.join(', ');
          active -= deleted;
          if (!active)
              clear_rules();
      }
  }
  function clear_rules() {
      raf(() => {
          if (active)
              return;
          active_docs.forEach(doc => {
              const stylesheet = doc.__svelte_stylesheet;
              let i = stylesheet.cssRules.length;
              while (i--)
                  stylesheet.deleteRule(i);
              doc.__svelte_rules = {};
          });
          active_docs.clear();
      });
  }

  let current_component;
  function set_current_component(component) {
      current_component = component;
  }
  function get_current_component() {
      if (!current_component)
          throw new Error('Function called outside component initialization');
      return current_component;
  }
  function onMount(fn) {
      get_current_component().$$.on_mount.push(fn);
  }
  function afterUpdate(fn) {
      get_current_component().$$.after_update.push(fn);
  }
  // TODO figure out if we still want to support
  // shorthand events, or if we want to implement
  // a real bubbling mechanism
  function bubble(component, event) {
      const callbacks = component.$$.callbacks[event.type];
      if (callbacks) {
          callbacks.slice().forEach(fn => fn(event));
      }
  }

  const dirty_components = [];
  const binding_callbacks = [];
  const render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
      if (!update_scheduled) {
          update_scheduled = true;
          resolved_promise.then(flush);
      }
  }
  function add_render_callback(fn) {
      render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
      flush_callbacks.push(fn);
  }
  let flushing = false;
  const seen_callbacks = new Set();
  function flush() {
      if (flushing)
          return;
      flushing = true;
      do {
          // first, call beforeUpdate functions
          // and update components
          for (let i = 0; i < dirty_components.length; i += 1) {
              const component = dirty_components[i];
              set_current_component(component);
              update(component.$$);
          }
          set_current_component(null);
          dirty_components.length = 0;
          while (binding_callbacks.length)
              binding_callbacks.pop()();
          // then, once components are updated, call
          // afterUpdate functions. This may cause
          // subsequent updates...
          for (let i = 0; i < render_callbacks.length; i += 1) {
              const callback = render_callbacks[i];
              if (!seen_callbacks.has(callback)) {
                  // ...so guard against infinite loops
                  seen_callbacks.add(callback);
                  callback();
              }
          }
          render_callbacks.length = 0;
      } while (dirty_components.length);
      while (flush_callbacks.length) {
          flush_callbacks.pop()();
      }
      update_scheduled = false;
      flushing = false;
      seen_callbacks.clear();
  }
  function update($$) {
      if ($$.fragment !== null) {
          $$.update();
          run_all($$.before_update);
          const dirty = $$.dirty;
          $$.dirty = [-1];
          $$.fragment && $$.fragment.p($$.ctx, dirty);
          $$.after_update.forEach(add_render_callback);
      }
  }

  let promise;
  function wait() {
      if (!promise) {
          promise = Promise.resolve();
          promise.then(() => {
              promise = null;
          });
      }
      return promise;
  }
  function dispatch(node, direction, kind) {
      node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
  }
  const outroing = new Set();
  let outros;
  function group_outros() {
      outros = {
          r: 0,
          c: [],
          p: outros // parent group
      };
  }
  function check_outros() {
      if (!outros.r) {
          run_all(outros.c);
      }
      outros = outros.p;
  }
  function transition_in(block, local) {
      if (block && block.i) {
          outroing.delete(block);
          block.i(local);
      }
  }
  function transition_out(block, local, detach, callback) {
      if (block && block.o) {
          if (outroing.has(block))
              return;
          outroing.add(block);
          outros.c.push(() => {
              outroing.delete(block);
              if (callback) {
                  if (detach)
                      block.d(1);
                  callback();
              }
          });
          block.o(local);
      }
  }
  const null_transition = { duration: 0 };
  function create_bidirectional_transition(node, fn, params, intro) {
      let config = fn(node, params);
      let t = intro ? 0 : 1;
      let running_program = null;
      let pending_program = null;
      let animation_name = null;
      function clear_animation() {
          if (animation_name)
              delete_rule(node, animation_name);
      }
      function init(program, duration) {
          const d = program.b - t;
          duration *= Math.abs(d);
          return {
              a: t,
              b: program.b,
              d,
              duration,
              start: program.start,
              end: program.start + duration,
              group: program.group
          };
      }
      function go(b) {
          const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
          const program = {
              start: now() + delay,
              b
          };
          if (!b) {
              // @ts-ignore todo: improve typings
              program.group = outros;
              outros.r += 1;
          }
          if (running_program || pending_program) {
              pending_program = program;
          }
          else {
              // if this is an intro, and there's a delay, we need to do
              // an initial tick and/or apply CSS animation immediately
              if (css) {
                  clear_animation();
                  animation_name = create_rule(node, t, b, duration, delay, easing, css);
              }
              if (b)
                  tick(0, 1);
              running_program = init(program, duration);
              add_render_callback(() => dispatch(node, b, 'start'));
              loop(now => {
                  if (pending_program && now > pending_program.start) {
                      running_program = init(pending_program, duration);
                      pending_program = null;
                      dispatch(node, running_program.b, 'start');
                      if (css) {
                          clear_animation();
                          animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                      }
                  }
                  if (running_program) {
                      if (now >= running_program.end) {
                          tick(t = running_program.b, 1 - t);
                          dispatch(node, running_program.b, 'end');
                          if (!pending_program) {
                              // we're done
                              if (running_program.b) {
                                  // intro — we can tidy up immediately
                                  clear_animation();
                              }
                              else {
                                  // outro — needs to be coordinated
                                  if (!--running_program.group.r)
                                      run_all(running_program.group.c);
                              }
                          }
                          running_program = null;
                      }
                      else if (now >= running_program.start) {
                          const p = now - running_program.start;
                          t = running_program.a + running_program.d * easing(p / running_program.duration);
                          tick(t, 1 - t);
                      }
                  }
                  return !!(running_program || pending_program);
              });
          }
      }
      return {
          run(b) {
              if (is_function(config)) {
                  wait().then(() => {
                      // @ts-ignore
                      config = config();
                      go(b);
                  });
              }
              else {
                  go(b);
              }
          },
          end() {
              clear_animation();
              running_program = pending_program = null;
          }
      };
  }

  const globals = (typeof window !== 'undefined'
      ? window
      : typeof globalThis !== 'undefined'
          ? globalThis
          : global);

  function destroy_block(block, lookup) {
      block.d(1);
      lookup.delete(block.key);
  }
  function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
      let o = old_blocks.length;
      let n = list.length;
      let i = o;
      const old_indexes = {};
      while (i--)
          old_indexes[old_blocks[i].key] = i;
      const new_blocks = [];
      const new_lookup = new Map();
      const deltas = new Map();
      i = n;
      while (i--) {
          const child_ctx = get_context(ctx, list, i);
          const key = get_key(child_ctx);
          let block = lookup.get(key);
          if (!block) {
              block = create_each_block(key, child_ctx);
              block.c();
          }
          else if (dynamic) {
              block.p(child_ctx, dirty);
          }
          new_lookup.set(key, new_blocks[i] = block);
          if (key in old_indexes)
              deltas.set(key, Math.abs(i - old_indexes[key]));
      }
      const will_move = new Set();
      const did_move = new Set();
      function insert(block) {
          transition_in(block, 1);
          block.m(node, next);
          lookup.set(block.key, block);
          next = block.first;
          n--;
      }
      while (o && n) {
          const new_block = new_blocks[n - 1];
          const old_block = old_blocks[o - 1];
          const new_key = new_block.key;
          const old_key = old_block.key;
          if (new_block === old_block) {
              // do nothing
              next = new_block.first;
              o--;
              n--;
          }
          else if (!new_lookup.has(old_key)) {
              // remove old block
              destroy(old_block, lookup);
              o--;
          }
          else if (!lookup.has(new_key) || will_move.has(new_key)) {
              insert(new_block);
          }
          else if (did_move.has(old_key)) {
              o--;
          }
          else if (deltas.get(new_key) > deltas.get(old_key)) {
              did_move.add(new_key);
              insert(new_block);
          }
          else {
              will_move.add(old_key);
              o--;
          }
      }
      while (o--) {
          const old_block = old_blocks[o];
          if (!new_lookup.has(old_block.key))
              destroy(old_block, lookup);
      }
      while (n)
          insert(new_blocks[n - 1]);
      return new_blocks;
  }
  function validate_each_keys(ctx, list, get_context, get_key) {
      const keys = new Set();
      for (let i = 0; i < list.length; i++) {
          const key = get_key(get_context(ctx, list, i));
          if (keys.has(key)) {
              throw new Error('Cannot have duplicate keys in a keyed each');
          }
          keys.add(key);
      }
  }

  function get_spread_update(levels, updates) {
      const update = {};
      const to_null_out = {};
      const accounted_for = { $$scope: 1 };
      let i = levels.length;
      while (i--) {
          const o = levels[i];
          const n = updates[i];
          if (n) {
              for (const key in o) {
                  if (!(key in n))
                      to_null_out[key] = 1;
              }
              for (const key in n) {
                  if (!accounted_for[key]) {
                      update[key] = n[key];
                      accounted_for[key] = 1;
                  }
              }
              levels[i] = n;
          }
          else {
              for (const key in o) {
                  accounted_for[key] = 1;
              }
          }
      }
      for (const key in to_null_out) {
          if (!(key in update))
              update[key] = undefined;
      }
      return update;
  }
  function get_spread_object(spread_props) {
      return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
  }

  function bind(component, name, callback) {
      const index = component.$$.props[name];
      if (index !== undefined) {
          component.$$.bound[index] = callback;
          callback(component.$$.ctx[index]);
      }
  }
  function create_component(block) {
      block && block.c();
  }
  function claim_component(block, parent_nodes) {
      block && block.l(parent_nodes);
  }
  function mount_component(component, target, anchor) {
      const { fragment, on_mount, on_destroy, after_update } = component.$$;
      fragment && fragment.m(target, anchor);
      // onMount happens before the initial afterUpdate
      add_render_callback(() => {
          const new_on_destroy = on_mount.map(run).filter(is_function);
          if (on_destroy) {
              on_destroy.push(...new_on_destroy);
          }
          else {
              // Edge case - component was destroyed immediately,
              // most likely as a result of a binding initialising
              run_all(new_on_destroy);
          }
          component.$$.on_mount = [];
      });
      after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
      const $$ = component.$$;
      if ($$.fragment !== null) {
          run_all($$.on_destroy);
          $$.fragment && $$.fragment.d(detaching);
          // TODO null out other refs, including component.$$ (but need to
          // preserve final state?)
          $$.on_destroy = $$.fragment = null;
          $$.ctx = [];
      }
  }
  function make_dirty(component, i) {
      if (component.$$.dirty[0] === -1) {
          dirty_components.push(component);
          schedule_update();
          component.$$.dirty.fill(0);
      }
      component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
  }
  function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
      const parent_component = current_component;
      set_current_component(component);
      const prop_values = options.props || {};
      const $$ = component.$$ = {
          fragment: null,
          ctx: null,
          // state
          props,
          update: noop,
          not_equal,
          bound: blank_object(),
          // lifecycle
          on_mount: [],
          on_destroy: [],
          before_update: [],
          after_update: [],
          context: new Map(parent_component ? parent_component.$$.context : []),
          // everything else
          callbacks: blank_object(),
          dirty,
          skip_bound: false
      };
      let ready = false;
      $$.ctx = instance
          ? instance(component, prop_values, (i, ret, ...rest) => {
              const value = rest.length ? rest[0] : ret;
              if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                  if (!$$.skip_bound && $$.bound[i])
                      $$.bound[i](value);
                  if (ready)
                      make_dirty(component, i);
              }
              return ret;
          })
          : [];
      $$.update();
      ready = true;
      run_all($$.before_update);
      // `false` as a special case of no DOM component
      $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
      if (options.target) {
          if (options.hydrate) {
              const nodes = children(options.target);
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.l(nodes);
              nodes.forEach(detach);
          }
          else {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.c();
          }
          if (options.intro)
              transition_in(component.$$.fragment);
          mount_component(component, options.target, options.anchor);
          flush();
      }
      set_current_component(parent_component);
  }
  class SvelteComponent {
      $destroy() {
          destroy_component(this, 1);
          this.$destroy = noop;
      }
      $on(type, callback) {
          const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
          callbacks.push(callback);
          return () => {
              const index = callbacks.indexOf(callback);
              if (index !== -1)
                  callbacks.splice(index, 1);
          };
      }
      $set($$props) {
          if (this.$$set && !is_empty($$props)) {
              this.$$.skip_bound = true;
              this.$$set($$props);
              this.$$.skip_bound = false;
          }
      }
  }

  function dispatch_dev(type, detail) {
      document.dispatchEvent(custom_event(type, Object.assign({ version: '3.29.7' }, detail)));
  }
  function append_dev(target, node) {
      dispatch_dev('SvelteDOMInsert', { target, node });
      append(target, node);
  }
  function insert_dev(target, node, anchor) {
      dispatch_dev('SvelteDOMInsert', { target, node, anchor });
      insert(target, node, anchor);
  }
  function detach_dev(node) {
      dispatch_dev('SvelteDOMRemove', { node });
      detach(node);
  }
  function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
      const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
      if (has_prevent_default)
          modifiers.push('preventDefault');
      if (has_stop_propagation)
          modifiers.push('stopPropagation');
      dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
      const dispose = listen(node, event, handler, options);
      return () => {
          dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
          dispose();
      };
  }
  function attr_dev(node, attribute, value) {
      attr(node, attribute, value);
      if (value == null)
          dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
      else
          dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
  }
  function prop_dev(node, property, value) {
      node[property] = value;
      dispatch_dev('SvelteDOMSetProperty', { node, property, value });
  }
  function set_data_dev(text, data) {
      data = '' + data;
      if (text.wholeText === data)
          return;
      dispatch_dev('SvelteDOMSetData', { node: text, data });
      text.data = data;
  }
  function validate_each_argument(arg) {
      if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
          let msg = '{#each} only iterates over array-like objects.';
          if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
              msg += ' You can use a spread to convert this iterable into an array.';
          }
          throw new Error(msg);
      }
  }
  function validate_slots(name, slot, keys) {
      for (const slot_key of Object.keys(slot)) {
          if (!~keys.indexOf(slot_key)) {
              console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
          }
      }
  }
  class SvelteComponentDev extends SvelteComponent {
      constructor(options) {
          if (!options || (!options.target && !options.$$inline)) {
              throw new Error("'target' is a required option");
          }
          super();
      }
      $destroy() {
          super.$destroy();
          this.$destroy = () => {
              console.warn('Component was already destroyed'); // eslint-disable-line no-console
          };
      }
      $capture_state() { }
      $inject_state() { }
  }

  const subscriber_queue = [];
  /**
   * Create a `Writable` store that allows both updating and reading by subscription.
   * @param {*=}value initial value
   * @param {StartStopNotifier=}start start and stop notifications for subscriptions
   */
  function writable(value, start = noop) {
      let stop;
      const subscribers = [];
      function set(new_value) {
          if (safe_not_equal(value, new_value)) {
              value = new_value;
              if (stop) { // store is ready
                  const run_queue = !subscriber_queue.length;
                  for (let i = 0; i < subscribers.length; i += 1) {
                      const s = subscribers[i];
                      s[1]();
                      subscriber_queue.push(s, value);
                  }
                  if (run_queue) {
                      for (let i = 0; i < subscriber_queue.length; i += 2) {
                          subscriber_queue[i][0](subscriber_queue[i + 1]);
                      }
                      subscriber_queue.length = 0;
                  }
              }
          }
      }
      function update(fn) {
          set(fn(value));
      }
      function subscribe(run, invalidate = noop) {
          const subscriber = [run, invalidate];
          subscribers.push(subscriber);
          if (subscribers.length === 1) {
              stop = start(set) || noop;
          }
          run(value);
          return () => {
              const index = subscribers.indexOf(subscriber);
              if (index !== -1) {
                  subscribers.splice(index, 1);
              }
              if (subscribers.length === 0) {
                  stop();
                  stop = null;
              }
          };
      }
      return { set, update, subscribe };
  }

  var activeData = writable(null);
  var currentYear = writable(null);
  var loading = writable(true);

  /**
   *
   * Takes a CSV in string format, and parses it into a JS object of objects, keyed to the ID. Treats all headers as strings, and assumes the first column is the identifier
   *
   * @param {string} text The source text, to be parsed
   */
  function csvParse(text) {
    // Split the text into rows
    var rows = text.split(/\r?\n/); // Grab our header row, removing it from the rows, and remove ID, since we won't need it.

    var headers = rows.shift().split(",").splice(1);
    return rows.reduce((acc, curr) => {
      // Split the current row string into an array
      var row = curr.split(","); // Get our grid ID by pulling the first item from that array (removing it from row)

      var ID = row.shift(); // This generates an object of key/value pairs for the remaining row items

      var newRow = row.reduce(function () {
        var accumulator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var currentValue = arguments.length > 1 ? arguments[1] : undefined;
        var currentIndex = arguments.length > 2 ? arguments[2] : undefined;
        accumulator[headers[currentIndex]] = parseFloat(currentValue);
        return accumulator;
      }, {}); // Adds the grid data (as k/v pairs) to the overall accumulator, keyed to grid IT

      acc[ID] = newRow; // DO it again ...

      return acc;
    }, {});
  }

  function identity$1(x) {
    return x;
  }

  function transform(transform) {
    if (transform == null) return identity$1;
    var x0,
        y0,
        kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];
    return function(input, i) {
      if (!i) x0 = y0 = 0;
      var j = 2, n = input.length, output = new Array(n);
      output[0] = (x0 += input[0]) * kx + dx;
      output[1] = (y0 += input[1]) * ky + dy;
      while (j < n) output[j] = input[j], ++j;
      return output;
    };
  }

  function reverse(array, n) {
    var t, j = array.length, i = j - n;
    while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
  }

  function feature(topology, o) {
    if (typeof o === "string") o = topology.objects[o];
    return o.type === "GeometryCollection"
        ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature$1(topology, o); })}
        : feature$1(topology, o);
  }

  function feature$1(topology, o) {
    var id = o.id,
        bbox = o.bbox,
        properties = o.properties == null ? {} : o.properties,
        geometry = object(topology, o);
    return id == null && bbox == null ? {type: "Feature", properties: properties, geometry: geometry}
        : bbox == null ? {type: "Feature", id: id, properties: properties, geometry: geometry}
        : {type: "Feature", id: id, bbox: bbox, properties: properties, geometry: geometry};
  }

  function object(topology, o) {
    var transformPoint = transform(topology.transform),
        arcs = topology.arcs;

    function arc(i, points) {
      if (points.length) points.pop();
      for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
        points.push(transformPoint(a[k], k));
      }
      if (i < 0) reverse(points, n);
    }

    function point(p) {
      return transformPoint(p);
    }

    function line(arcs) {
      var points = [];
      for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
      if (points.length < 2) points.push(points[0]); // This should never happen per the specification.
      return points;
    }

    function ring(arcs) {
      var points = line(arcs);
      while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.
      return points;
    }

    function polygon(arcs) {
      return arcs.map(ring);
    }

    function geometry(o) {
      var type = o.type, coordinates;
      switch (type) {
        case "GeometryCollection": return {type: type, geometries: o.geometries.map(geometry)};
        case "Point": coordinates = point(o.coordinates); break;
        case "MultiPoint": coordinates = o.coordinates.map(point); break;
        case "LineString": coordinates = line(o.arcs); break;
        case "MultiLineString": coordinates = o.arcs.map(line); break;
        case "Polygon": coordinates = polygon(o.arcs); break;
        case "MultiPolygon": coordinates = o.arcs.map(polygon); break;
        default: return null;
      }
      return {type: type, coordinates: coordinates};
    }

    return geometry(o);
  }

  function mergeProps(data, geo, dataKey, gridKey) {
    console.log("merging", {
      data
    }, {
      geo
    }, {
      dataKey
    }, {
      gridKey
    });
    geo["dataKey"] = dataKey;
    geo.features.forEach(g => {
      var ID = g.properties[gridKey];

      for (var key in data[ID]) {
        g["properties"][key] = data[ID][key];
      }
    });
    return geo;
  }

  function getMapData(_x, _x2, _x3, _x4) {
    return _getMapData.apply(this, arguments);
  }

  function _getMapData() {
    _getMapData = _asyncToGenerator(function* (gridFile, dataKey, dataList, gridID) {
      // The things we are fetching get stored here, so we can wait until they are fetched.
      var fetching = ["./geo/".concat(gridFile, ".topojson"), "./data/".concat(dataList[dataKey].value)].map(f => {
        console.log("Starting fetch for", f);
        return fetch(f).then(req => f.indexOf(".csv") > -1 ? req.text() : req.json());
      });
      return Promise.all(fetching).then(d => {
        // Merge our shapes with our CSV data
        return mergeProps(csvParse(d[1]), feature(d[0], d[0].objects[gridFile]), dataKey, gridID);
      });
    });
    return _getMapData.apply(this, arguments);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  		path: basedir,
  		exports: {},
  		require: function (path, base) {
  			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
  		}
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var marked = createCommonjsModule(function (module, exports) {
  /**
   * marked - a markdown parser
   * Copyright (c) 2011-2020, Christopher Jeffrey. (MIT Licensed)
   * https://github.com/markedjs/marked
   */

  /**
   * DO NOT EDIT THIS FILE
   * The code in this file is generated from files in ./src/
   */

  (function (global, factory) {
     module.exports = factory() ;
  }(commonjsGlobal, (function () {
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;

      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;
          return function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }

        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var defaults = createCommonjsModule(function (module) {
      function getDefaults() {
        return {
          baseUrl: null,
          breaks: false,
          gfm: true,
          headerIds: true,
          headerPrefix: '',
          highlight: null,
          langPrefix: 'language-',
          mangle: true,
          pedantic: false,
          renderer: null,
          sanitize: false,
          sanitizer: null,
          silent: false,
          smartLists: false,
          smartypants: false,
          tokenizer: null,
          walkTokens: null,
          xhtml: false
        };
      }

      function changeDefaults(newDefaults) {
        module.exports.defaults = newDefaults;
      }

      module.exports = {
        defaults: getDefaults(),
        getDefaults: getDefaults,
        changeDefaults: changeDefaults
      };
    });
    var defaults_1 = defaults.defaults;
    var defaults_2 = defaults.getDefaults;
    var defaults_3 = defaults.changeDefaults;

    /**
     * Helpers
     */
    var escapeTest = /[&<>"']/;
    var escapeReplace = /[&<>"']/g;
    var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
    var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
    var escapeReplacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    var getEscapeReplacement = function getEscapeReplacement(ch) {
      return escapeReplacements[ch];
    };

    function escape(html, encode) {
      if (encode) {
        if (escapeTest.test(html)) {
          return html.replace(escapeReplace, getEscapeReplacement);
        }
      } else {
        if (escapeTestNoEncode.test(html)) {
          return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
        }
      }

      return html;
    }

    var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

    function unescape(html) {
      // explicitly match decimal, hex, and named HTML entities
      return html.replace(unescapeTest, function (_, n) {
        n = n.toLowerCase();
        if (n === 'colon') return ':';

        if (n.charAt(0) === '#') {
          return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
        }

        return '';
      });
    }

    var caret = /(^|[^\[])\^/g;

    function edit(regex, opt) {
      regex = regex.source || regex;
      opt = opt || '';
      var obj = {
        replace: function replace(name, val) {
          val = val.source || val;
          val = val.replace(caret, '$1');
          regex = regex.replace(name, val);
          return obj;
        },
        getRegex: function getRegex() {
          return new RegExp(regex, opt);
        }
      };
      return obj;
    }

    var nonWordAndColonTest = /[^\w:]/g;
    var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

    function cleanUrl(sanitize, base, href) {
      if (sanitize) {
        var prot;

        try {
          prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, '').toLowerCase();
        } catch (e) {
          return null;
        }

        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
          return null;
        }
      }

      if (base && !originIndependentUrl.test(href)) {
        href = resolveUrl(base, href);
      }

      try {
        href = encodeURI(href).replace(/%25/g, '%');
      } catch (e) {
        return null;
      }

      return href;
    }

    var baseUrls = {};
    var justDomain = /^[^:]+:\/*[^/]*$/;
    var protocol = /^([^:]+:)[\s\S]*$/;
    var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

    function resolveUrl(base, href) {
      if (!baseUrls[' ' + base]) {
        // we can ignore everything in base after the last slash of its path component,
        // but we might need to add _that_
        // https://tools.ietf.org/html/rfc3986#section-3
        if (justDomain.test(base)) {
          baseUrls[' ' + base] = base + '/';
        } else {
          baseUrls[' ' + base] = rtrim(base, '/', true);
        }
      }

      base = baseUrls[' ' + base];
      var relativeBase = base.indexOf(':') === -1;

      if (href.substring(0, 2) === '//') {
        if (relativeBase) {
          return href;
        }

        return base.replace(protocol, '$1') + href;
      } else if (href.charAt(0) === '/') {
        if (relativeBase) {
          return href;
        }

        return base.replace(domain, '$1') + href;
      } else {
        return base + href;
      }
    }

    var noopTest = {
      exec: function noopTest() {}
    };

    function merge(obj) {
      var i = 1,
          target,
          key;

      for (; i < arguments.length; i++) {
        target = arguments[i];

        for (key in target) {
          if (Object.prototype.hasOwnProperty.call(target, key)) {
            obj[key] = target[key];
          }
        }
      }

      return obj;
    }

    function splitCells(tableRow, count) {
      // ensure that every cell-delimiting pipe has a space
      // before it to distinguish it from an escaped pipe
      var row = tableRow.replace(/\|/g, function (match, offset, str) {
        var escaped = false,
            curr = offset;

        while (--curr >= 0 && str[curr] === '\\') {
          escaped = !escaped;
        }

        if (escaped) {
          // odd number of slashes means | is escaped
          // so we leave it alone
          return '|';
        } else {
          // add space before unescaped |
          return ' |';
        }
      }),
          cells = row.split(/ \|/);
      var i = 0;

      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count) {
          cells.push('');
        }
      }

      for (; i < cells.length; i++) {
        // leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(/\\\|/g, '|');
      }

      return cells;
    } // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
    // /c*$/ is vulnerable to REDOS.
    // invert: Remove suffix of non-c chars instead. Default falsey.


    function rtrim(str, c, invert) {
      var l = str.length;

      if (l === 0) {
        return '';
      } // Length of suffix matching the invert condition.


      var suffLen = 0; // Step left until we fail to match the invert condition.

      while (suffLen < l) {
        var currChar = str.charAt(l - suffLen - 1);

        if (currChar === c && !invert) {
          suffLen++;
        } else if (currChar !== c && invert) {
          suffLen++;
        } else {
          break;
        }
      }

      return str.substr(0, l - suffLen);
    }

    function findClosingBracket(str, b) {
      if (str.indexOf(b[1]) === -1) {
        return -1;
      }

      var l = str.length;
      var level = 0,
          i = 0;

      for (; i < l; i++) {
        if (str[i] === '\\') {
          i++;
        } else if (str[i] === b[0]) {
          level++;
        } else if (str[i] === b[1]) {
          level--;

          if (level < 0) {
            return i;
          }
        }
      }

      return -1;
    }

    function checkSanitizeDeprecation(opt) {
      if (opt && opt.sanitize && !opt.silent) {
        console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
      }
    } // copied from https://stackoverflow.com/a/5450113/806777


    function repeatString(pattern, count) {
      if (count < 1) {
        return '';
      }

      var result = '';

      while (count > 1) {
        if (count & 1) {
          result += pattern;
        }

        count >>= 1;
        pattern += pattern;
      }

      return result + pattern;
    }

    var helpers = {
      escape: escape,
      unescape: unescape,
      edit: edit,
      cleanUrl: cleanUrl,
      resolveUrl: resolveUrl,
      noopTest: noopTest,
      merge: merge,
      splitCells: splitCells,
      rtrim: rtrim,
      findClosingBracket: findClosingBracket,
      checkSanitizeDeprecation: checkSanitizeDeprecation,
      repeatString: repeatString
    };

    var defaults$1 = defaults.defaults;
    var rtrim$1 = helpers.rtrim,
        splitCells$1 = helpers.splitCells,
        _escape = helpers.escape,
        findClosingBracket$1 = helpers.findClosingBracket;

    function outputLink(cap, link, raw) {
      var href = link.href;
      var title = link.title ? _escape(link.title) : null;
      var text = cap[1].replace(/\\([\[\]])/g, '$1');

      if (cap[0].charAt(0) !== '!') {
        return {
          type: 'link',
          raw: raw,
          href: href,
          title: title,
          text: text
        };
      } else {
        return {
          type: 'image',
          raw: raw,
          href: href,
          title: title,
          text: _escape(text)
        };
      }
    }

    function indentCodeCompensation(raw, text) {
      var matchIndentToCode = raw.match(/^(\s+)(?:```)/);

      if (matchIndentToCode === null) {
        return text;
      }

      var indentToCode = matchIndentToCode[1];
      return text.split('\n').map(function (node) {
        var matchIndentInNode = node.match(/^\s+/);

        if (matchIndentInNode === null) {
          return node;
        }

        var indentInNode = matchIndentInNode[0];

        if (indentInNode.length >= indentToCode.length) {
          return node.slice(indentToCode.length);
        }

        return node;
      }).join('\n');
    }
    /**
     * Tokenizer
     */


    var Tokenizer_1 = /*#__PURE__*/function () {
      function Tokenizer(options) {
        this.options = options || defaults$1;
      }

      var _proto = Tokenizer.prototype;

      _proto.space = function space(src) {
        var cap = this.rules.block.newline.exec(src);

        if (cap) {
          if (cap[0].length > 1) {
            return {
              type: 'space',
              raw: cap[0]
            };
          }

          return {
            raw: '\n'
          };
        }
      };

      _proto.code = function code(src, tokens) {
        var cap = this.rules.block.code.exec(src);

        if (cap) {
          var lastToken = tokens[tokens.length - 1]; // An indented code block cannot interrupt a paragraph.

          if (lastToken && lastToken.type === 'paragraph') {
            return {
              raw: cap[0],
              text: cap[0].trimRight()
            };
          }

          var text = cap[0].replace(/^ {4}/gm, '');
          return {
            type: 'code',
            raw: cap[0],
            codeBlockStyle: 'indented',
            text: !this.options.pedantic ? rtrim$1(text, '\n') : text
          };
        }
      };

      _proto.fences = function fences(src) {
        var cap = this.rules.block.fences.exec(src);

        if (cap) {
          var raw = cap[0];
          var text = indentCodeCompensation(raw, cap[3] || '');
          return {
            type: 'code',
            raw: raw,
            lang: cap[2] ? cap[2].trim() : cap[2],
            text: text
          };
        }
      };

      _proto.heading = function heading(src) {
        var cap = this.rules.block.heading.exec(src);

        if (cap) {
          return {
            type: 'heading',
            raw: cap[0],
            depth: cap[1].length,
            text: cap[2]
          };
        }
      };

      _proto.nptable = function nptable(src) {
        var cap = this.rules.block.nptable.exec(src);

        if (cap) {
          var item = {
            type: 'table',
            header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : [],
            raw: cap[0]
          };

          if (item.header.length === item.align.length) {
            var l = item.align.length;
            var i;

            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = 'right';
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = 'center';
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = 'left';
              } else {
                item.align[i] = null;
              }
            }

            l = item.cells.length;

            for (i = 0; i < l; i++) {
              item.cells[i] = splitCells$1(item.cells[i], item.header.length);
            }

            return item;
          }
        }
      };

      _proto.hr = function hr(src) {
        var cap = this.rules.block.hr.exec(src);

        if (cap) {
          return {
            type: 'hr',
            raw: cap[0]
          };
        }
      };

      _proto.blockquote = function blockquote(src) {
        var cap = this.rules.block.blockquote.exec(src);

        if (cap) {
          var text = cap[0].replace(/^ *> ?/gm, '');
          return {
            type: 'blockquote',
            raw: cap[0],
            text: text
          };
        }
      };

      _proto.list = function list(src) {
        var cap = this.rules.block.list.exec(src);

        if (cap) {
          var raw = cap[0];
          var bull = cap[2];
          var isordered = bull.length > 1;
          var list = {
            type: 'list',
            raw: raw,
            ordered: isordered,
            start: isordered ? +bull.slice(0, -1) : '',
            loose: false,
            items: []
          }; // Get each top-level item.

          var itemMatch = cap[0].match(this.rules.block.item);
          var next = false,
              item,
              space,
              bcurr,
              bnext,
              addBack,
              loose,
              istask,
              ischecked;
          var l = itemMatch.length;
          bcurr = this.rules.block.listItemStart.exec(itemMatch[0]);

          for (var i = 0; i < l; i++) {
            item = itemMatch[i];
            raw = item; // Determine whether the next list item belongs here.
            // Backpedal if it does not belong in this list.

            if (i !== l - 1) {
              bnext = this.rules.block.listItemStart.exec(itemMatch[i + 1]);

              if (bnext[1].length > bcurr[0].length || bnext[1].length > 3) {
                // nested list
                itemMatch.splice(i, 2, itemMatch[i] + '\n' + itemMatch[i + 1]);
                i--;
                l--;
                continue;
              } else {
                if ( // different bullet style
                !this.options.pedantic || this.options.smartLists ? bnext[2][bnext[2].length - 1] !== bull[bull.length - 1] : isordered === (bnext[2].length === 1)) {
                  addBack = itemMatch.slice(i + 1).join('\n');
                  list.raw = list.raw.substring(0, list.raw.length - addBack.length);
                  i = l - 1;
                }
              }

              bcurr = bnext;
            } // Remove the list item's bullet
            // so it is seen as the next token.


            space = item.length;
            item = item.replace(/^ *([*+-]|\d+[.)]) ?/, ''); // Outdent whatever the
            // list item contains. Hacky.

            if (~item.indexOf('\n ')) {
              space -= item.length;
              item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
            } // Determine whether item is loose or not.
            // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
            // for discount behavior.


            loose = next || /\n\n(?!\s*$)/.test(item);

            if (i !== l - 1) {
              next = item.charAt(item.length - 1) === '\n';
              if (!loose) loose = next;
            }

            if (loose) {
              list.loose = true;
            } // Check for task list items


            istask = /^\[[ xX]\] /.test(item);
            ischecked = undefined;

            if (istask) {
              ischecked = item[1] !== ' ';
              item = item.replace(/^\[[ xX]\] +/, '');
            }

            list.items.push({
              type: 'list_item',
              raw: raw,
              task: istask,
              checked: ischecked,
              loose: loose,
              text: item
            });
          }

          return list;
        }
      };

      _proto.html = function html(src) {
        var cap = this.rules.block.html.exec(src);

        if (cap) {
          return {
            type: this.options.sanitize ? 'paragraph' : 'html',
            raw: cap[0],
            pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
          };
        }
      };

      _proto.def = function def(src) {
        var cap = this.rules.block.def.exec(src);

        if (cap) {
          if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
          var tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
          return {
            tag: tag,
            raw: cap[0],
            href: cap[2],
            title: cap[3]
          };
        }
      };

      _proto.table = function table(src) {
        var cap = this.rules.block.table.exec(src);

        if (cap) {
          var item = {
            type: 'table',
            header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
          };

          if (item.header.length === item.align.length) {
            item.raw = cap[0];
            var l = item.align.length;
            var i;

            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = 'right';
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = 'center';
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = 'left';
              } else {
                item.align[i] = null;
              }
            }

            l = item.cells.length;

            for (i = 0; i < l; i++) {
              item.cells[i] = splitCells$1(item.cells[i].replace(/^ *\| *| *\| *$/g, ''), item.header.length);
            }

            return item;
          }
        }
      };

      _proto.lheading = function lheading(src) {
        var cap = this.rules.block.lheading.exec(src);

        if (cap) {
          return {
            type: 'heading',
            raw: cap[0],
            depth: cap[2].charAt(0) === '=' ? 1 : 2,
            text: cap[1]
          };
        }
      };

      _proto.paragraph = function paragraph(src) {
        var cap = this.rules.block.paragraph.exec(src);

        if (cap) {
          return {
            type: 'paragraph',
            raw: cap[0],
            text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
          };
        }
      };

      _proto.text = function text(src, tokens) {
        var cap = this.rules.block.text.exec(src);

        if (cap) {
          var lastToken = tokens[tokens.length - 1];

          if (lastToken && lastToken.type === 'text') {
            return {
              raw: cap[0],
              text: cap[0]
            };
          }

          return {
            type: 'text',
            raw: cap[0],
            text: cap[0]
          };
        }
      };

      _proto.escape = function escape(src) {
        var cap = this.rules.inline.escape.exec(src);

        if (cap) {
          return {
            type: 'escape',
            raw: cap[0],
            text: _escape(cap[1])
          };
        }
      };

      _proto.tag = function tag(src, inLink, inRawBlock) {
        var cap = this.rules.inline.tag.exec(src);

        if (cap) {
          if (!inLink && /^<a /i.test(cap[0])) {
            inLink = true;
          } else if (inLink && /^<\/a>/i.test(cap[0])) {
            inLink = false;
          }

          if (!inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            inRawBlock = true;
          } else if (inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            inRawBlock = false;
          }

          return {
            type: this.options.sanitize ? 'text' : 'html',
            raw: cap[0],
            inLink: inLink,
            inRawBlock: inRawBlock,
            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
          };
        }
      };

      _proto.link = function link(src) {
        var cap = this.rules.inline.link.exec(src);

        if (cap) {
          var lastParenIndex = findClosingBracket$1(cap[2], '()');

          if (lastParenIndex > -1) {
            var start = cap[0].indexOf('!') === 0 ? 5 : 4;
            var linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = '';
          }

          var href = cap[2];
          var title = '';

          if (this.options.pedantic) {
            var link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

            if (link) {
              href = link[1];
              title = link[3];
            } else {
              title = '';
            }
          } else {
            title = cap[3] ? cap[3].slice(1, -1) : '';
          }

          href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
          var token = outputLink(cap, {
            href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
            title: title ? title.replace(this.rules.inline._escapes, '$1') : title
          }, cap[0]);
          return token;
        }
      };

      _proto.reflink = function reflink(src, links) {
        var cap;

        if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
          var link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
          link = links[link.toLowerCase()];

          if (!link || !link.href) {
            var text = cap[0].charAt(0);
            return {
              type: 'text',
              raw: text,
              text: text
            };
          }

          var token = outputLink(cap, link, cap[0]);
          return token;
        }
      };

      _proto.strong = function strong(src, maskedSrc, prevChar) {
        if (prevChar === void 0) {
          prevChar = '';
        }

        var match = this.rules.inline.strong.start.exec(src);

        if (match && (!match[1] || match[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
          maskedSrc = maskedSrc.slice(-1 * src.length);
          var endReg = match[0] === '**' ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;
          endReg.lastIndex = 0;
          var cap;

          while ((match = endReg.exec(maskedSrc)) != null) {
            cap = this.rules.inline.strong.middle.exec(maskedSrc.slice(0, match.index + 3));

            if (cap) {
              return {
                type: 'strong',
                raw: src.slice(0, cap[0].length),
                text: src.slice(2, cap[0].length - 2)
              };
            }
          }
        }
      };

      _proto.em = function em(src, maskedSrc, prevChar) {
        if (prevChar === void 0) {
          prevChar = '';
        }

        var match = this.rules.inline.em.start.exec(src);

        if (match && (!match[1] || match[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
          maskedSrc = maskedSrc.slice(-1 * src.length);
          var endReg = match[0] === '*' ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;
          endReg.lastIndex = 0;
          var cap;

          while ((match = endReg.exec(maskedSrc)) != null) {
            cap = this.rules.inline.em.middle.exec(maskedSrc.slice(0, match.index + 2));

            if (cap) {
              return {
                type: 'em',
                raw: src.slice(0, cap[0].length),
                text: src.slice(1, cap[0].length - 1)
              };
            }
          }
        }
      };

      _proto.codespan = function codespan(src) {
        var cap = this.rules.inline.code.exec(src);

        if (cap) {
          var text = cap[2].replace(/\n/g, ' ');
          var hasNonSpaceChars = /[^ ]/.test(text);
          var hasSpaceCharsOnBothEnds = text.startsWith(' ') && text.endsWith(' ');

          if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
            text = text.substring(1, text.length - 1);
          }

          text = _escape(text, true);
          return {
            type: 'codespan',
            raw: cap[0],
            text: text
          };
        }
      };

      _proto.br = function br(src) {
        var cap = this.rules.inline.br.exec(src);

        if (cap) {
          return {
            type: 'br',
            raw: cap[0]
          };
        }
      };

      _proto.del = function del(src) {
        var cap = this.rules.inline.del.exec(src);

        if (cap) {
          return {
            type: 'del',
            raw: cap[0],
            text: cap[2]
          };
        }
      };

      _proto.autolink = function autolink(src, mangle) {
        var cap = this.rules.inline.autolink.exec(src);

        if (cap) {
          var text, href;

          if (cap[2] === '@') {
            text = _escape(this.options.mangle ? mangle(cap[1]) : cap[1]);
            href = 'mailto:' + text;
          } else {
            text = _escape(cap[1]);
            href = text;
          }

          return {
            type: 'link',
            raw: cap[0],
            text: text,
            href: href,
            tokens: [{
              type: 'text',
              raw: text,
              text: text
            }]
          };
        }
      };

      _proto.url = function url(src, mangle) {
        var cap;

        if (cap = this.rules.inline.url.exec(src)) {
          var text, href;

          if (cap[2] === '@') {
            text = _escape(this.options.mangle ? mangle(cap[0]) : cap[0]);
            href = 'mailto:' + text;
          } else {
            // do extended autolink path validation
            var prevCapZero;

            do {
              prevCapZero = cap[0];
              cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
            } while (prevCapZero !== cap[0]);

            text = _escape(cap[0]);

            if (cap[1] === 'www.') {
              href = 'http://' + text;
            } else {
              href = text;
            }
          }

          return {
            type: 'link',
            raw: cap[0],
            text: text,
            href: href,
            tokens: [{
              type: 'text',
              raw: text,
              text: text
            }]
          };
        }
      };

      _proto.inlineText = function inlineText(src, inRawBlock, smartypants) {
        var cap = this.rules.inline.text.exec(src);

        if (cap) {
          var text;

          if (inRawBlock) {
            text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0];
          } else {
            text = _escape(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
          }

          return {
            type: 'text',
            raw: cap[0],
            text: text
          };
        }
      };

      return Tokenizer;
    }();

    var noopTest$1 = helpers.noopTest,
        edit$1 = helpers.edit,
        merge$1 = helpers.merge;
    /**
     * Block-Level Grammar
     */

    var block = {
      newline: /^\n+/,
      code: /^( {4}[^\n]+\n*)+/,
      fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
      hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
      heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
      blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
      list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,
      html: '^ {0,3}(?:' // optional indentation
      + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
      + '|comment[^\\n]*(\\n+|$)' // (2)
      + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
      + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
      + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
      + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
      + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
      + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
      + ')',
      def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
      nptable: noopTest$1,
      table: noopTest$1,
      lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
      // regex template, placeholders will be replaced according to different paragraph
      // interruption rules of commonmark and the original markdown spec:
      _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
      text: /^[^\n]+/
    };
    block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
    block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
    block.def = edit$1(block.def).replace('label', block._label).replace('title', block._title).getRegex();
    block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
    block.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/;
    block.item = edit$1(block.item, 'gm').replace(/bull/g, block.bullet).getRegex();
    block.listItemStart = edit$1(/^( *)(bull)/).replace('bull', block.bullet).getRegex();
    block.list = edit$1(block.list).replace(/bull/g, block.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block.def.source + ')').getRegex();
    block._tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' + '|track|ul';
    block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
    block.html = edit$1(block.html, 'i').replace('comment', block._comment).replace('tag', block._tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
    block.paragraph = edit$1(block._paragraph).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
    .replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
    .getRegex();
    block.blockquote = edit$1(block.blockquote).replace('paragraph', block.paragraph).getRegex();
    /**
     * Normal Block Grammar
     */

    block.normal = merge$1({}, block);
    /**
     * GFM Block Grammar
     */

    block.gfm = merge$1({}, block.normal, {
      nptable: '^ *([^|\\n ].*\\|.*)\\n' // Header
      + ' {0,3}([-:]+ *\\|[-| :]*)' // Align
      + '(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
      // Cells
      table: '^ *\\|(.+)\\n' // Header
      + ' {0,3}\\|?( *[-:]+[-| :]*)' // Align
      + '(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells

    });
    block.gfm.nptable = edit$1(block.gfm.nptable).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
    .getRegex();
    block.gfm.table = edit$1(block.gfm.table).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
    .getRegex();
    /**
     * Pedantic grammar (original John Gruber's loose markdown specification)
     */

    block.pedantic = merge$1({}, block.normal, {
      html: edit$1('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
      + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', block._comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
      fences: noopTest$1,
      // fences not supported
      paragraph: edit$1(block.normal._paragraph).replace('hr', block.hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', block.lheading).replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').getRegex()
    });
    /**
     * Inline-Level Grammar
     */

    var inline = {
      escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
      autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
      url: noopTest$1,
      tag: '^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
      + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
      + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
      + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
      + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
      // CDATA section
      link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
      reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
      nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
      reflinkSearch: 'reflink|nolink(?!\\()',
      strong: {
        start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,
        // (1) returns if starts w/ punctuation
        middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
        endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/,
        // last char can't be punct, or final * must also be followed by punct (or endline)
        endUnd: /[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/ // last char can't be a space, and final _ must preceed punct or \s (or endline)

      },
      em: {
        start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,
        // (1) returns if starts w/ punctuation
        middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
        endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/,
        // last char can't be punct, or final * must also be followed by punct (or endline)
        endUnd: /[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/ // last char can't be a space, and final _ must preceed punct or \s (or endline)

      },
      code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
      br: /^( {2,}|\\)\n(?!\s*$)/,
      del: noopTest$1,
      text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/,
      punctuation: /^([\s*punctuation])/
    }; // list of punctuation marks from common mark spec
    // without * and _ to workaround cases with double emphasis

    inline._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
    inline.punctuation = edit$1(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex(); // sequences em should skip over [title](link), `code`, <html>

    inline._blockSkip = '\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>';
    inline._overlapSkip = '__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*';
    inline._comment = edit$1(block._comment).replace('(?:-->|$)', '-->').getRegex();
    inline.em.start = edit$1(inline.em.start).replace(/punctuation/g, inline._punctuation).getRegex();
    inline.em.middle = edit$1(inline.em.middle).replace(/punctuation/g, inline._punctuation).replace(/overlapSkip/g, inline._overlapSkip).getRegex();
    inline.em.endAst = edit$1(inline.em.endAst, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
    inline.em.endUnd = edit$1(inline.em.endUnd, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
    inline.strong.start = edit$1(inline.strong.start).replace(/punctuation/g, inline._punctuation).getRegex();
    inline.strong.middle = edit$1(inline.strong.middle).replace(/punctuation/g, inline._punctuation).replace(/overlapSkip/g, inline._overlapSkip).getRegex();
    inline.strong.endAst = edit$1(inline.strong.endAst, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
    inline.strong.endUnd = edit$1(inline.strong.endUnd, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
    inline.blockSkip = edit$1(inline._blockSkip, 'g').getRegex();
    inline.overlapSkip = edit$1(inline._overlapSkip, 'g').getRegex();
    inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
    inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
    inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
    inline.autolink = edit$1(inline.autolink).replace('scheme', inline._scheme).replace('email', inline._email).getRegex();
    inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
    inline.tag = edit$1(inline.tag).replace('comment', inline._comment).replace('attribute', inline._attribute).getRegex();
    inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
    inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
    inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
    inline.link = edit$1(inline.link).replace('label', inline._label).replace('href', inline._href).replace('title', inline._title).getRegex();
    inline.reflink = edit$1(inline.reflink).replace('label', inline._label).getRegex();
    inline.reflinkSearch = edit$1(inline.reflinkSearch, 'g').replace('reflink', inline.reflink).replace('nolink', inline.nolink).getRegex();
    /**
     * Normal Inline Grammar
     */

    inline.normal = merge$1({}, inline);
    /**
     * Pedantic Inline Grammar
     */

    inline.pedantic = merge$1({}, inline.normal, {
      strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
      },
      em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
      },
      link: edit$1(/^!?\[(label)\]\((.*?)\)/).replace('label', inline._label).getRegex(),
      reflink: edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', inline._label).getRegex()
    });
    /**
     * GFM Inline Grammar
     */

    inline.gfm = merge$1({}, inline.normal, {
      escape: edit$1(inline.escape).replace('])', '~|])').getRegex(),
      _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
      url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
    });
    inline.gfm.url = edit$1(inline.gfm.url, 'i').replace('email', inline.gfm._extended_email).getRegex();
    /**
     * GFM + Line Breaks Inline Grammar
     */

    inline.breaks = merge$1({}, inline.gfm, {
      br: edit$1(inline.br).replace('{2,}', '*').getRegex(),
      text: edit$1(inline.gfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
    });
    var rules = {
      block: block,
      inline: inline
    };

    var defaults$2 = defaults.defaults;
    var block$1 = rules.block,
        inline$1 = rules.inline;
    var repeatString$1 = helpers.repeatString;
    /**
     * smartypants text replacement
     */

    function smartypants(text) {
      return text // em-dashes
      .replace(/---/g, "\u2014") // en-dashes
      .replace(/--/g, "\u2013") // opening singles
      .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018") // closing singles & apostrophes
      .replace(/'/g, "\u2019") // opening doubles
      .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C") // closing doubles
      .replace(/"/g, "\u201D") // ellipses
      .replace(/\.{3}/g, "\u2026");
    }
    /**
     * mangle email addresses
     */


    function mangle(text) {
      var out = '',
          i,
          ch;
      var l = text.length;

      for (i = 0; i < l; i++) {
        ch = text.charCodeAt(i);

        if (Math.random() > 0.5) {
          ch = 'x' + ch.toString(16);
        }

        out += '&#' + ch + ';';
      }

      return out;
    }
    /**
     * Block Lexer
     */


    var Lexer_1 = /*#__PURE__*/function () {
      function Lexer(options) {
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options || defaults$2;
        this.options.tokenizer = this.options.tokenizer || new Tokenizer_1();
        this.tokenizer = this.options.tokenizer;
        this.tokenizer.options = this.options;
        var rules = {
          block: block$1.normal,
          inline: inline$1.normal
        };

        if (this.options.pedantic) {
          rules.block = block$1.pedantic;
          rules.inline = inline$1.pedantic;
        } else if (this.options.gfm) {
          rules.block = block$1.gfm;

          if (this.options.breaks) {
            rules.inline = inline$1.breaks;
          } else {
            rules.inline = inline$1.gfm;
          }
        }

        this.tokenizer.rules = rules;
      }
      /**
       * Expose Rules
       */


      /**
       * Static Lex Method
       */
      Lexer.lex = function lex(src, options) {
        var lexer = new Lexer(options);
        return lexer.lex(src);
      }
      /**
       * Static Lex Inline Method
       */
      ;

      Lexer.lexInline = function lexInline(src, options) {
        var lexer = new Lexer(options);
        return lexer.inlineTokens(src);
      }
      /**
       * Preprocessing
       */
      ;

      var _proto = Lexer.prototype;

      _proto.lex = function lex(src) {
        src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ');
        this.blockTokens(src, this.tokens, true);
        this.inline(this.tokens);
        return this.tokens;
      }
      /**
       * Lexing
       */
      ;

      _proto.blockTokens = function blockTokens(src, tokens, top) {
        if (tokens === void 0) {
          tokens = [];
        }

        if (top === void 0) {
          top = true;
        }

        src = src.replace(/^ +$/gm, '');
        var token, i, l, lastToken;

        while (src) {
          // newline
          if (token = this.tokenizer.space(src)) {
            src = src.substring(token.raw.length);

            if (token.type) {
              tokens.push(token);
            }

            continue;
          } // code


          if (token = this.tokenizer.code(src, tokens)) {
            src = src.substring(token.raw.length);

            if (token.type) {
              tokens.push(token);
            } else {
              lastToken = tokens[tokens.length - 1];
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.text;
            }

            continue;
          } // fences


          if (token = this.tokenizer.fences(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // heading


          if (token = this.tokenizer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // table no leading pipe (gfm)


          if (token = this.tokenizer.nptable(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // hr


          if (token = this.tokenizer.hr(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // blockquote


          if (token = this.tokenizer.blockquote(src)) {
            src = src.substring(token.raw.length);
            token.tokens = this.blockTokens(token.text, [], top);
            tokens.push(token);
            continue;
          } // list


          if (token = this.tokenizer.list(src)) {
            src = src.substring(token.raw.length);
            l = token.items.length;

            for (i = 0; i < l; i++) {
              token.items[i].tokens = this.blockTokens(token.items[i].text, [], false);
            }

            tokens.push(token);
            continue;
          } // html


          if (token = this.tokenizer.html(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // def


          if (top && (token = this.tokenizer.def(src))) {
            src = src.substring(token.raw.length);

            if (!this.tokens.links[token.tag]) {
              this.tokens.links[token.tag] = {
                href: token.href,
                title: token.title
              };
            }

            continue;
          } // table (gfm)


          if (token = this.tokenizer.table(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // lheading


          if (token = this.tokenizer.lheading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // top-level paragraph


          if (top && (token = this.tokenizer.paragraph(src))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // text


          if (token = this.tokenizer.text(src, tokens)) {
            src = src.substring(token.raw.length);

            if (token.type) {
              tokens.push(token);
            } else {
              lastToken = tokens[tokens.length - 1];
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.text;
            }

            continue;
          }

          if (src) {
            var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);

            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }

        return tokens;
      };

      _proto.inline = function inline(tokens) {
        var i, j, k, l2, row, token;
        var l = tokens.length;

        for (i = 0; i < l; i++) {
          token = tokens[i];

          switch (token.type) {
            case 'paragraph':
            case 'text':
            case 'heading':
              {
                token.tokens = [];
                this.inlineTokens(token.text, token.tokens);
                break;
              }

            case 'table':
              {
                token.tokens = {
                  header: [],
                  cells: []
                }; // header

                l2 = token.header.length;

                for (j = 0; j < l2; j++) {
                  token.tokens.header[j] = [];
                  this.inlineTokens(token.header[j], token.tokens.header[j]);
                } // cells


                l2 = token.cells.length;

                for (j = 0; j < l2; j++) {
                  row = token.cells[j];
                  token.tokens.cells[j] = [];

                  for (k = 0; k < row.length; k++) {
                    token.tokens.cells[j][k] = [];
                    this.inlineTokens(row[k], token.tokens.cells[j][k]);
                  }
                }

                break;
              }

            case 'blockquote':
              {
                this.inline(token.tokens);
                break;
              }

            case 'list':
              {
                l2 = token.items.length;

                for (j = 0; j < l2; j++) {
                  this.inline(token.items[j].tokens);
                }

                break;
              }
          }
        }

        return tokens;
      }
      /**
       * Lexing/Compiling
       */
      ;

      _proto.inlineTokens = function inlineTokens(src, tokens, inLink, inRawBlock, prevChar) {
        if (tokens === void 0) {
          tokens = [];
        }

        if (inLink === void 0) {
          inLink = false;
        }

        if (inRawBlock === void 0) {
          inRawBlock = false;
        }

        if (prevChar === void 0) {
          prevChar = '';
        }

        var token; // String with links masked to avoid interference with em and strong

        var maskedSrc = src;
        var match; // Mask out reflinks

        if (this.tokens.links) {
          var links = Object.keys(this.tokens.links);

          if (links.length > 0) {
            while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
              if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
                maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString$1('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
              }
            }
          }
        } // Mask out other blocks


        while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString$1('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }

        while (src) {
          // escape
          if (token = this.tokenizer.escape(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // tag


          if (token = this.tokenizer.tag(src, inLink, inRawBlock)) {
            src = src.substring(token.raw.length);
            inLink = token.inLink;
            inRawBlock = token.inRawBlock;
            tokens.push(token);
            continue;
          } // link


          if (token = this.tokenizer.link(src)) {
            src = src.substring(token.raw.length);

            if (token.type === 'link') {
              token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
            }

            tokens.push(token);
            continue;
          } // reflink, nolink


          if (token = this.tokenizer.reflink(src, this.tokens.links)) {
            src = src.substring(token.raw.length);

            if (token.type === 'link') {
              token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
            }

            tokens.push(token);
            continue;
          } // strong


          if (token = this.tokenizer.strong(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          } // em


          if (token = this.tokenizer.em(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          } // code


          if (token = this.tokenizer.codespan(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // br


          if (token = this.tokenizer.br(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // del (gfm)


          if (token = this.tokenizer.del(src)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          } // autolink


          if (token = this.tokenizer.autolink(src, mangle)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // url (gfm)


          if (!inLink && (token = this.tokenizer.url(src, mangle))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          } // text


          if (token = this.tokenizer.inlineText(src, inRawBlock, smartypants)) {
            src = src.substring(token.raw.length);
            prevChar = token.raw.slice(-1);
            tokens.push(token);
            continue;
          }

          if (src) {
            var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);

            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }

        return tokens;
      };

      _createClass(Lexer, null, [{
        key: "rules",
        get: function get() {
          return {
            block: block$1,
            inline: inline$1
          };
        }
      }]);

      return Lexer;
    }();

    var defaults$3 = defaults.defaults;
    var cleanUrl$1 = helpers.cleanUrl,
        escape$1 = helpers.escape;
    /**
     * Renderer
     */

    var Renderer_1 = /*#__PURE__*/function () {
      function Renderer(options) {
        this.options = options || defaults$3;
      }

      var _proto = Renderer.prototype;

      _proto.code = function code(_code, infostring, escaped) {
        var lang = (infostring || '').match(/\S*/)[0];

        if (this.options.highlight) {
          var out = this.options.highlight(_code, lang);

          if (out != null && out !== _code) {
            escaped = true;
            _code = out;
          }
        }

        if (!lang) {
          return '<pre><code>' + (escaped ? _code : escape$1(_code, true)) + '</code></pre>\n';
        }

        return '<pre><code class="' + this.options.langPrefix + escape$1(lang, true) + '">' + (escaped ? _code : escape$1(_code, true)) + '</code></pre>\n';
      };

      _proto.blockquote = function blockquote(quote) {
        return '<blockquote>\n' + quote + '</blockquote>\n';
      };

      _proto.html = function html(_html) {
        return _html;
      };

      _proto.heading = function heading(text, level, raw, slugger) {
        if (this.options.headerIds) {
          return '<h' + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + '</h' + level + '>\n';
        } // ignore IDs


        return '<h' + level + '>' + text + '</h' + level + '>\n';
      };

      _proto.hr = function hr() {
        return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
      };

      _proto.list = function list(body, ordered, start) {
        var type = ordered ? 'ol' : 'ul',
            startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
        return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
      };

      _proto.listitem = function listitem(text) {
        return '<li>' + text + '</li>\n';
      };

      _proto.checkbox = function checkbox(checked) {
        return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox"' + (this.options.xhtml ? ' /' : '') + '> ';
      };

      _proto.paragraph = function paragraph(text) {
        return '<p>' + text + '</p>\n';
      };

      _proto.table = function table(header, body) {
        if (body) body = '<tbody>' + body + '</tbody>';
        return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
      };

      _proto.tablerow = function tablerow(content) {
        return '<tr>\n' + content + '</tr>\n';
      };

      _proto.tablecell = function tablecell(content, flags) {
        var type = flags.header ? 'th' : 'td';
        var tag = flags.align ? '<' + type + ' align="' + flags.align + '">' : '<' + type + '>';
        return tag + content + '</' + type + '>\n';
      } // span level renderer
      ;

      _proto.strong = function strong(text) {
        return '<strong>' + text + '</strong>';
      };

      _proto.em = function em(text) {
        return '<em>' + text + '</em>';
      };

      _proto.codespan = function codespan(text) {
        return '<code>' + text + '</code>';
      };

      _proto.br = function br() {
        return this.options.xhtml ? '<br/>' : '<br>';
      };

      _proto.del = function del(text) {
        return '<del>' + text + '</del>';
      };

      _proto.link = function link(href, title, text) {
        href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);

        if (href === null) {
          return text;
        }

        var out = '<a href="' + escape$1(href) + '"';

        if (title) {
          out += ' title="' + title + '"';
        }

        out += '>' + text + '</a>';
        return out;
      };

      _proto.image = function image(href, title, text) {
        href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);

        if (href === null) {
          return text;
        }

        var out = '<img src="' + href + '" alt="' + text + '"';

        if (title) {
          out += ' title="' + title + '"';
        }

        out += this.options.xhtml ? '/>' : '>';
        return out;
      };

      _proto.text = function text(_text) {
        return _text;
      };

      return Renderer;
    }();

    /**
     * TextRenderer
     * returns only the textual part of the token
     */
    var TextRenderer_1 = /*#__PURE__*/function () {
      function TextRenderer() {}

      var _proto = TextRenderer.prototype;

      // no need for block level renderers
      _proto.strong = function strong(text) {
        return text;
      };

      _proto.em = function em(text) {
        return text;
      };

      _proto.codespan = function codespan(text) {
        return text;
      };

      _proto.del = function del(text) {
        return text;
      };

      _proto.html = function html(text) {
        return text;
      };

      _proto.text = function text(_text) {
        return _text;
      };

      _proto.link = function link(href, title, text) {
        return '' + text;
      };

      _proto.image = function image(href, title, text) {
        return '' + text;
      };

      _proto.br = function br() {
        return '';
      };

      return TextRenderer;
    }();

    /**
     * Slugger generates header id
     */
    var Slugger_1 = /*#__PURE__*/function () {
      function Slugger() {
        this.seen = {};
      }

      var _proto = Slugger.prototype;

      _proto.serialize = function serialize(value) {
        return value.toLowerCase().trim() // remove html tags
        .replace(/<[!\/a-z].*?>/ig, '') // remove unwanted chars
        .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '').replace(/\s/g, '-');
      }
      /**
       * Finds the next safe (unique) slug to use
       */
      ;

      _proto.getNextSafeSlug = function getNextSafeSlug(originalSlug, isDryRun) {
        var slug = originalSlug;
        var occurenceAccumulator = 0;

        if (this.seen.hasOwnProperty(slug)) {
          occurenceAccumulator = this.seen[originalSlug];

          do {
            occurenceAccumulator++;
            slug = originalSlug + '-' + occurenceAccumulator;
          } while (this.seen.hasOwnProperty(slug));
        }

        if (!isDryRun) {
          this.seen[originalSlug] = occurenceAccumulator;
          this.seen[slug] = 0;
        }

        return slug;
      }
      /**
       * Convert string to unique id
       * @param {object} options
       * @param {boolean} options.dryrun Generates the next unique slug without updating the internal accumulator.
       */
      ;

      _proto.slug = function slug(value, options) {
        if (options === void 0) {
          options = {};
        }

        var slug = this.serialize(value);
        return this.getNextSafeSlug(slug, options.dryrun);
      };

      return Slugger;
    }();

    var defaults$4 = defaults.defaults;
    var unescape$1 = helpers.unescape;
    /**
     * Parsing & Compiling
     */

    var Parser_1 = /*#__PURE__*/function () {
      function Parser(options) {
        this.options = options || defaults$4;
        this.options.renderer = this.options.renderer || new Renderer_1();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.textRenderer = new TextRenderer_1();
        this.slugger = new Slugger_1();
      }
      /**
       * Static Parse Method
       */


      Parser.parse = function parse(tokens, options) {
        var parser = new Parser(options);
        return parser.parse(tokens);
      }
      /**
       * Static Parse Inline Method
       */
      ;

      Parser.parseInline = function parseInline(tokens, options) {
        var parser = new Parser(options);
        return parser.parseInline(tokens);
      }
      /**
       * Parse Loop
       */
      ;

      var _proto = Parser.prototype;

      _proto.parse = function parse(tokens, top) {
        if (top === void 0) {
          top = true;
        }

        var out = '',
            i,
            j,
            k,
            l2,
            l3,
            row,
            cell,
            header,
            body,
            token,
            ordered,
            start,
            loose,
            itemBody,
            item,
            checked,
            task,
            checkbox;
        var l = tokens.length;

        for (i = 0; i < l; i++) {
          token = tokens[i];

          switch (token.type) {
            case 'space':
              {
                continue;
              }

            case 'hr':
              {
                out += this.renderer.hr();
                continue;
              }

            case 'heading':
              {
                out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape$1(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
                continue;
              }

            case 'code':
              {
                out += this.renderer.code(token.text, token.lang, token.escaped);
                continue;
              }

            case 'table':
              {
                header = ''; // header

                cell = '';
                l2 = token.header.length;

                for (j = 0; j < l2; j++) {
                  cell += this.renderer.tablecell(this.parseInline(token.tokens.header[j]), {
                    header: true,
                    align: token.align[j]
                  });
                }

                header += this.renderer.tablerow(cell);
                body = '';
                l2 = token.cells.length;

                for (j = 0; j < l2; j++) {
                  row = token.tokens.cells[j];
                  cell = '';
                  l3 = row.length;

                  for (k = 0; k < l3; k++) {
                    cell += this.renderer.tablecell(this.parseInline(row[k]), {
                      header: false,
                      align: token.align[k]
                    });
                  }

                  body += this.renderer.tablerow(cell);
                }

                out += this.renderer.table(header, body);
                continue;
              }

            case 'blockquote':
              {
                body = this.parse(token.tokens);
                out += this.renderer.blockquote(body);
                continue;
              }

            case 'list':
              {
                ordered = token.ordered;
                start = token.start;
                loose = token.loose;
                l2 = token.items.length;
                body = '';

                for (j = 0; j < l2; j++) {
                  item = token.items[j];
                  checked = item.checked;
                  task = item.task;
                  itemBody = '';

                  if (item.task) {
                    checkbox = this.renderer.checkbox(checked);

                    if (loose) {
                      if (item.tokens.length > 0 && item.tokens[0].type === 'text') {
                        item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;

                        if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                          item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                        }
                      } else {
                        item.tokens.unshift({
                          type: 'text',
                          text: checkbox
                        });
                      }
                    } else {
                      itemBody += checkbox;
                    }
                  }

                  itemBody += this.parse(item.tokens, loose);
                  body += this.renderer.listitem(itemBody, task, checked);
                }

                out += this.renderer.list(body, ordered, start);
                continue;
              }

            case 'html':
              {
                // TODO parse inline content if parameter markdown=1
                out += this.renderer.html(token.text);
                continue;
              }

            case 'paragraph':
              {
                out += this.renderer.paragraph(this.parseInline(token.tokens));
                continue;
              }

            case 'text':
              {
                body = token.tokens ? this.parseInline(token.tokens) : token.text;

                while (i + 1 < l && tokens[i + 1].type === 'text') {
                  token = tokens[++i];
                  body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
                }

                out += top ? this.renderer.paragraph(body) : body;
                continue;
              }

            default:
              {
                var errMsg = 'Token with "' + token.type + '" type was not found.';

                if (this.options.silent) {
                  console.error(errMsg);
                  return;
                } else {
                  throw new Error(errMsg);
                }
              }
          }
        }

        return out;
      }
      /**
       * Parse Inline Tokens
       */
      ;

      _proto.parseInline = function parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        var out = '',
            i,
            token;
        var l = tokens.length;

        for (i = 0; i < l; i++) {
          token = tokens[i];

          switch (token.type) {
            case 'escape':
              {
                out += renderer.text(token.text);
                break;
              }

            case 'html':
              {
                out += renderer.html(token.text);
                break;
              }

            case 'link':
              {
                out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
                break;
              }

            case 'image':
              {
                out += renderer.image(token.href, token.title, token.text);
                break;
              }

            case 'strong':
              {
                out += renderer.strong(this.parseInline(token.tokens, renderer));
                break;
              }

            case 'em':
              {
                out += renderer.em(this.parseInline(token.tokens, renderer));
                break;
              }

            case 'codespan':
              {
                out += renderer.codespan(token.text);
                break;
              }

            case 'br':
              {
                out += renderer.br();
                break;
              }

            case 'del':
              {
                out += renderer.del(this.parseInline(token.tokens, renderer));
                break;
              }

            case 'text':
              {
                out += renderer.text(token.text);
                break;
              }

            default:
              {
                var errMsg = 'Token with "' + token.type + '" type was not found.';

                if (this.options.silent) {
                  console.error(errMsg);
                  return;
                } else {
                  throw new Error(errMsg);
                }
              }
          }
        }

        return out;
      };

      return Parser;
    }();

    var merge$2 = helpers.merge,
        checkSanitizeDeprecation$1 = helpers.checkSanitizeDeprecation,
        escape$2 = helpers.escape;
    var getDefaults = defaults.getDefaults,
        changeDefaults = defaults.changeDefaults,
        defaults$5 = defaults.defaults;
    /**
     * Marked
     */

    function marked(src, opt, callback) {
      // throw error in case of non string input
      if (typeof src === 'undefined' || src === null) {
        throw new Error('marked(): input parameter is undefined or null');
      }

      if (typeof src !== 'string') {
        throw new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
      }

      if (typeof opt === 'function') {
        callback = opt;
        opt = null;
      }

      opt = merge$2({}, marked.defaults, opt || {});
      checkSanitizeDeprecation$1(opt);

      if (callback) {
        var highlight = opt.highlight;
        var tokens;

        try {
          tokens = Lexer_1.lex(src, opt);
        } catch (e) {
          return callback(e);
        }

        var done = function done(err) {
          var out;

          if (!err) {
            try {
              out = Parser_1.parse(tokens, opt);
            } catch (e) {
              err = e;
            }
          }

          opt.highlight = highlight;
          return err ? callback(err) : callback(null, out);
        };

        if (!highlight || highlight.length < 3) {
          return done();
        }

        delete opt.highlight;
        if (!tokens.length) return done();
        var pending = 0;
        marked.walkTokens(tokens, function (token) {
          if (token.type === 'code') {
            pending++;
            setTimeout(function () {
              highlight(token.text, token.lang, function (err, code) {
                if (err) {
                  return done(err);
                }

                if (code != null && code !== token.text) {
                  token.text = code;
                  token.escaped = true;
                }

                pending--;

                if (pending === 0) {
                  done();
                }
              });
            }, 0);
          }
        });

        if (pending === 0) {
          done();
        }

        return;
      }

      try {
        var _tokens = Lexer_1.lex(src, opt);

        if (opt.walkTokens) {
          marked.walkTokens(_tokens, opt.walkTokens);
        }

        return Parser_1.parse(_tokens, opt);
      } catch (e) {
        e.message += '\nPlease report this to https://github.com/markedjs/marked.';

        if (opt.silent) {
          return '<p>An error occurred:</p><pre>' + escape$2(e.message + '', true) + '</pre>';
        }

        throw e;
      }
    }
    /**
     * Options
     */


    marked.options = marked.setOptions = function (opt) {
      merge$2(marked.defaults, opt);
      changeDefaults(marked.defaults);
      return marked;
    };

    marked.getDefaults = getDefaults;
    marked.defaults = defaults$5;
    /**
     * Use Extension
     */

    marked.use = function (extension) {
      var opts = merge$2({}, extension);

      if (extension.renderer) {
        (function () {
          var renderer = marked.defaults.renderer || new Renderer_1();

          var _loop = function _loop(prop) {
            var prevRenderer = renderer[prop];

            renderer[prop] = function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              var ret = extension.renderer[prop].apply(renderer, args);

              if (ret === false) {
                ret = prevRenderer.apply(renderer, args);
              }

              return ret;
            };
          };

          for (var prop in extension.renderer) {
            _loop(prop);
          }

          opts.renderer = renderer;
        })();
      }

      if (extension.tokenizer) {
        (function () {
          var tokenizer = marked.defaults.tokenizer || new Tokenizer_1();

          var _loop2 = function _loop2(prop) {
            var prevTokenizer = tokenizer[prop];

            tokenizer[prop] = function () {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              var ret = extension.tokenizer[prop].apply(tokenizer, args);

              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args);
              }

              return ret;
            };
          };

          for (var prop in extension.tokenizer) {
            _loop2(prop);
          }

          opts.tokenizer = tokenizer;
        })();
      }

      if (extension.walkTokens) {
        var walkTokens = marked.defaults.walkTokens;

        opts.walkTokens = function (token) {
          extension.walkTokens(token);

          if (walkTokens) {
            walkTokens(token);
          }
        };
      }

      marked.setOptions(opts);
    };
    /**
     * Run callback for every token
     */


    marked.walkTokens = function (tokens, callback) {
      for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done;) {
        var token = _step.value;
        callback(token);

        switch (token.type) {
          case 'table':
            {
              for (var _iterator2 = _createForOfIteratorHelperLoose(token.tokens.header), _step2; !(_step2 = _iterator2()).done;) {
                var cell = _step2.value;
                marked.walkTokens(cell, callback);
              }

              for (var _iterator3 = _createForOfIteratorHelperLoose(token.tokens.cells), _step3; !(_step3 = _iterator3()).done;) {
                var row = _step3.value;

                for (var _iterator4 = _createForOfIteratorHelperLoose(row), _step4; !(_step4 = _iterator4()).done;) {
                  var _cell = _step4.value;
                  marked.walkTokens(_cell, callback);
                }
              }

              break;
            }

          case 'list':
            {
              marked.walkTokens(token.items, callback);
              break;
            }

          default:
            {
              if (token.tokens) {
                marked.walkTokens(token.tokens, callback);
              }
            }
        }
      }
    };
    /**
     * Parse Inline
     */


    marked.parseInline = function (src, opt) {
      // throw error in case of non string input
      if (typeof src === 'undefined' || src === null) {
        throw new Error('marked.parseInline(): input parameter is undefined or null');
      }

      if (typeof src !== 'string') {
        throw new Error('marked.parseInline(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
      }

      opt = merge$2({}, marked.defaults, opt || {});
      checkSanitizeDeprecation$1(opt);

      try {
        var tokens = Lexer_1.lexInline(src, opt);

        if (opt.walkTokens) {
          marked.walkTokens(tokens, opt.walkTokens);
        }

        return Parser_1.parseInline(tokens, opt);
      } catch (e) {
        e.message += '\nPlease report this to https://github.com/markedjs/marked.';

        if (opt.silent) {
          return '<p>An error occurred:</p><pre>' + escape$2(e.message + '', true) + '</pre>';
        }

        throw e;
      }
    };
    /**
     * Expose
     */


    marked.Parser = Parser_1;
    marked.parser = Parser_1.parse;
    marked.Renderer = Renderer_1;
    marked.TextRenderer = TextRenderer_1;
    marked.Lexer = Lexer_1;
    marked.lexer = Lexer_1.lex;
    marked.Tokenizer = Tokenizer_1;
    marked.Slugger = Slugger_1;
    marked.parse = marked;
    var marked_1 = marked;

    return marked_1;

  })));
  });

  /* src/components/Legend.svelte generated by Svelte v3.29.7 */
  var file = "src/components/Legend.svelte";

  function get_each_context(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[3] = list[i];
    child_ctx[5] = i;
    return child_ctx;
  } // (66:8) {#if i > 0}


  function create_if_block(ctx) {
    var span;
    var t_value =
    /*stop*/
    ctx[3][0] + "";
    var t;
    var block = {
      c: function create() {
        span = element("span");
        t = text(t_value);
        this.h();
      },
      l: function claim(nodes) {
        span = claim_element(nodes, "SPAN", {
          class: true
        });
        var span_nodes = children(span);
        t = claim_text(span_nodes, t_value);
        span_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(span, "class", "legend__list-item__label svelte-pn4zpk");
        add_location(span, file, 65, 19, 1292);
      },
      m: function mount(target, anchor) {
        insert_dev(target, span, anchor);
        append_dev(span, t);
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*stops*/
        1 && t_value !== (t_value =
        /*stop*/
        ctx[3][0] + "")) set_data_dev(t, t_value);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(span);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block.name,
      type: "if",
      source: "(66:8) {#if i > 0}",
      ctx
    });
    return block;
  } // (64:4) {#each stops as stop, i}


  function create_each_block(ctx) {
    var li;
    var t0;
    var span;
    var t1;
    var if_block =
    /*i*/
    ctx[5] > 0 && create_if_block(ctx);
    var block = {
      c: function create() {
        li = element("li");
        if (if_block) if_block.c();
        t0 = space();
        span = element("span");
        t1 = space();
        this.h();
      },
      l: function claim(nodes) {
        li = claim_element(nodes, "LI", {
          class: true
        });
        var li_nodes = children(li);
        if (if_block) if_block.l(li_nodes);
        t0 = claim_space(li_nodes);
        span = claim_element(li_nodes, "SPAN", {
          style: true,
          class: true
        });
        children(span).forEach(detach_dev);
        t1 = claim_space(li_nodes);
        li_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        set_style(span, "background",
        /*mapFill*/
        ctx[1]);
        set_style(span, "opacity",
        /*stop*/
        ctx[3][1]);
        attr_dev(span, "class", "legend__list-item__box svelte-pn4zpk");
        add_location(span, file, 66, 8, 1361);
        attr_dev(li, "class", "legend__list-item svelte-pn4zpk");
        add_location(li, file, 64, 6, 1242);
      },
      m: function mount(target, anchor) {
        insert_dev(target, li, anchor);
        if (if_block) if_block.m(li, null);
        append_dev(li, t0);
        append_dev(li, span);
        append_dev(li, t1);
      },
      p: function update(ctx, dirty) {
        if (
        /*i*/
        ctx[5] > 0) if_block.p(ctx, dirty);

        if (dirty &
        /*mapFill*/
        2) {
          set_style(span, "background",
          /*mapFill*/
          ctx[1]);
        }

        if (dirty &
        /*stops*/
        1) {
          set_style(span, "opacity",
          /*stop*/
          ctx[3][1]);
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(li);
        if (if_block) if_block.d();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block.name,
      type: "each",
      source: "(64:4) {#each stops as stop, i}",
      ctx
    });
    return block;
  }

  function create_fragment(ctx) {
    var div;
    var span;
    var t0;
    var t1;
    var ol;
    var each_value =
    /*stops*/
    ctx[0];
    validate_each_argument(each_value);
    var each_blocks = [];

    for (var i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }

    var block = {
      c: function create() {
        div = element("div");
        span = element("span");
        t0 = text(
        /*label*/
        ctx[2]);
        t1 = space();
        ol = element("ol");

        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }

        this.h();
      },
      l: function claim(nodes) {
        div = claim_element(nodes, "DIV", {
          class: true
        });
        var div_nodes = children(div);
        span = claim_element(div_nodes, "SPAN", {
          class: true
        });
        var span_nodes = children(span);
        t0 = claim_text(span_nodes,
        /*label*/
        ctx[2]);
        span_nodes.forEach(detach_dev);
        t1 = claim_space(div_nodes);
        ol = claim_element(div_nodes, "OL", {
          class: true
        });
        var ol_nodes = children(ol);

        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          each_blocks[_i2].l(ol_nodes);
        }

        ol_nodes.forEach(detach_dev);
        div_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(span, "class", "label");
        add_location(span, file, 61, 2, 1144);
        attr_dev(ol, "class", "legend__list svelte-pn4zpk");
        add_location(ol, file, 62, 2, 1181);
        attr_dev(div, "class", "legend svelte-pn4zpk");
        add_location(div, file, 60, 0, 1121);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, span);
        append_dev(span, t0);
        append_dev(div, t1);
        append_dev(div, ol);

        for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
          each_blocks[_i3].m(ol, null);
        }
      },
      p: function update(ctx, _ref) {
        var [dirty] = _ref;
        if (dirty &
        /*label*/
        4) set_data_dev(t0,
        /*label*/
        ctx[2]);

        if (dirty &
        /*mapFill, stops*/
        3) {
          each_value =
          /*stops*/
          ctx[0];
          validate_each_argument(each_value);

          var _i4;

          for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
            var child_ctx = get_each_context(ctx, each_value, _i4);

            if (each_blocks[_i4]) {
              each_blocks[_i4].p(child_ctx, dirty);
            } else {
              each_blocks[_i4] = create_each_block(child_ctx);

              each_blocks[_i4].c();

              each_blocks[_i4].m(ol, null);
            }
          }

          for (; _i4 < each_blocks.length; _i4 += 1) {
            each_blocks[_i4].d(1);
          }

          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        destroy_each(each_blocks, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    var {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots("Legend", slots, []);
    var {
      stops
    } = $$props;
    var {
      mapFill
    } = $$props;
    var {
      label
    } = $$props;
    var writable_props = ["stops", "mapFill", "label"];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Legend> was created with unknown prop '".concat(key, "'"));
    });

    $$self.$$set = $$props => {
      if ("stops" in $$props) $$invalidate(0, stops = $$props.stops);
      if ("mapFill" in $$props) $$invalidate(1, mapFill = $$props.mapFill);
      if ("label" in $$props) $$invalidate(2, label = $$props.label);
    };

    $$self.$capture_state = () => ({
      stops,
      mapFill,
      label
    });

    $$self.$inject_state = $$props => {
      if ("stops" in $$props) $$invalidate(0, stops = $$props.stops);
      if ("mapFill" in $$props) $$invalidate(1, mapFill = $$props.mapFill);
      if ("label" in $$props) $$invalidate(2, label = $$props.label);
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [stops, mapFill, label];
  }

  class Legend extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {
        stops: 0,
        mapFill: 1,
        label: 2
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Legend",
        options,
        id: create_fragment.name
      });
      var {
        ctx
      } = this.$$;
      var props = options.props || {};

      if (
      /*stops*/
      ctx[0] === undefined && !("stops" in props)) {
        console.warn("<Legend> was created without expected prop 'stops'");
      }

      if (
      /*mapFill*/
      ctx[1] === undefined && !("mapFill" in props)) {
        console.warn("<Legend> was created without expected prop 'mapFill'");
      }

      if (
      /*label*/
      ctx[2] === undefined && !("label" in props)) {
        console.warn("<Legend> was created without expected prop 'label'");
      }
    }

    get stops() {
      throw new Error("<Legend>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set stops(value) {
      throw new Error("<Legend>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get mapFill() {
      throw new Error("<Legend>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set mapFill(value) {
      throw new Error("<Legend>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get label() {
      throw new Error("<Legend>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set label(value) {
      throw new Error("<Legend>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

  }

  var mapboxGl = createCommonjsModule(function (module, exports) {
  /* Mapbox GL JS is licensed under the 3-Clause BSD License. Full text of license: https://github.com/mapbox/mapbox-gl-js/blob/v1.12.0/LICENSE.txt */
  (function (global, factory) {
   module.exports = factory() ;
  }(commonjsGlobal, (function () {
  /* eslint-disable */

  var shared, worker, mapboxgl;
  // define gets called three times: one for each chunk. we rely on the order
  // they're imported to know which is which
  function define(_, chunk) {
  if (!shared) {
      shared = chunk;
  } else if (!worker) {
      worker = chunk;
  } else {
      var workerBundleString = 'var sharedChunk = {}; (' + shared + ')(sharedChunk); (' + worker + ')(sharedChunk);';

      var sharedChunk = {};
      shared(sharedChunk);
      mapboxgl = chunk(sharedChunk);
      if (typeof window !== 'undefined') {
          mapboxgl.workerUrl = window.URL.createObjectURL(new Blob([workerBundleString], { type: 'text/javascript' }));
      }
  }
  }


  define(["exports"],(function(t){function e(t,e){return t(e={exports:{}},e.exports),e.exports}var r=n;function n(t,e,r,n){this.cx=3*t,this.bx=3*(r-t)-this.cx,this.ax=1-this.cx-this.bx,this.cy=3*e,this.by=3*(n-e)-this.cy,this.ay=1-this.cy-this.by,this.p1x=t,this.p1y=n,this.p2x=r,this.p2y=n;}n.prototype.sampleCurveX=function(t){return ((this.ax*t+this.bx)*t+this.cx)*t},n.prototype.sampleCurveY=function(t){return ((this.ay*t+this.by)*t+this.cy)*t},n.prototype.sampleCurveDerivativeX=function(t){return (3*this.ax*t+2*this.bx)*t+this.cx},n.prototype.solveCurveX=function(t,e){var r,n,i,a,o;for(void 0===e&&(e=1e-6),i=t,o=0;o<8;o++){if(a=this.sampleCurveX(i)-t,Math.abs(a)<e)return i;var s=this.sampleCurveDerivativeX(i);if(Math.abs(s)<1e-6)break;i-=a/s;}if((i=t)<(r=0))return r;if(i>(n=1))return n;for(;r<n;){if(a=this.sampleCurveX(i),Math.abs(a-t)<e)return i;t>a?r=i:n=i,i=.5*(n-r)+r;}return i},n.prototype.solve=function(t,e){return this.sampleCurveY(this.solveCurveX(t,e))};var i=a;function a(t,e){this.x=t,this.y=e;}a.prototype={clone:function(){return new a(this.x,this.y)},add:function(t){return this.clone()._add(t)},sub:function(t){return this.clone()._sub(t)},multByPoint:function(t){return this.clone()._multByPoint(t)},divByPoint:function(t){return this.clone()._divByPoint(t)},mult:function(t){return this.clone()._mult(t)},div:function(t){return this.clone()._div(t)},rotate:function(t){return this.clone()._rotate(t)},rotateAround:function(t,e){return this.clone()._rotateAround(t,e)},matMult:function(t){return this.clone()._matMult(t)},unit:function(){return this.clone()._unit()},perp:function(){return this.clone()._perp()},round:function(){return this.clone()._round()},mag:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},equals:function(t){return this.x===t.x&&this.y===t.y},dist:function(t){return Math.sqrt(this.distSqr(t))},distSqr:function(t){var e=t.x-this.x,r=t.y-this.y;return e*e+r*r},angle:function(){return Math.atan2(this.y,this.x)},angleTo:function(t){return Math.atan2(this.y-t.y,this.x-t.x)},angleWith:function(t){return this.angleWithSep(t.x,t.y)},angleWithSep:function(t,e){return Math.atan2(this.x*e-this.y*t,this.x*t+this.y*e)},_matMult:function(t){var e=t[2]*this.x+t[3]*this.y;return this.x=t[0]*this.x+t[1]*this.y,this.y=e,this},_add:function(t){return this.x+=t.x,this.y+=t.y,this},_sub:function(t){return this.x-=t.x,this.y-=t.y,this},_mult:function(t){return this.x*=t,this.y*=t,this},_div:function(t){return this.x/=t,this.y/=t,this},_multByPoint:function(t){return this.x*=t.x,this.y*=t.y,this},_divByPoint:function(t){return this.x/=t.x,this.y/=t.y,this},_unit:function(){return this._div(this.mag()),this},_perp:function(){var t=this.y;return this.y=this.x,this.x=-t,this},_rotate:function(t){var e=Math.cos(t),r=Math.sin(t),n=r*this.x+e*this.y;return this.x=e*this.x-r*this.y,this.y=n,this},_rotateAround:function(t,e){var r=Math.cos(t),n=Math.sin(t),i=e.y+n*(this.x-e.x)+r*(this.y-e.y);return this.x=e.x+r*(this.x-e.x)-n*(this.y-e.y),this.y=i,this},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}},a.convert=function(t){return t instanceof a?t:Array.isArray(t)?new a(t[0],t[1]):t};var o="undefined"!=typeof self?self:{},s=Math.pow(2,53)-1;function u(t,e,n,i){var a=new r(t,e,n,i);return function(t){return a.solve(t)}}var l=u(.25,.1,.25,1);function p(t,e,r){return Math.min(r,Math.max(e,t))}function c(t,e,r){var n=r-e,i=((t-e)%n+n)%n+e;return i===e?r:i}function h(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];for(var n=0,i=e;n<i.length;n+=1){var a=i[n];for(var o in a)t[o]=a[o];}return t}var f=1;function y(){return f++}function d(){return function t(e){return e?(e^16*Math.random()>>e/4).toString(16):([1e7]+-[1e3]+-4e3+-8e3+-1e11).replace(/[018]/g,t)}()}function m(t){return !!t&&/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t)}function v(t,e){t.forEach((function(t){e[t]&&(e[t]=e[t].bind(e));}));}function g(t,e){return -1!==t.indexOf(e,t.length-e.length)}function x(t,e,r){var n={};for(var i in t)n[i]=e.call(r||this,t[i],i,t);return n}function b(t,e,r){var n={};for(var i in t)e.call(r||this,t[i],i,t)&&(n[i]=t[i]);return n}function w(t){return Array.isArray(t)?t.map(w):"object"==typeof t&&t?x(t,w):t}var _={};function A(t){_[t]||("undefined"!=typeof console&&console.warn(t),_[t]=!0);}function S(t,e,r){return (r.y-t.y)*(e.x-t.x)>(e.y-t.y)*(r.x-t.x)}function k(t){for(var e=0,r=0,n=t.length,i=n-1,a=void 0,o=void 0;r<n;i=r++)e+=((o=t[i]).x-(a=t[r]).x)*(a.y+o.y);return e}function I(){return "undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope}function z(t){var e={};if(t.replace(/(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g,(function(t,r,n,i){var a=n||i;return e[r]=!a||a.toLowerCase(),""})),e["max-age"]){var r=parseInt(e["max-age"],10);isNaN(r)?delete e["max-age"]:e["max-age"]=r;}return e}var C=null;function E(t){if(null==C){var e=t.navigator?t.navigator.userAgent:null;C=!!t.safari||!(!e||!(/\b(iPad|iPhone|iPod)\b/.test(e)||e.match("Safari")&&!e.match("Chrome")));}return C}function P(t){try{var e=o[t];return e.setItem("_mapbox_test_",1),e.removeItem("_mapbox_test_"),!0}catch(t){return !1}}var M,B,T,V,F=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now.bind(Date),D=o.requestAnimationFrame||o.mozRequestAnimationFrame||o.webkitRequestAnimationFrame||o.msRequestAnimationFrame,L=o.cancelAnimationFrame||o.mozCancelAnimationFrame||o.webkitCancelAnimationFrame||o.msCancelAnimationFrame,R={now:F,frame:function(t){var e=D(t);return {cancel:function(){return L(e)}}},getImageData:function(t,e){void 0===e&&(e=0);var r=o.document.createElement("canvas"),n=r.getContext("2d");if(!n)throw new Error("failed to create canvas 2d context");return r.width=t.width,r.height=t.height,n.drawImage(t,0,0,t.width,t.height),n.getImageData(-e,-e,t.width+2*e,t.height+2*e)},resolveURL:function(t){return M||(M=o.document.createElement("a")),M.href=t,M.href},hardwareConcurrency:o.navigator&&o.navigator.hardwareConcurrency||4,get devicePixelRatio(){return o.devicePixelRatio},get prefersReducedMotion(){return !!o.matchMedia&&(null==B&&(B=o.matchMedia("(prefers-reduced-motion: reduce)")),B.matches)}},O={API_URL:"https://api.mapbox.com",get EVENTS_URL(){return this.API_URL?0===this.API_URL.indexOf("https://api.mapbox.cn")?"https://events.mapbox.cn/events/v2":0===this.API_URL.indexOf("https://api.mapbox.com")?"https://events.mapbox.com/events/v2":null:null},FEEDBACK_URL:"https://apps.mapbox.com/feedback",REQUIRE_ACCESS_TOKEN:!0,ACCESS_TOKEN:null,MAX_PARALLEL_IMAGE_REQUESTS:16},U={supported:!1,testSupport:function(t){!j&&V&&(q?N(t):T=t);}},j=!1,q=!1;function N(t){var e=t.createTexture();t.bindTexture(t.TEXTURE_2D,e);try{if(t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,V),t.isContextLost())return;U.supported=!0;}catch(t){}t.deleteTexture(e),j=!0;}o.document&&((V=o.document.createElement("img")).onload=function(){T&&N(T),T=null,q=!0;},V.onerror=function(){j=!0,T=null;},V.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=");var K="01",G=function(t,e){this._transformRequestFn=t,this._customAccessToken=e,this._createSkuToken();};function Z(t){return 0===t.indexOf("mapbox:")}G.prototype._createSkuToken=function(){var t=function(){for(var t="",e=0;e<10;e++)t+="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(62*Math.random())];return {token:["1",K,t].join(""),tokenExpiresAt:Date.now()+432e5}}();this._skuToken=t.token,this._skuTokenExpiresAt=t.tokenExpiresAt;},G.prototype._isSkuTokenExpired=function(){return Date.now()>this._skuTokenExpiresAt},G.prototype.transformRequest=function(t,e){return this._transformRequestFn&&this._transformRequestFn(t,e)||{url:t}},G.prototype.normalizeStyleURL=function(t,e){if(!Z(t))return t;var r=Y(t);return r.path="/styles/v1"+r.path,this._makeAPIURL(r,this._customAccessToken||e)},G.prototype.normalizeGlyphsURL=function(t,e){if(!Z(t))return t;var r=Y(t);return r.path="/fonts/v1"+r.path,this._makeAPIURL(r,this._customAccessToken||e)},G.prototype.normalizeSourceURL=function(t,e){if(!Z(t))return t;var r=Y(t);return r.path="/v4/"+r.authority+".json",r.params.push("secure"),this._makeAPIURL(r,this._customAccessToken||e)},G.prototype.normalizeSpriteURL=function(t,e,r,n){var i=Y(t);return Z(t)?(i.path="/styles/v1"+i.path+"/sprite"+e+r,this._makeAPIURL(i,this._customAccessToken||n)):(i.path+=""+e+r,$(i))},G.prototype.normalizeTileURL=function(t,e){if(this._isSkuTokenExpired()&&this._createSkuToken(),t&&!Z(t))return t;var r=Y(t);r.path=r.path.replace(/(\.(png|jpg)\d*)(?=$)/,(R.devicePixelRatio>=2||512===e?"@2x":"")+(U.supported?".webp":"$1")),r.path=r.path.replace(/^.+\/v4\//,"/"),r.path="/v4"+r.path;var n=this._customAccessToken||function(t){for(var e=0,r=t;e<r.length;e+=1){var n=r[e].match(/^access_token=(.*)$/);if(n)return n[1]}return null}(r.params)||O.ACCESS_TOKEN;return O.REQUIRE_ACCESS_TOKEN&&n&&this._skuToken&&r.params.push("sku="+this._skuToken),this._makeAPIURL(r,n)},G.prototype.canonicalizeTileURL=function(t,e){var r=Y(t);if(!r.path.match(/(^\/v4\/)/)||!r.path.match(/\.[\w]+$/))return t;var n="mapbox://tiles/";n+=r.path.replace("/v4/","");var i=r.params;return e&&(i=i.filter((function(t){return !t.match(/^access_token=/)}))),i.length&&(n+="?"+i.join("&")),n},G.prototype.canonicalizeTileset=function(t,e){for(var r=!!e&&Z(e),n=[],i=0,a=t.tiles||[];i<a.length;i+=1){var o=a[i];J(o)?n.push(this.canonicalizeTileURL(o,r)):n.push(o);}return n},G.prototype._makeAPIURL=function(t,e){var r="See https://www.mapbox.com/api-documentation/#access-tokens-and-token-scopes",n=Y(O.API_URL);if(t.protocol=n.protocol,t.authority=n.authority,"/"!==n.path&&(t.path=""+n.path+t.path),!O.REQUIRE_ACCESS_TOKEN)return $(t);if(!(e=e||O.ACCESS_TOKEN))throw new Error("An API access token is required to use Mapbox GL. "+r);if("s"===e[0])throw new Error("Use a public access token (pk.*) with Mapbox GL, not a secret access token (sk.*). "+r);return t.params=t.params.filter((function(t){return -1===t.indexOf("access_token")})),t.params.push("access_token="+e),$(t)};var X=/^((https?:)?\/\/)?([^\/]+\.)?mapbox\.c(n|om)(\/|\?|$)/i;function J(t){return X.test(t)}var H=/^(\w+):\/\/([^/?]*)(\/[^?]+)?\??(.+)?/;function Y(t){var e=t.match(H);if(!e)throw new Error("Unable to parse URL object");return {protocol:e[1],authority:e[2],path:e[3]||"/",params:e[4]?e[4].split("&"):[]}}function $(t){var e=t.params.length?"?"+t.params.join("&"):"";return t.protocol+"://"+t.authority+t.path+e}function W(t){if(!t)return null;var e=t.split(".");if(!e||3!==e.length)return null;try{return JSON.parse(decodeURIComponent(o.atob(e[1]).split("").map((function(t){return "%"+("00"+t.charCodeAt(0).toString(16)).slice(-2)})).join("")))}catch(t){return null}}var Q=function(t){this.type=t,this.anonId=null,this.eventData={},this.queue=[],this.pendingRequest=null;};Q.prototype.getStorageKey=function(t){var e,r=W(O.ACCESS_TOKEN);return e=r&&r.u?o.btoa(encodeURIComponent(r.u).replace(/%([0-9A-F]{2})/g,(function(t,e){return String.fromCharCode(Number("0x"+e))}))):O.ACCESS_TOKEN||"",t?"mapbox.eventData."+t+":"+e:"mapbox.eventData:"+e},Q.prototype.fetchEventData=function(){var t=P("localStorage"),e=this.getStorageKey(),r=this.getStorageKey("uuid");if(t)try{var n=o.localStorage.getItem(e);n&&(this.eventData=JSON.parse(n));var i=o.localStorage.getItem(r);i&&(this.anonId=i);}catch(t){A("Unable to read from LocalStorage");}},Q.prototype.saveEventData=function(){var t=P("localStorage"),e=this.getStorageKey(),r=this.getStorageKey("uuid");if(t)try{o.localStorage.setItem(r,this.anonId),Object.keys(this.eventData).length>=1&&o.localStorage.setItem(e,JSON.stringify(this.eventData));}catch(t){A("Unable to write to LocalStorage");}},Q.prototype.processRequests=function(t){},Q.prototype.postEvent=function(t,e,r,n){var i=this;if(O.EVENTS_URL){var a=Y(O.EVENTS_URL);a.params.push("access_token="+(n||O.ACCESS_TOKEN||""));var o={event:this.type,created:new Date(t).toISOString(),sdkIdentifier:"mapbox-gl-js",sdkVersion:"1.12.0",skuId:K,userId:this.anonId},s=e?h(o,e):o,u={url:$(a),headers:{"Content-Type":"text/plain"},body:JSON.stringify([s])};this.pendingRequest=wt(u,(function(t){i.pendingRequest=null,r(t),i.saveEventData(),i.processRequests(n);}));}},Q.prototype.queueRequest=function(t,e){this.queue.push(t),this.processRequests(e);};var tt,et,rt=function(t){function e(){t.call(this,"map.load"),this.success={},this.skuToken="";}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.postMapLoadEvent=function(t,e,r,n){this.skuToken=r,(O.EVENTS_URL&&n||O.ACCESS_TOKEN&&Array.isArray(t)&&t.some((function(t){return Z(t)||J(t)})))&&this.queueRequest({id:e,timestamp:Date.now()},n);},e.prototype.processRequests=function(t){var e=this;if(!this.pendingRequest&&0!==this.queue.length){var r=this.queue.shift(),n=r.id,i=r.timestamp;n&&this.success[n]||(this.anonId||this.fetchEventData(),m(this.anonId)||(this.anonId=d()),this.postEvent(i,{skuToken:this.skuToken},(function(t){t||n&&(e.success[n]=!0);}),t));}},e}(Q),nt=new(function(t){function e(e){t.call(this,"appUserTurnstile"),this._customAccessToken=e;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.postTurnstileEvent=function(t,e){O.EVENTS_URL&&O.ACCESS_TOKEN&&Array.isArray(t)&&t.some((function(t){return Z(t)||J(t)}))&&this.queueRequest(Date.now(),e);},e.prototype.processRequests=function(t){var e=this;if(!this.pendingRequest&&0!==this.queue.length){this.anonId&&this.eventData.lastSuccess&&this.eventData.tokenU||this.fetchEventData();var r=W(O.ACCESS_TOKEN),n=r?r.u:O.ACCESS_TOKEN,i=n!==this.eventData.tokenU;m(this.anonId)||(this.anonId=d(),i=!0);var a=this.queue.shift();if(this.eventData.lastSuccess){var o=new Date(this.eventData.lastSuccess),s=new Date(a),u=(a-this.eventData.lastSuccess)/864e5;i=i||u>=1||u<-1||o.getDate()!==s.getDate();}else i=!0;if(!i)return this.processRequests();this.postEvent(a,{"enabled.telemetry":!1},(function(t){t||(e.eventData.lastSuccess=a,e.eventData.tokenU=n);}),t);}},e}(Q)),it=nt.postTurnstileEvent.bind(nt),at=new rt,ot=at.postMapLoadEvent.bind(at),st=500,ut=50;function lt(){o.caches&&!tt&&(tt=o.caches.open("mapbox-tiles"));}function pt(t){var e=t.indexOf("?");return e<0?t:t.slice(0,e)}var ct,ht=1/0;function ft(){return null==ct&&(ct=o.OffscreenCanvas&&new o.OffscreenCanvas(1,1).getContext("2d")&&"function"==typeof o.createImageBitmap),ct}var yt={Unknown:"Unknown",Style:"Style",Source:"Source",Tile:"Tile",Glyphs:"Glyphs",SpriteImage:"SpriteImage",SpriteJSON:"SpriteJSON",Image:"Image"};"function"==typeof Object.freeze&&Object.freeze(yt);var dt=function(t){function e(e,r,n){401===r&&J(n)&&(e+=": you may have provided an invalid Mapbox access token. See https://www.mapbox.com/api-documentation/#access-tokens-and-token-scopes"),t.call(this,e),this.status=r,this.url=n,this.name=this.constructor.name,this.message=e;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.toString=function(){return this.name+": "+this.message+" ("+this.status+"): "+this.url},e}(Error),mt=I()?function(){return self.worker&&self.worker.referrer}:function(){return ("blob:"===o.location.protocol?o.parent:o).location.href};var vt,gt,xt=function(t,e){if(!(/^file:/.test(r=t.url)||/^file:/.test(mt())&&!/^\w+:/.test(r))){if(o.fetch&&o.Request&&o.AbortController&&o.Request.prototype.hasOwnProperty("signal"))return function(t,e){var r,n=new o.AbortController,i=new o.Request(t.url,{method:t.method||"GET",body:t.body,credentials:t.credentials,headers:t.headers,referrer:mt(),signal:n.signal}),a=!1,s=!1,u=(r=i.url).indexOf("sku=")>0&&J(r);"json"===t.type&&i.headers.set("Accept","application/json");var l=function(r,n,a){if(!s){if(r&&"SecurityError"!==r.message&&A(r),n&&a)return p(n);var l=Date.now();o.fetch(i).then((function(r){if(r.ok){var n=u?r.clone():null;return p(r,n,l)}return e(new dt(r.statusText,r.status,t.url))})).catch((function(t){20!==t.code&&e(new Error(t.message));}));}},p=function(r,n,u){("arrayBuffer"===t.type?r.arrayBuffer():"json"===t.type?r.json():r.text()).then((function(t){s||(n&&u&&function(t,e,r){if(lt(),tt){var n={status:e.status,statusText:e.statusText,headers:new o.Headers};e.headers.forEach((function(t,e){return n.headers.set(e,t)}));var i=z(e.headers.get("Cache-Control")||"");i["no-store"]||(i["max-age"]&&n.headers.set("Expires",new Date(r+1e3*i["max-age"]).toUTCString()),new Date(n.headers.get("Expires")).getTime()-r<42e4||function(t,e){if(void 0===et)try{new Response(new ReadableStream),et=!0;}catch(t){et=!1;}et?e(t.body):t.blob().then(e);}(e,(function(e){var r=new o.Response(e,n);lt(),tt&&tt.then((function(e){return e.put(pt(t.url),r)})).catch((function(t){return A(t.message)}));})));}}(i,n,u),a=!0,e(null,t,r.headers.get("Cache-Control"),r.headers.get("Expires")));})).catch((function(t){s||e(new Error(t.message));}));};return u?function(t,e){if(lt(),!tt)return e(null);var r=pt(t.url);tt.then((function(t){t.match(r).then((function(n){var i=function(t){if(!t)return !1;var e=new Date(t.headers.get("Expires")||0),r=z(t.headers.get("Cache-Control")||"");return e>Date.now()&&!r["no-cache"]}(n);t.delete(r),i&&t.put(r,n.clone()),e(null,n,i);})).catch(e);})).catch(e);}(i,l):l(null,null),{cancel:function(){s=!0,a||n.abort();}}}(t,e);if(I()&&self.worker&&self.worker.actor)return self.worker.actor.send("getResource",t,e,void 0,!0)}var r;return function(t,e){var r=new o.XMLHttpRequest;for(var n in r.open(t.method||"GET",t.url,!0),"arrayBuffer"===t.type&&(r.responseType="arraybuffer"),t.headers)r.setRequestHeader(n,t.headers[n]);return "json"===t.type&&(r.responseType="text",r.setRequestHeader("Accept","application/json")),r.withCredentials="include"===t.credentials,r.onerror=function(){e(new Error(r.statusText));},r.onload=function(){if((r.status>=200&&r.status<300||0===r.status)&&null!==r.response){var n=r.response;if("json"===t.type)try{n=JSON.parse(r.response);}catch(t){return e(t)}e(null,n,r.getResponseHeader("Cache-Control"),r.getResponseHeader("Expires"));}else e(new dt(r.statusText,r.status,t.url));},r.send(t.body),{cancel:function(){return r.abort()}}}(t,e)},bt=function(t,e){return xt(h(t,{type:"arrayBuffer"}),e)},wt=function(t,e){return xt(h(t,{method:"POST"}),e)};vt=[],gt=0;var _t=function(t,e){if(U.supported&&(t.headers||(t.headers={}),t.headers.accept="image/webp,*/*"),gt>=O.MAX_PARALLEL_IMAGE_REQUESTS){var r={requestParameters:t,callback:e,cancelled:!1,cancel:function(){this.cancelled=!0;}};return vt.push(r),r}gt++;var n=!1,i=function(){if(!n)for(n=!0,gt--;vt.length&&gt<O.MAX_PARALLEL_IMAGE_REQUESTS;){var t=vt.shift();t.cancelled||(t.cancel=_t(t.requestParameters,t.callback).cancel);}},a=bt(t,(function(t,r,n,a){i(),t?e(t):r&&(ft()?function(t,e){var r=new o.Blob([new Uint8Array(t)],{type:"image/png"});o.createImageBitmap(r).then((function(t){e(null,t);})).catch((function(t){e(new Error("Could not load image because of "+t.message+". Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported."));}));}(r,e):function(t,e,r,n){var i=new o.Image,a=o.URL;i.onload=function(){e(null,i),a.revokeObjectURL(i.src);},i.onerror=function(){return e(new Error("Could not load image. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported."))};var s=new o.Blob([new Uint8Array(t)],{type:"image/png"});i.cacheControl=r,i.expires=n,i.src=t.byteLength?a.createObjectURL(s):"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";}(r,e,n,a));}));return {cancel:function(){a.cancel(),i();}}};function At(t,e,r){r[t]&&-1!==r[t].indexOf(e)||(r[t]=r[t]||[],r[t].push(e));}function St(t,e,r){if(r&&r[t]){var n=r[t].indexOf(e);-1!==n&&r[t].splice(n,1);}}var kt=function(t,e){void 0===e&&(e={}),h(this,e),this.type=t;},It=function(t){function e(e,r){void 0===r&&(r={}),t.call(this,"error",h({error:e},r));}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(kt),zt=function(){};zt.prototype.on=function(t,e){return this._listeners=this._listeners||{},At(t,e,this._listeners),this},zt.prototype.off=function(t,e){return St(t,e,this._listeners),St(t,e,this._oneTimeListeners),this},zt.prototype.once=function(t,e){return this._oneTimeListeners=this._oneTimeListeners||{},At(t,e,this._oneTimeListeners),this},zt.prototype.fire=function(t,e){"string"==typeof t&&(t=new kt(t,e||{}));var r=t.type;if(this.listens(r)){t.target=this;for(var n=0,i=this._listeners&&this._listeners[r]?this._listeners[r].slice():[];n<i.length;n+=1)i[n].call(this,t);for(var a=0,o=this._oneTimeListeners&&this._oneTimeListeners[r]?this._oneTimeListeners[r].slice():[];a<o.length;a+=1){var s=o[a];St(r,s,this._oneTimeListeners),s.call(this,t);}var u=this._eventedParent;u&&(h(t,"function"==typeof this._eventedParentData?this._eventedParentData():this._eventedParentData),u.fire(t));}else t instanceof It&&console.error(t.error);return this},zt.prototype.listens=function(t){return this._listeners&&this._listeners[t]&&this._listeners[t].length>0||this._oneTimeListeners&&this._oneTimeListeners[t]&&this._oneTimeListeners[t].length>0||this._eventedParent&&this._eventedParent.listens(t)},zt.prototype.setEventedParent=function(t,e){return this._eventedParent=t,this._eventedParentData=e,this};var Ct={$version:8,$root:{version:{required:!0,type:"enum",values:[8]},name:{type:"string"},metadata:{type:"*"},center:{type:"array",value:"number"},zoom:{type:"number"},bearing:{type:"number",default:0,period:360,units:"degrees"},pitch:{type:"number",default:0,units:"degrees"},light:{type:"light"},sources:{required:!0,type:"sources"},sprite:{type:"string"},glyphs:{type:"string"},transition:{type:"transition"},layers:{required:!0,type:"array",value:"layer"}},sources:{"*":{type:"source"}},source:["source_vector","source_raster","source_raster_dem","source_geojson","source_video","source_image"],source_vector:{type:{required:!0,type:"enum",values:{vector:{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},scheme:{type:"enum",values:{xyz:{},tms:{}},default:"xyz"},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},attribution:{type:"string"},promoteId:{type:"promoteId"},volatile:{type:"boolean",default:!1},"*":{type:"*"}},source_raster:{type:{required:!0,type:"enum",values:{raster:{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},tileSize:{type:"number",default:512,units:"pixels"},scheme:{type:"enum",values:{xyz:{},tms:{}},default:"xyz"},attribution:{type:"string"},volatile:{type:"boolean",default:!1},"*":{type:"*"}},source_raster_dem:{type:{required:!0,type:"enum",values:{"raster-dem":{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},tileSize:{type:"number",default:512,units:"pixels"},attribution:{type:"string"},encoding:{type:"enum",values:{terrarium:{},mapbox:{}},default:"mapbox"},volatile:{type:"boolean",default:!1},"*":{type:"*"}},source_geojson:{type:{required:!0,type:"enum",values:{geojson:{}}},data:{type:"*"},maxzoom:{type:"number",default:18},attribution:{type:"string"},buffer:{type:"number",default:128,maximum:512,minimum:0},filter:{type:"*"},tolerance:{type:"number",default:.375},cluster:{type:"boolean",default:!1},clusterRadius:{type:"number",default:50,minimum:0},clusterMaxZoom:{type:"number"},clusterMinPoints:{type:"number"},clusterProperties:{type:"*"},lineMetrics:{type:"boolean",default:!1},generateId:{type:"boolean",default:!1},promoteId:{type:"promoteId"}},source_video:{type:{required:!0,type:"enum",values:{video:{}}},urls:{required:!0,type:"array",value:"string"},coordinates:{required:!0,type:"array",length:4,value:{type:"array",length:2,value:"number"}}},source_image:{type:{required:!0,type:"enum",values:{image:{}}},url:{required:!0,type:"string"},coordinates:{required:!0,type:"array",length:4,value:{type:"array",length:2,value:"number"}}},layer:{id:{type:"string",required:!0},type:{type:"enum",values:{fill:{},line:{},symbol:{},circle:{},heatmap:{},"fill-extrusion":{},raster:{},hillshade:{},background:{}},required:!0},metadata:{type:"*"},source:{type:"string"},"source-layer":{type:"string"},minzoom:{type:"number",minimum:0,maximum:24},maxzoom:{type:"number",minimum:0,maximum:24},filter:{type:"filter"},layout:{type:"layout"},paint:{type:"paint"}},layout:["layout_fill","layout_line","layout_circle","layout_heatmap","layout_fill-extrusion","layout_symbol","layout_raster","layout_hillshade","layout_background"],layout_background:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_fill:{"fill-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_circle:{"circle-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_heatmap:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},"layout_fill-extrusion":{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_line:{"line-cap":{type:"enum",values:{butt:{},round:{},square:{}},default:"butt",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"line-join":{type:"enum",values:{bevel:{},round:{},miter:{}},default:"miter",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"line-miter-limit":{type:"number",default:2,requires:[{"line-join":"miter"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-round-limit":{type:"number",default:1.05,requires:[{"line-join":"round"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_symbol:{"symbol-placement":{type:"enum",values:{point:{},line:{},"line-center":{}},default:"point",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"symbol-spacing":{type:"number",default:250,minimum:1,units:"pixels",requires:[{"symbol-placement":"line"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"symbol-avoid-edges":{type:"boolean",default:!1,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"symbol-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"symbol-z-order":{type:"enum",values:{auto:{},"viewport-y":{},source:{}},default:"auto",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-allow-overlap":{type:"boolean",default:!1,requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-ignore-placement":{type:"boolean",default:!1,requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-optional":{type:"boolean",default:!1,requires:["icon-image","text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-rotation-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-size":{type:"number",default:1,minimum:0,units:"factor of the original icon size",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-text-fit":{type:"enum",values:{none:{},width:{},height:{},both:{}},default:"none",requires:["icon-image","text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-text-fit-padding":{type:"array",value:"number",length:4,default:[0,0,0,0],units:"pixels",requires:["icon-image","text-field",{"icon-text-fit":["both","width","height"]}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-image":{type:"resolvedImage",tokens:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-rotate":{type:"number",default:0,period:360,units:"degrees",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-padding":{type:"number",default:2,minimum:0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-keep-upright":{type:"boolean",default:!1,requires:["icon-image",{"icon-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-offset":{type:"array",value:"number",length:2,default:[0,0],requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-anchor":{type:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},default:"center",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-pitch-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-pitch-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-rotation-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-field":{type:"formatted",default:"",tokens:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-font":{type:"array",value:"string",default:["Open Sans Regular","Arial Unicode MS Regular"],requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-size":{type:"number",default:16,minimum:0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-max-width":{type:"number",default:10,minimum:0,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-line-height":{type:"number",default:1.2,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-letter-spacing":{type:"number",default:0,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-justify":{type:"enum",values:{auto:{},left:{},center:{},right:{}},default:"center",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-radial-offset":{type:"number",units:"ems",default:0,requires:["text-field"],"property-type":"data-driven",expression:{interpolated:!0,parameters:["zoom","feature"]}},"text-variable-anchor":{type:"array",value:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},requires:["text-field",{"symbol-placement":["point"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-anchor":{type:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},default:"center",requires:["text-field",{"!":"text-variable-anchor"}],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-max-angle":{type:"number",default:45,units:"degrees",requires:["text-field",{"symbol-placement":["line","line-center"]}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-writing-mode":{type:"array",value:"enum",values:{horizontal:{},vertical:{}},requires:["text-field",{"symbol-placement":["point"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-rotate":{type:"number",default:0,period:360,units:"degrees",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-padding":{type:"number",default:2,minimum:0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-keep-upright":{type:"boolean",default:!0,requires:["text-field",{"text-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-transform":{type:"enum",values:{none:{},uppercase:{},lowercase:{}},default:"none",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-offset":{type:"array",value:"number",units:"ems",length:2,default:[0,0],requires:["text-field",{"!":"text-radial-offset"}],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-allow-overlap":{type:"boolean",default:!1,requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-ignore-placement":{type:"boolean",default:!1,requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-optional":{type:"boolean",default:!1,requires:["text-field","icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_raster:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_hillshade:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},filter:{type:"array",value:"*"},filter_operator:{type:"enum",values:{"==":{},"!=":{},">":{},">=":{},"<":{},"<=":{},in:{},"!in":{},all:{},any:{},none:{},has:{},"!has":{},within:{}}},geometry_type:{type:"enum",values:{Point:{},LineString:{},Polygon:{}}},function:{expression:{type:"expression"},stops:{type:"array",value:"function_stop"},base:{type:"number",default:1,minimum:0},property:{type:"string",default:"$zoom"},type:{type:"enum",values:{identity:{},exponential:{},interval:{},categorical:{}},default:"exponential"},colorSpace:{type:"enum",values:{rgb:{},lab:{},hcl:{}},default:"rgb"},default:{type:"*",required:!1}},function_stop:{type:"array",minimum:0,maximum:24,value:["number","color"],length:2},expression:{type:"array",value:"*",minimum:1},light:{anchor:{type:"enum",default:"viewport",values:{map:{},viewport:{}},"property-type":"data-constant",transition:!1,expression:{interpolated:!1,parameters:["zoom"]}},position:{type:"array",default:[1.15,210,30],length:3,value:"number","property-type":"data-constant",transition:!0,expression:{interpolated:!0,parameters:["zoom"]}},color:{type:"color","property-type":"data-constant",default:"#ffffff",expression:{interpolated:!0,parameters:["zoom"]},transition:!0},intensity:{type:"number","property-type":"data-constant",default:.5,minimum:0,maximum:1,expression:{interpolated:!0,parameters:["zoom"]},transition:!0}},paint:["paint_fill","paint_line","paint_circle","paint_heatmap","paint_fill-extrusion","paint_symbol","paint_raster","paint_hillshade","paint_background"],paint_fill:{"fill-antialias":{type:"boolean",default:!0,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"fill-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-outline-color":{type:"color",transition:!0,requires:[{"!":"fill-pattern"},{"fill-antialias":!0}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["fill-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"}},"paint_fill-extrusion":{"fill-extrusion-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"fill-extrusion-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["fill-extrusion-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"},"fill-extrusion-height":{type:"number",default:0,minimum:0,units:"meters",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-base":{type:"number",default:0,minimum:0,units:"meters",transition:!0,requires:["fill-extrusion-height"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-vertical-gradient":{type:"boolean",default:!0,transition:!1,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"}},paint_line:{"line-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"line-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["line-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"line-width":{type:"number",default:1,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-gap-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-offset":{type:"number",default:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-dasharray":{type:"array",value:"number",minimum:0,transition:!0,units:"line widths",requires:[{"!":"line-pattern"}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"cross-faded"},"line-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"},"line-gradient":{type:"color",transition:!1,requires:[{"!":"line-dasharray"},{"!":"line-pattern"},{source:"geojson",has:{lineMetrics:!0}}],expression:{interpolated:!0,parameters:["line-progress"]},"property-type":"color-ramp"}},paint_circle:{"circle-radius":{type:"number",default:5,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-blur":{type:"number",default:0,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"circle-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["circle-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-pitch-scale":{type:"enum",values:{map:{},viewport:{}},default:"map",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-pitch-alignment":{type:"enum",values:{map:{},viewport:{}},default:"viewport",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-stroke-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"}},paint_heatmap:{"heatmap-radius":{type:"number",default:30,minimum:1,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-weight":{type:"number",default:1,minimum:0,transition:!1,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-intensity":{type:"number",default:1,minimum:0,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"heatmap-color":{type:"color",default:["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",.1,"royalblue",.3,"cyan",.5,"lime",.7,"yellow",1,"red"],transition:!1,expression:{interpolated:!0,parameters:["heatmap-density"]},"property-type":"color-ramp"},"heatmap-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_symbol:{"icon-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-color":{type:"color",default:"#000000",transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-color":{type:"color",default:"rgba(0, 0, 0, 0)",transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["icon-image","icon-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-color":{type:"color",default:"#000000",transition:!0,overridable:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-color":{type:"color",default:"rgba(0, 0, 0, 0)",transition:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["text-field","text-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"}},paint_raster:{"raster-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-hue-rotate":{type:"number",default:0,period:360,transition:!0,units:"degrees",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-brightness-min":{type:"number",default:0,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-brightness-max":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-saturation":{type:"number",default:0,minimum:-1,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-contrast":{type:"number",default:0,minimum:-1,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-resampling":{type:"enum",values:{linear:{},nearest:{}},default:"linear",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"raster-fade-duration":{type:"number",default:300,minimum:0,transition:!1,units:"milliseconds",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_hillshade:{"hillshade-illumination-direction":{type:"number",default:335,minimum:0,maximum:359,transition:!1,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-illumination-anchor":{type:"enum",values:{map:{},viewport:{}},default:"viewport",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-exaggeration":{type:"number",default:.5,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-shadow-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-highlight-color":{type:"color",default:"#FFFFFF",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-accent-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_background:{"background-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"background-pattern"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"background-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"cross-faded"},"background-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},transition:{duration:{type:"number",default:300,minimum:0,units:"milliseconds"},delay:{type:"number",default:0,minimum:0,units:"milliseconds"}},"property-type":{"data-driven":{type:"property-type"},"cross-faded":{type:"property-type"},"cross-faded-data-driven":{type:"property-type"},"color-ramp":{type:"property-type"},"data-constant":{type:"property-type"},constant:{type:"property-type"}},promoteId:{"*":{type:"string"}}},Et=function(t,e,r,n){this.message=(t?t+": ":"")+r,n&&(this.identifier=n),null!=e&&e.__line__&&(this.line=e.__line__);};function Pt(t){var e=t.value;return e?[new Et(t.key,e,"constants have been deprecated as of v8")]:[]}function Mt(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];for(var n=0,i=e;n<i.length;n+=1){var a=i[n];for(var o in a)t[o]=a[o];}return t}function Bt(t){return t instanceof Number||t instanceof String||t instanceof Boolean?t.valueOf():t}function Tt(t){if(Array.isArray(t))return t.map(Tt);if(t instanceof Object&&!(t instanceof Number||t instanceof String||t instanceof Boolean)){var e={};for(var r in t)e[r]=Tt(t[r]);return e}return Bt(t)}var Vt=function(t){function e(e,r){t.call(this,r),this.message=r,this.key=e;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),Ft=function(t,e){void 0===e&&(e=[]),this.parent=t,this.bindings={};for(var r=0,n=e;r<n.length;r+=1){var i=n[r];this.bindings[i[0]]=i[1];}};Ft.prototype.concat=function(t){return new Ft(this,t)},Ft.prototype.get=function(t){if(this.bindings[t])return this.bindings[t];if(this.parent)return this.parent.get(t);throw new Error(t+" not found in scope.")},Ft.prototype.has=function(t){return !!this.bindings[t]||!!this.parent&&this.parent.has(t)};var Dt={kind:"null"},Lt={kind:"number"},Rt={kind:"string"},Ot={kind:"boolean"},Ut={kind:"color"},jt={kind:"object"},qt={kind:"value"},Nt={kind:"collator"},Kt={kind:"formatted"},Gt={kind:"resolvedImage"};function Zt(t,e){return {kind:"array",itemType:t,N:e}}function Xt(t){if("array"===t.kind){var e=Xt(t.itemType);return "number"==typeof t.N?"array<"+e+", "+t.N+">":"value"===t.itemType.kind?"array":"array<"+e+">"}return t.kind}var Jt=[Dt,Lt,Rt,Ot,Ut,Kt,jt,Zt(qt),Gt];function Ht(t,e){if("error"===e.kind)return null;if("array"===t.kind){if("array"===e.kind&&(0===e.N&&"value"===e.itemType.kind||!Ht(t.itemType,e.itemType))&&("number"!=typeof t.N||t.N===e.N))return null}else {if(t.kind===e.kind)return null;if("value"===t.kind)for(var r=0,n=Jt;r<n.length;r+=1)if(!Ht(n[r],e))return null}return "Expected "+Xt(t)+" but found "+Xt(e)+" instead."}function Yt(t,e){return e.some((function(e){return e.kind===t.kind}))}function $t(t,e){return e.some((function(e){return "null"===e?null===t:"array"===e?Array.isArray(t):"object"===e?t&&!Array.isArray(t)&&"object"==typeof t:e===typeof t}))}var Wt=e((function(t,e){var r={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],rebeccapurple:[102,51,153,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};function n(t){return (t=Math.round(t))<0?0:t>255?255:t}function i(t){return n("%"===t[t.length-1]?parseFloat(t)/100*255:parseInt(t))}function a(t){return (e="%"===t[t.length-1]?parseFloat(t)/100:parseFloat(t))<0?0:e>1?1:e;var e;}function o(t,e,r){return r<0?r+=1:r>1&&(r-=1),6*r<1?t+(e-t)*r*6:2*r<1?e:3*r<2?t+(e-t)*(2/3-r)*6:t}try{e.parseCSSColor=function(t){var e,s=t.replace(/ /g,"").toLowerCase();if(s in r)return r[s].slice();if("#"===s[0])return 4===s.length?(e=parseInt(s.substr(1),16))>=0&&e<=4095?[(3840&e)>>4|(3840&e)>>8,240&e|(240&e)>>4,15&e|(15&e)<<4,1]:null:7===s.length&&(e=parseInt(s.substr(1),16))>=0&&e<=16777215?[(16711680&e)>>16,(65280&e)>>8,255&e,1]:null;var u=s.indexOf("("),l=s.indexOf(")");if(-1!==u&&l+1===s.length){var p=s.substr(0,u),c=s.substr(u+1,l-(u+1)).split(","),h=1;switch(p){case"rgba":if(4!==c.length)return null;h=a(c.pop());case"rgb":return 3!==c.length?null:[i(c[0]),i(c[1]),i(c[2]),h];case"hsla":if(4!==c.length)return null;h=a(c.pop());case"hsl":if(3!==c.length)return null;var f=(parseFloat(c[0])%360+360)%360/360,y=a(c[1]),d=a(c[2]),m=d<=.5?d*(y+1):d+y-d*y,v=2*d-m;return [n(255*o(v,m,f+1/3)),n(255*o(v,m,f)),n(255*o(v,m,f-1/3)),h];default:return null}}return null};}catch(t){}})).parseCSSColor,Qt=function(t,e,r,n){void 0===n&&(n=1),this.r=t,this.g=e,this.b=r,this.a=n;};Qt.parse=function(t){if(t){if(t instanceof Qt)return t;if("string"==typeof t){var e=Wt(t);if(e)return new Qt(e[0]/255*e[3],e[1]/255*e[3],e[2]/255*e[3],e[3])}}},Qt.prototype.toString=function(){var t=this.toArray(),e=t[1],r=t[2],n=t[3];return "rgba("+Math.round(t[0])+","+Math.round(e)+","+Math.round(r)+","+n+")"},Qt.prototype.toArray=function(){var t=this.a;return 0===t?[0,0,0,0]:[255*this.r/t,255*this.g/t,255*this.b/t,t]},Qt.black=new Qt(0,0,0,1),Qt.white=new Qt(1,1,1,1),Qt.transparent=new Qt(0,0,0,0),Qt.red=new Qt(1,0,0,1);var te=function(t,e,r){this.sensitivity=t?e?"variant":"case":e?"accent":"base",this.locale=r,this.collator=new Intl.Collator(this.locale?this.locale:[],{sensitivity:this.sensitivity,usage:"search"});};te.prototype.compare=function(t,e){return this.collator.compare(t,e)},te.prototype.resolvedLocale=function(){return new Intl.Collator(this.locale?this.locale:[]).resolvedOptions().locale};var ee=function(t,e,r,n,i){this.text=t,this.image=e,this.scale=r,this.fontStack=n,this.textColor=i;},re=function(t){this.sections=t;};re.fromString=function(t){return new re([new ee(t,null,null,null,null)])},re.prototype.isEmpty=function(){return 0===this.sections.length||!this.sections.some((function(t){return 0!==t.text.length||t.image&&0!==t.image.name.length}))},re.factory=function(t){return t instanceof re?t:re.fromString(t)},re.prototype.toString=function(){return 0===this.sections.length?"":this.sections.map((function(t){return t.text})).join("")},re.prototype.serialize=function(){for(var t=["format"],e=0,r=this.sections;e<r.length;e+=1){var n=r[e];if(n.image)t.push(["image",n.image.name]);else {t.push(n.text);var i={};n.fontStack&&(i["text-font"]=["literal",n.fontStack.split(",")]),n.scale&&(i["font-scale"]=n.scale),n.textColor&&(i["text-color"]=["rgba"].concat(n.textColor.toArray())),t.push(i);}}return t};var ne=function(t){this.name=t.name,this.available=t.available;};function ie(t,e,r,n){return "number"==typeof t&&t>=0&&t<=255&&"number"==typeof e&&e>=0&&e<=255&&"number"==typeof r&&r>=0&&r<=255?void 0===n||"number"==typeof n&&n>=0&&n<=1?null:"Invalid rgba value ["+[t,e,r,n].join(", ")+"]: 'a' must be between 0 and 1.":"Invalid rgba value ["+("number"==typeof n?[t,e,r,n]:[t,e,r]).join(", ")+"]: 'r', 'g', and 'b' must be between 0 and 255."}function ae(t){if(null===t)return !0;if("string"==typeof t)return !0;if("boolean"==typeof t)return !0;if("number"==typeof t)return !0;if(t instanceof Qt)return !0;if(t instanceof te)return !0;if(t instanceof re)return !0;if(t instanceof ne)return !0;if(Array.isArray(t)){for(var e=0,r=t;e<r.length;e+=1)if(!ae(r[e]))return !1;return !0}if("object"==typeof t){for(var n in t)if(!ae(t[n]))return !1;return !0}return !1}function oe(t){if(null===t)return Dt;if("string"==typeof t)return Rt;if("boolean"==typeof t)return Ot;if("number"==typeof t)return Lt;if(t instanceof Qt)return Ut;if(t instanceof te)return Nt;if(t instanceof re)return Kt;if(t instanceof ne)return Gt;if(Array.isArray(t)){for(var e,r=t.length,n=0,i=t;n<i.length;n+=1){var a=oe(i[n]);if(e){if(e===a)continue;e=qt;break}e=a;}return Zt(e||qt,r)}return jt}function se(t){var e=typeof t;return null===t?"":"string"===e||"number"===e||"boolean"===e?String(t):t instanceof Qt||t instanceof re||t instanceof ne?t.toString():JSON.stringify(t)}ne.prototype.toString=function(){return this.name},ne.fromString=function(t){return t?new ne({name:t,available:!1}):null},ne.prototype.serialize=function(){return ["image",this.name]};var ue=function(t,e){this.type=t,this.value=e;};ue.parse=function(t,e){if(2!==t.length)return e.error("'literal' expression requires exactly one argument, but found "+(t.length-1)+" instead.");if(!ae(t[1]))return e.error("invalid value");var r=t[1],n=oe(r),i=e.expectedType;return "array"!==n.kind||0!==n.N||!i||"array"!==i.kind||"number"==typeof i.N&&0!==i.N||(n=i),new ue(n,r)},ue.prototype.evaluate=function(){return this.value},ue.prototype.eachChild=function(){},ue.prototype.outputDefined=function(){return !0},ue.prototype.serialize=function(){return "array"===this.type.kind||"object"===this.type.kind?["literal",this.value]:this.value instanceof Qt?["rgba"].concat(this.value.toArray()):this.value instanceof re?this.value.serialize():this.value};var le=function(t){this.name="ExpressionEvaluationError",this.message=t;};le.prototype.toJSON=function(){return this.message};var pe={string:Rt,number:Lt,boolean:Ot,object:jt},ce=function(t,e){this.type=t,this.args=e;};ce.parse=function(t,e){if(t.length<2)return e.error("Expected at least one argument.");var r,n=1,i=t[0];if("array"===i){var a,o;if(t.length>2){var s=t[1];if("string"!=typeof s||!(s in pe)||"object"===s)return e.error('The item type argument of "array" must be one of string, number, boolean',1);a=pe[s],n++;}else a=qt;if(t.length>3){if(null!==t[2]&&("number"!=typeof t[2]||t[2]<0||t[2]!==Math.floor(t[2])))return e.error('The length argument to "array" must be a positive integer literal',2);o=t[2],n++;}r=Zt(a,o);}else r=pe[i];for(var u=[];n<t.length;n++){var l=e.parse(t[n],n,qt);if(!l)return null;u.push(l);}return new ce(r,u)},ce.prototype.evaluate=function(t){for(var e=0;e<this.args.length;e++){var r=this.args[e].evaluate(t);if(!Ht(this.type,oe(r)))return r;if(e===this.args.length-1)throw new le("Expected value to be of type "+Xt(this.type)+", but found "+Xt(oe(r))+" instead.")}return null},ce.prototype.eachChild=function(t){this.args.forEach(t);},ce.prototype.outputDefined=function(){return this.args.every((function(t){return t.outputDefined()}))},ce.prototype.serialize=function(){var t=this.type,e=[t.kind];if("array"===t.kind){var r=t.itemType;if("string"===r.kind||"number"===r.kind||"boolean"===r.kind){e.push(r.kind);var n=t.N;("number"==typeof n||this.args.length>1)&&e.push(n);}}return e.concat(this.args.map((function(t){return t.serialize()})))};var he=function(t){this.type=Kt,this.sections=t;};he.parse=function(t,e){if(t.length<2)return e.error("Expected at least one argument.");var r=t[1];if(!Array.isArray(r)&&"object"==typeof r)return e.error("First argument must be an image or text section.");for(var n=[],i=!1,a=1;a<=t.length-1;++a){var o=t[a];if(i&&"object"==typeof o&&!Array.isArray(o)){i=!1;var s=null;if(o["font-scale"]&&!(s=e.parse(o["font-scale"],1,Lt)))return null;var u=null;if(o["text-font"]&&!(u=e.parse(o["text-font"],1,Zt(Rt))))return null;var l=null;if(o["text-color"]&&!(l=e.parse(o["text-color"],1,Ut)))return null;var p=n[n.length-1];p.scale=s,p.font=u,p.textColor=l;}else {var c=e.parse(t[a],1,qt);if(!c)return null;var h=c.type.kind;if("string"!==h&&"value"!==h&&"null"!==h&&"resolvedImage"!==h)return e.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");i=!0,n.push({content:c,scale:null,font:null,textColor:null});}}return new he(n)},he.prototype.evaluate=function(t){return new re(this.sections.map((function(e){var r=e.content.evaluate(t);return oe(r)===Gt?new ee("",r,null,null,null):new ee(se(r),null,e.scale?e.scale.evaluate(t):null,e.font?e.font.evaluate(t).join(","):null,e.textColor?e.textColor.evaluate(t):null)})))},he.prototype.eachChild=function(t){for(var e=0,r=this.sections;e<r.length;e+=1){var n=r[e];t(n.content),n.scale&&t(n.scale),n.font&&t(n.font),n.textColor&&t(n.textColor);}},he.prototype.outputDefined=function(){return !1},he.prototype.serialize=function(){for(var t=["format"],e=0,r=this.sections;e<r.length;e+=1){var n=r[e];t.push(n.content.serialize());var i={};n.scale&&(i["font-scale"]=n.scale.serialize()),n.font&&(i["text-font"]=n.font.serialize()),n.textColor&&(i["text-color"]=n.textColor.serialize()),t.push(i);}return t};var fe=function(t){this.type=Gt,this.input=t;};fe.parse=function(t,e){if(2!==t.length)return e.error("Expected two arguments.");var r=e.parse(t[1],1,Rt);return r?new fe(r):e.error("No image name provided.")},fe.prototype.evaluate=function(t){var e=this.input.evaluate(t),r=ne.fromString(e);return r&&t.availableImages&&(r.available=t.availableImages.indexOf(e)>-1),r},fe.prototype.eachChild=function(t){t(this.input);},fe.prototype.outputDefined=function(){return !1},fe.prototype.serialize=function(){return ["image",this.input.serialize()]};var ye={"to-boolean":Ot,"to-color":Ut,"to-number":Lt,"to-string":Rt},de=function(t,e){this.type=t,this.args=e;};de.parse=function(t,e){if(t.length<2)return e.error("Expected at least one argument.");var r=t[0];if(("to-boolean"===r||"to-string"===r)&&2!==t.length)return e.error("Expected one argument.");for(var n=ye[r],i=[],a=1;a<t.length;a++){var o=e.parse(t[a],a,qt);if(!o)return null;i.push(o);}return new de(n,i)},de.prototype.evaluate=function(t){if("boolean"===this.type.kind)return Boolean(this.args[0].evaluate(t));if("color"===this.type.kind){for(var e,r,n=0,i=this.args;n<i.length;n+=1){if(r=null,(e=i[n].evaluate(t))instanceof Qt)return e;if("string"==typeof e){var a=t.parseColor(e);if(a)return a}else if(Array.isArray(e)&&!(r=e.length<3||e.length>4?"Invalid rbga value "+JSON.stringify(e)+": expected an array containing either three or four numeric values.":ie(e[0],e[1],e[2],e[3])))return new Qt(e[0]/255,e[1]/255,e[2]/255,e[3])}throw new le(r||"Could not parse color from value '"+("string"==typeof e?e:String(JSON.stringify(e)))+"'")}if("number"===this.type.kind){for(var o=null,s=0,u=this.args;s<u.length;s+=1){if(null===(o=u[s].evaluate(t)))return 0;var l=Number(o);if(!isNaN(l))return l}throw new le("Could not convert "+JSON.stringify(o)+" to number.")}return "formatted"===this.type.kind?re.fromString(se(this.args[0].evaluate(t))):"resolvedImage"===this.type.kind?ne.fromString(se(this.args[0].evaluate(t))):se(this.args[0].evaluate(t))},de.prototype.eachChild=function(t){this.args.forEach(t);},de.prototype.outputDefined=function(){return this.args.every((function(t){return t.outputDefined()}))},de.prototype.serialize=function(){if("formatted"===this.type.kind)return new he([{content:this.args[0],scale:null,font:null,textColor:null}]).serialize();if("resolvedImage"===this.type.kind)return new fe(this.args[0]).serialize();var t=["to-"+this.type.kind];return this.eachChild((function(e){t.push(e.serialize());})),t};var me=["Unknown","Point","LineString","Polygon"],ve=function(){this.globals=null,this.feature=null,this.featureState=null,this.formattedSection=null,this._parseColorCache={},this.availableImages=null,this.canonical=null;};ve.prototype.id=function(){return this.feature&&"id"in this.feature?this.feature.id:null},ve.prototype.geometryType=function(){return this.feature?"number"==typeof this.feature.type?me[this.feature.type]:this.feature.type:null},ve.prototype.geometry=function(){return this.feature&&"geometry"in this.feature?this.feature.geometry:null},ve.prototype.canonicalID=function(){return this.canonical},ve.prototype.properties=function(){return this.feature&&this.feature.properties||{}},ve.prototype.parseColor=function(t){var e=this._parseColorCache[t];return e||(e=this._parseColorCache[t]=Qt.parse(t)),e};var ge=function(t,e,r,n){this.name=t,this.type=e,this._evaluate=r,this.args=n;};ge.prototype.evaluate=function(t){return this._evaluate(t,this.args)},ge.prototype.eachChild=function(t){this.args.forEach(t);},ge.prototype.outputDefined=function(){return !1},ge.prototype.serialize=function(){return [this.name].concat(this.args.map((function(t){return t.serialize()})))},ge.parse=function(t,e){var r,n=t[0],i=ge.definitions[n];if(!i)return e.error('Unknown expression "'+n+'". If you wanted a literal array, use ["literal", [...]].',0);for(var a=Array.isArray(i)?i[0]:i.type,o=Array.isArray(i)?[[i[1],i[2]]]:i.overloads,s=o.filter((function(e){var r=e[0];return !Array.isArray(r)||r.length===t.length-1})),u=null,l=0,p=s;l<p.length;l+=1){var c=p[l],h=c[0],f=c[1];u=new Ue(e.registry,e.path,null,e.scope);for(var y=[],d=!1,m=1;m<t.length;m++){var v=t[m],g=Array.isArray(h)?h[m-1]:h.type,x=u.parse(v,1+y.length,g);if(!x){d=!0;break}y.push(x);}if(!d)if(Array.isArray(h)&&h.length!==y.length)u.error("Expected "+h.length+" arguments, but found "+y.length+" instead.");else {for(var b=0;b<y.length;b++){var w=Array.isArray(h)?h[b]:h.type,_=y[b];u.concat(b+1).checkSubtype(w,_.type);}if(0===u.errors.length)return new ge(n,a,f,y)}}if(1===s.length)(r=e.errors).push.apply(r,u.errors);else {for(var A=(s.length?s:o).map((function(t){var e;return e=t[0],Array.isArray(e)?"("+e.map(Xt).join(", ")+")":"("+Xt(e.type)+"...)"})).join(" | "),S=[],k=1;k<t.length;k++){var I=e.parse(t[k],1+S.length);if(!I)return null;S.push(Xt(I.type));}e.error("Expected arguments of type "+A+", but found ("+S.join(", ")+") instead.");}return null},ge.register=function(t,e){for(var r in ge.definitions=e,e)t[r]=ge;};var xe=function(t,e,r){this.type=Nt,this.locale=r,this.caseSensitive=t,this.diacriticSensitive=e;};function be(t,e){t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.max(t[2],e[0]),t[3]=Math.max(t[3],e[1]);}function we(t,e){return !(t[0]<=e[0]||t[2]>=e[2]||t[1]<=e[1]||t[3]>=e[3])}function _e(t,e){var r=(180+t[0])/360,n=(180-180/Math.PI*Math.log(Math.tan(Math.PI/4+t[1]*Math.PI/360)))/360,i=Math.pow(2,e.z);return [Math.round(r*i*8192),Math.round(n*i*8192)]}function Ae(t,e,r){return e[1]>t[1]!=r[1]>t[1]&&t[0]<(r[0]-e[0])*(t[1]-e[1])/(r[1]-e[1])+e[0]}function Se(t,e){for(var r,n,i,a,o,s,u,l=!1,p=0,c=e.length;p<c;p++)for(var h=e[p],f=0,y=h.length;f<y-1;f++){if((a=(r=t)[0]-(n=h[f])[0])*(u=r[1]-(i=h[f+1])[1])-(s=r[0]-i[0])*(o=r[1]-n[1])==0&&a*s<=0&&o*u<=0)return !1;Ae(t,h[f],h[f+1])&&(l=!l);}return l}function ke(t,e){for(var r=0;r<e.length;r++)if(Se(t,e[r]))return !0;return !1}function Ie(t,e,r,n){var i=n[0]-r[0],a=n[1]-r[1],o=(t[0]-r[0])*a-i*(t[1]-r[1]),s=(e[0]-r[0])*a-i*(e[1]-r[1]);return o>0&&s<0||o<0&&s>0}function ze(t,e,r){for(var n=0,i=r;n<i.length;n+=1)for(var a=i[n],o=0;o<a.length-1;++o)if(0!=(c=[(p=a[o+1])[0]-(l=a[o])[0],p[1]-l[1]])[0]*(h=[(u=e)[0]-(s=t)[0],u[1]-s[1]])[1]-c[1]*h[0]&&Ie(s,u,l,p)&&Ie(l,p,s,u))return !0;var s,u,l,p,c,h;return !1}function Ce(t,e){for(var r=0;r<t.length;++r)if(!Se(t[r],e))return !1;for(var n=0;n<t.length-1;++n)if(ze(t[n],t[n+1],e))return !1;return !0}function Ee(t,e){for(var r=0;r<e.length;r++)if(Ce(t,e[r]))return !0;return !1}function Pe(t,e,r){for(var n=[],i=0;i<t.length;i++){for(var a=[],o=0;o<t[i].length;o++){var s=_e(t[i][o],r);be(e,s),a.push(s);}n.push(a);}return n}function Me(t,e,r){for(var n=[],i=0;i<t.length;i++){var a=Pe(t[i],e,r);n.push(a);}return n}function Be(t,e,r,n){if(t[0]<r[0]||t[0]>r[2]){var i=.5*n,a=t[0]-r[0]>i?-n:r[0]-t[0]>i?n:0;0===a&&(a=t[0]-r[2]>i?-n:r[2]-t[0]>i?n:0),t[0]+=a;}be(e,t);}function Te(t,e,r,n){for(var i=8192*Math.pow(2,n.z),a=[8192*n.x,8192*n.y],o=[],s=0,u=t;s<u.length;s+=1)for(var l=0,p=u[s];l<p.length;l+=1){var c=p[l],h=[c.x+a[0],c.y+a[1]];Be(h,e,r,i),o.push(h);}return o}function Ve(t,e,r,n){for(var i,a=8192*Math.pow(2,n.z),o=[8192*n.x,8192*n.y],s=[],u=0,l=t;u<l.length;u+=1){for(var p=[],c=0,h=l[u];c<h.length;c+=1){var f=h[c],y=[f.x+o[0],f.y+o[1]];be(e,y),p.push(y);}s.push(p);}if(e[2]-e[0]<=a/2){(i=e)[0]=i[1]=1/0,i[2]=i[3]=-1/0;for(var d=0,m=s;d<m.length;d+=1)for(var v=0,g=m[d];v<g.length;v+=1)Be(g[v],e,r,a);}return s}xe.parse=function(t,e){if(2!==t.length)return e.error("Expected one argument.");var r=t[1];if("object"!=typeof r||Array.isArray(r))return e.error("Collator options argument must be an object.");var n=e.parse(void 0!==r["case-sensitive"]&&r["case-sensitive"],1,Ot);if(!n)return null;var i=e.parse(void 0!==r["diacritic-sensitive"]&&r["diacritic-sensitive"],1,Ot);if(!i)return null;var a=null;return r.locale&&!(a=e.parse(r.locale,1,Rt))?null:new xe(n,i,a)},xe.prototype.evaluate=function(t){return new te(this.caseSensitive.evaluate(t),this.diacriticSensitive.evaluate(t),this.locale?this.locale.evaluate(t):null)},xe.prototype.eachChild=function(t){t(this.caseSensitive),t(this.diacriticSensitive),this.locale&&t(this.locale);},xe.prototype.outputDefined=function(){return !1},xe.prototype.serialize=function(){var t={};return t["case-sensitive"]=this.caseSensitive.serialize(),t["diacritic-sensitive"]=this.diacriticSensitive.serialize(),this.locale&&(t.locale=this.locale.serialize()),["collator",t]};var Fe=function(t,e){this.type=Ot,this.geojson=t,this.geometries=e;};function De(t){if(t instanceof ge){if("get"===t.name&&1===t.args.length)return !1;if("feature-state"===t.name)return !1;if("has"===t.name&&1===t.args.length)return !1;if("properties"===t.name||"geometry-type"===t.name||"id"===t.name)return !1;if(/^filter-/.test(t.name))return !1}if(t instanceof Fe)return !1;var e=!0;return t.eachChild((function(t){e&&!De(t)&&(e=!1);})),e}function Le(t){if(t instanceof ge&&"feature-state"===t.name)return !1;var e=!0;return t.eachChild((function(t){e&&!Le(t)&&(e=!1);})),e}function Re(t,e){if(t instanceof ge&&e.indexOf(t.name)>=0)return !1;var r=!0;return t.eachChild((function(t){r&&!Re(t,e)&&(r=!1);})),r}Fe.parse=function(t,e){if(2!==t.length)return e.error("'within' expression requires exactly one argument, but found "+(t.length-1)+" instead.");if(ae(t[1])){var r=t[1];if("FeatureCollection"===r.type)for(var n=0;n<r.features.length;++n){var i=r.features[n].geometry.type;if("Polygon"===i||"MultiPolygon"===i)return new Fe(r,r.features[n].geometry)}else if("Feature"===r.type){var a=r.geometry.type;if("Polygon"===a||"MultiPolygon"===a)return new Fe(r,r.geometry)}else if("Polygon"===r.type||"MultiPolygon"===r.type)return new Fe(r,r)}return e.error("'within' expression requires valid geojson object that contains polygon geometry type.")},Fe.prototype.evaluate=function(t){if(null!=t.geometry()&&null!=t.canonicalID()){if("Point"===t.geometryType())return function(t,e){var r=[1/0,1/0,-1/0,-1/0],n=[1/0,1/0,-1/0,-1/0],i=t.canonicalID();if("Polygon"===e.type){var a=Pe(e.coordinates,n,i),o=Te(t.geometry(),r,n,i);if(!we(r,n))return !1;for(var s=0,u=o;s<u.length;s+=1)if(!Se(u[s],a))return !1}if("MultiPolygon"===e.type){var l=Me(e.coordinates,n,i),p=Te(t.geometry(),r,n,i);if(!we(r,n))return !1;for(var c=0,h=p;c<h.length;c+=1)if(!ke(h[c],l))return !1}return !0}(t,this.geometries);if("LineString"===t.geometryType())return function(t,e){var r=[1/0,1/0,-1/0,-1/0],n=[1/0,1/0,-1/0,-1/0],i=t.canonicalID();if("Polygon"===e.type){var a=Pe(e.coordinates,n,i),o=Ve(t.geometry(),r,n,i);if(!we(r,n))return !1;for(var s=0,u=o;s<u.length;s+=1)if(!Ce(u[s],a))return !1}if("MultiPolygon"===e.type){var l=Me(e.coordinates,n,i),p=Ve(t.geometry(),r,n,i);if(!we(r,n))return !1;for(var c=0,h=p;c<h.length;c+=1)if(!Ee(h[c],l))return !1}return !0}(t,this.geometries)}return !1},Fe.prototype.eachChild=function(){},Fe.prototype.outputDefined=function(){return !0},Fe.prototype.serialize=function(){return ["within",this.geojson]};var Oe=function(t,e){this.type=e.type,this.name=t,this.boundExpression=e;};Oe.parse=function(t,e){if(2!==t.length||"string"!=typeof t[1])return e.error("'var' expression requires exactly one string literal argument.");var r=t[1];return e.scope.has(r)?new Oe(r,e.scope.get(r)):e.error('Unknown variable "'+r+'". Make sure "'+r+'" has been bound in an enclosing "let" expression before using it.',1)},Oe.prototype.evaluate=function(t){return this.boundExpression.evaluate(t)},Oe.prototype.eachChild=function(){},Oe.prototype.outputDefined=function(){return !1},Oe.prototype.serialize=function(){return ["var",this.name]};var Ue=function(t,e,r,n,i){void 0===e&&(e=[]),void 0===n&&(n=new Ft),void 0===i&&(i=[]),this.registry=t,this.path=e,this.key=e.map((function(t){return "["+t+"]"})).join(""),this.scope=n,this.errors=i,this.expectedType=r;};function je(t,e){for(var r,n=t.length-1,i=0,a=n,o=0;i<=a;)if((r=t[o=Math.floor((i+a)/2)])<=e){if(o===n||e<t[o+1])return o;i=o+1;}else {if(!(r>e))throw new le("Input is not a number.");a=o-1;}return 0}Ue.prototype.parse=function(t,e,r,n,i){return void 0===i&&(i={}),e?this.concat(e,r,n)._parse(t,i):this._parse(t,i)},Ue.prototype._parse=function(t,e){function r(t,e,r){return "assert"===r?new ce(e,[t]):"coerce"===r?new de(e,[t]):t}if(null!==t&&"string"!=typeof t&&"boolean"!=typeof t&&"number"!=typeof t||(t=["literal",t]),Array.isArray(t)){if(0===t.length)return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');var n=t[0];if("string"!=typeof n)return this.error("Expression name must be a string, but found "+typeof n+' instead. If you wanted a literal array, use ["literal", [...]].',0),null;var i=this.registry[n];if(i){var a=i.parse(t,this);if(!a)return null;if(this.expectedType){var o=this.expectedType,s=a.type;if("string"!==o.kind&&"number"!==o.kind&&"boolean"!==o.kind&&"object"!==o.kind&&"array"!==o.kind||"value"!==s.kind)if("color"!==o.kind&&"formatted"!==o.kind&&"resolvedImage"!==o.kind||"value"!==s.kind&&"string"!==s.kind){if(this.checkSubtype(o,s))return null}else a=r(a,o,e.typeAnnotation||"coerce");else a=r(a,o,e.typeAnnotation||"assert");}if(!(a instanceof ue)&&"resolvedImage"!==a.type.kind&&function t(e){if(e instanceof Oe)return t(e.boundExpression);if(e instanceof ge&&"error"===e.name)return !1;if(e instanceof xe)return !1;if(e instanceof Fe)return !1;var r=e instanceof de||e instanceof ce,n=!0;return e.eachChild((function(e){n=r?n&&t(e):n&&e instanceof ue;})),!!n&&De(e)&&Re(e,["zoom","heatmap-density","line-progress","accumulated","is-supported-script"])}(a)){var u=new ve;try{a=new ue(a.type,a.evaluate(u));}catch(t){return this.error(t.message),null}}return a}return this.error('Unknown expression "'+n+'". If you wanted a literal array, use ["literal", [...]].',0)}return this.error(void 0===t?"'undefined' value invalid. Use null instead.":"object"==typeof t?'Bare objects invalid. Use ["literal", {...}] instead.':"Expected an array, but found "+typeof t+" instead.")},Ue.prototype.concat=function(t,e,r){var n="number"==typeof t?this.path.concat(t):this.path,i=r?this.scope.concat(r):this.scope;return new Ue(this.registry,n,e||null,i,this.errors)},Ue.prototype.error=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];var n=""+this.key+e.map((function(t){return "["+t+"]"})).join("");this.errors.push(new Vt(n,t));},Ue.prototype.checkSubtype=function(t,e){var r=Ht(t,e);return r&&this.error(r),r};var qe=function(t,e,r){this.type=t,this.input=e,this.labels=[],this.outputs=[];for(var n=0,i=r;n<i.length;n+=1){var a=i[n],o=a[1];this.labels.push(a[0]),this.outputs.push(o);}};function Ne(t,e,r){return t*(1-r)+e*r}qe.parse=function(t,e){if(t.length-1<4)return e.error("Expected at least 4 arguments, but found only "+(t.length-1)+".");if((t.length-1)%2!=0)return e.error("Expected an even number of arguments.");var r=e.parse(t[1],1,Lt);if(!r)return null;var n=[],i=null;e.expectedType&&"value"!==e.expectedType.kind&&(i=e.expectedType);for(var a=1;a<t.length;a+=2){var o=1===a?-1/0:t[a],s=t[a+1],u=a,l=a+1;if("number"!=typeof o)return e.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.',u);if(n.length&&n[n.length-1][0]>=o)return e.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.',u);var p=e.parse(s,l,i);if(!p)return null;i=i||p.type,n.push([o,p]);}return new qe(i,r,n)},qe.prototype.evaluate=function(t){var e=this.labels,r=this.outputs;if(1===e.length)return r[0].evaluate(t);var n=this.input.evaluate(t);if(n<=e[0])return r[0].evaluate(t);var i=e.length;return n>=e[i-1]?r[i-1].evaluate(t):r[je(e,n)].evaluate(t)},qe.prototype.eachChild=function(t){t(this.input);for(var e=0,r=this.outputs;e<r.length;e+=1)t(r[e]);},qe.prototype.outputDefined=function(){return this.outputs.every((function(t){return t.outputDefined()}))},qe.prototype.serialize=function(){for(var t=["step",this.input.serialize()],e=0;e<this.labels.length;e++)e>0&&t.push(this.labels[e]),t.push(this.outputs[e].serialize());return t};var Ke=Object.freeze({__proto__:null,number:Ne,color:function(t,e,r){return new Qt(Ne(t.r,e.r,r),Ne(t.g,e.g,r),Ne(t.b,e.b,r),Ne(t.a,e.a,r))},array:function(t,e,r){return t.map((function(t,n){return Ne(t,e[n],r)}))}}),Ge=6/29*3*(6/29),Ze=Math.PI/180,Xe=180/Math.PI;function Je(t){return t>.008856451679035631?Math.pow(t,1/3):t/Ge+4/29}function He(t){return t>6/29?t*t*t:Ge*(t-4/29)}function Ye(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function $e(t){return (t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function We(t){var e=$e(t.r),r=$e(t.g),n=$e(t.b),i=Je((.4124564*e+.3575761*r+.1804375*n)/.95047),a=Je((.2126729*e+.7151522*r+.072175*n)/1);return {l:116*a-16,a:500*(i-a),b:200*(a-Je((.0193339*e+.119192*r+.9503041*n)/1.08883)),alpha:t.a}}function Qe(t){var e=(t.l+16)/116,r=isNaN(t.a)?e:e+t.a/500,n=isNaN(t.b)?e:e-t.b/200;return e=1*He(e),r=.95047*He(r),n=1.08883*He(n),new Qt(Ye(3.2404542*r-1.5371385*e-.4985314*n),Ye(-.969266*r+1.8760108*e+.041556*n),Ye(.0556434*r-.2040259*e+1.0572252*n),t.alpha)}function tr(t,e,r){var n=e-t;return t+r*(n>180||n<-180?n-360*Math.round(n/360):n)}var er={forward:We,reverse:Qe,interpolate:function(t,e,r){return {l:Ne(t.l,e.l,r),a:Ne(t.a,e.a,r),b:Ne(t.b,e.b,r),alpha:Ne(t.alpha,e.alpha,r)}}},rr={forward:function(t){var e=We(t),r=e.l,n=e.a,i=e.b,a=Math.atan2(i,n)*Xe;return {h:a<0?a+360:a,c:Math.sqrt(n*n+i*i),l:r,alpha:t.a}},reverse:function(t){var e=t.h*Ze,r=t.c;return Qe({l:t.l,a:Math.cos(e)*r,b:Math.sin(e)*r,alpha:t.alpha})},interpolate:function(t,e,r){return {h:tr(t.h,e.h,r),c:Ne(t.c,e.c,r),l:Ne(t.l,e.l,r),alpha:Ne(t.alpha,e.alpha,r)}}},nr=Object.freeze({__proto__:null,lab:er,hcl:rr}),ir=function(t,e,r,n,i){this.type=t,this.operator=e,this.interpolation=r,this.input=n,this.labels=[],this.outputs=[];for(var a=0,o=i;a<o.length;a+=1){var s=o[a],u=s[1];this.labels.push(s[0]),this.outputs.push(u);}};function ar(t,e,r,n){var i=n-r,a=t-r;return 0===i?0:1===e?a/i:(Math.pow(e,a)-1)/(Math.pow(e,i)-1)}ir.interpolationFactor=function(t,e,n,i){var a=0;if("exponential"===t.name)a=ar(e,t.base,n,i);else if("linear"===t.name)a=ar(e,1,n,i);else if("cubic-bezier"===t.name){var o=t.controlPoints;a=new r(o[0],o[1],o[2],o[3]).solve(ar(e,1,n,i));}return a},ir.parse=function(t,e){var r=t[0],n=t[1],i=t[2],a=t.slice(3);if(!Array.isArray(n)||0===n.length)return e.error("Expected an interpolation type expression.",1);if("linear"===n[0])n={name:"linear"};else if("exponential"===n[0]){var o=n[1];if("number"!=typeof o)return e.error("Exponential interpolation requires a numeric base.",1,1);n={name:"exponential",base:o};}else {if("cubic-bezier"!==n[0])return e.error("Unknown interpolation type "+String(n[0]),1,0);var s=n.slice(1);if(4!==s.length||s.some((function(t){return "number"!=typeof t||t<0||t>1})))return e.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.",1);n={name:"cubic-bezier",controlPoints:s};}if(t.length-1<4)return e.error("Expected at least 4 arguments, but found only "+(t.length-1)+".");if((t.length-1)%2!=0)return e.error("Expected an even number of arguments.");if(!(i=e.parse(i,2,Lt)))return null;var u=[],l=null;"interpolate-hcl"===r||"interpolate-lab"===r?l=Ut:e.expectedType&&"value"!==e.expectedType.kind&&(l=e.expectedType);for(var p=0;p<a.length;p+=2){var c=a[p],h=a[p+1],f=p+3,y=p+4;if("number"!=typeof c)return e.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.',f);if(u.length&&u[u.length-1][0]>=c)return e.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.',f);var d=e.parse(h,y,l);if(!d)return null;l=l||d.type,u.push([c,d]);}return "number"===l.kind||"color"===l.kind||"array"===l.kind&&"number"===l.itemType.kind&&"number"==typeof l.N?new ir(l,r,n,i,u):e.error("Type "+Xt(l)+" is not interpolatable.")},ir.prototype.evaluate=function(t){var e=this.labels,r=this.outputs;if(1===e.length)return r[0].evaluate(t);var n=this.input.evaluate(t);if(n<=e[0])return r[0].evaluate(t);var i=e.length;if(n>=e[i-1])return r[i-1].evaluate(t);var a=je(e,n),o=ir.interpolationFactor(this.interpolation,n,e[a],e[a+1]),s=r[a].evaluate(t),u=r[a+1].evaluate(t);return "interpolate"===this.operator?Ke[this.type.kind.toLowerCase()](s,u,o):"interpolate-hcl"===this.operator?rr.reverse(rr.interpolate(rr.forward(s),rr.forward(u),o)):er.reverse(er.interpolate(er.forward(s),er.forward(u),o))},ir.prototype.eachChild=function(t){t(this.input);for(var e=0,r=this.outputs;e<r.length;e+=1)t(r[e]);},ir.prototype.outputDefined=function(){return this.outputs.every((function(t){return t.outputDefined()}))},ir.prototype.serialize=function(){var t;t="linear"===this.interpolation.name?["linear"]:"exponential"===this.interpolation.name?1===this.interpolation.base?["linear"]:["exponential",this.interpolation.base]:["cubic-bezier"].concat(this.interpolation.controlPoints);for(var e=[this.operator,t,this.input.serialize()],r=0;r<this.labels.length;r++)e.push(this.labels[r],this.outputs[r].serialize());return e};var or=function(t,e){this.type=t,this.args=e;};or.parse=function(t,e){if(t.length<2)return e.error("Expectected at least one argument.");var r=null,n=e.expectedType;n&&"value"!==n.kind&&(r=n);for(var i=[],a=0,o=t.slice(1);a<o.length;a+=1){var s=e.parse(o[a],1+i.length,r,void 0,{typeAnnotation:"omit"});if(!s)return null;r=r||s.type,i.push(s);}var u=n&&i.some((function(t){return Ht(n,t.type)}));return new or(u?qt:r,i)},or.prototype.evaluate=function(t){for(var e,r=null,n=0,i=0,a=this.args;i<a.length&&(n++,(r=a[i].evaluate(t))&&r instanceof ne&&!r.available&&(e||(e=r.name),r=null,n===this.args.length&&(r=e)),null===r);i+=1);return r},or.prototype.eachChild=function(t){this.args.forEach(t);},or.prototype.outputDefined=function(){return this.args.every((function(t){return t.outputDefined()}))},or.prototype.serialize=function(){var t=["coalesce"];return this.eachChild((function(e){t.push(e.serialize());})),t};var sr=function(t,e){this.type=e.type,this.bindings=[].concat(t),this.result=e;};sr.prototype.evaluate=function(t){return this.result.evaluate(t)},sr.prototype.eachChild=function(t){for(var e=0,r=this.bindings;e<r.length;e+=1)t(r[e][1]);t(this.result);},sr.parse=function(t,e){if(t.length<4)return e.error("Expected at least 3 arguments, but found "+(t.length-1)+" instead.");for(var r=[],n=1;n<t.length-1;n+=2){var i=t[n];if("string"!=typeof i)return e.error("Expected string, but found "+typeof i+" instead.",n);if(/[^a-zA-Z0-9_]/.test(i))return e.error("Variable names must contain only alphanumeric characters or '_'.",n);var a=e.parse(t[n+1],n+1);if(!a)return null;r.push([i,a]);}var o=e.parse(t[t.length-1],t.length-1,e.expectedType,r);return o?new sr(r,o):null},sr.prototype.outputDefined=function(){return this.result.outputDefined()},sr.prototype.serialize=function(){for(var t=["let"],e=0,r=this.bindings;e<r.length;e+=1){var n=r[e];t.push(n[0],n[1].serialize());}return t.push(this.result.serialize()),t};var ur=function(t,e,r){this.type=t,this.index=e,this.input=r;};ur.parse=function(t,e){if(3!==t.length)return e.error("Expected 2 arguments, but found "+(t.length-1)+" instead.");var r=e.parse(t[1],1,Lt),n=e.parse(t[2],2,Zt(e.expectedType||qt));return r&&n?new ur(n.type.itemType,r,n):null},ur.prototype.evaluate=function(t){var e=this.index.evaluate(t),r=this.input.evaluate(t);if(e<0)throw new le("Array index out of bounds: "+e+" < 0.");if(e>=r.length)throw new le("Array index out of bounds: "+e+" > "+(r.length-1)+".");if(e!==Math.floor(e))throw new le("Array index must be an integer, but found "+e+" instead.");return r[e]},ur.prototype.eachChild=function(t){t(this.index),t(this.input);},ur.prototype.outputDefined=function(){return !1},ur.prototype.serialize=function(){return ["at",this.index.serialize(),this.input.serialize()]};var lr=function(t,e){this.type=Ot,this.needle=t,this.haystack=e;};lr.parse=function(t,e){if(3!==t.length)return e.error("Expected 2 arguments, but found "+(t.length-1)+" instead.");var r=e.parse(t[1],1,qt),n=e.parse(t[2],2,qt);return r&&n?Yt(r.type,[Ot,Rt,Lt,Dt,qt])?new lr(r,n):e.error("Expected first argument to be of type boolean, string, number or null, but found "+Xt(r.type)+" instead"):null},lr.prototype.evaluate=function(t){var e=this.needle.evaluate(t),r=this.haystack.evaluate(t);if(!r)return !1;if(!$t(e,["boolean","string","number","null"]))throw new le("Expected first argument to be of type boolean, string, number or null, but found "+Xt(oe(e))+" instead.");if(!$t(r,["string","array"]))throw new le("Expected second argument to be of type array or string, but found "+Xt(oe(r))+" instead.");return r.indexOf(e)>=0},lr.prototype.eachChild=function(t){t(this.needle),t(this.haystack);},lr.prototype.outputDefined=function(){return !0},lr.prototype.serialize=function(){return ["in",this.needle.serialize(),this.haystack.serialize()]};var pr=function(t,e,r){this.type=Lt,this.needle=t,this.haystack=e,this.fromIndex=r;};pr.parse=function(t,e){if(t.length<=2||t.length>=5)return e.error("Expected 3 or 4 arguments, but found "+(t.length-1)+" instead.");var r=e.parse(t[1],1,qt),n=e.parse(t[2],2,qt);if(!r||!n)return null;if(!Yt(r.type,[Ot,Rt,Lt,Dt,qt]))return e.error("Expected first argument to be of type boolean, string, number or null, but found "+Xt(r.type)+" instead");if(4===t.length){var i=e.parse(t[3],3,Lt);return i?new pr(r,n,i):null}return new pr(r,n)},pr.prototype.evaluate=function(t){var e=this.needle.evaluate(t),r=this.haystack.evaluate(t);if(!$t(e,["boolean","string","number","null"]))throw new le("Expected first argument to be of type boolean, string, number or null, but found "+Xt(oe(e))+" instead.");if(!$t(r,["string","array"]))throw new le("Expected second argument to be of type array or string, but found "+Xt(oe(r))+" instead.");if(this.fromIndex){var n=this.fromIndex.evaluate(t);return r.indexOf(e,n)}return r.indexOf(e)},pr.prototype.eachChild=function(t){t(this.needle),t(this.haystack),this.fromIndex&&t(this.fromIndex);},pr.prototype.outputDefined=function(){return !1},pr.prototype.serialize=function(){if(null!=this.fromIndex&&void 0!==this.fromIndex){var t=this.fromIndex.serialize();return ["index-of",this.needle.serialize(),this.haystack.serialize(),t]}return ["index-of",this.needle.serialize(),this.haystack.serialize()]};var cr=function(t,e,r,n,i,a){this.inputType=t,this.type=e,this.input=r,this.cases=n,this.outputs=i,this.otherwise=a;};cr.parse=function(t,e){if(t.length<5)return e.error("Expected at least 4 arguments, but found only "+(t.length-1)+".");if(t.length%2!=1)return e.error("Expected an even number of arguments.");var r,n;e.expectedType&&"value"!==e.expectedType.kind&&(n=e.expectedType);for(var i={},a=[],o=2;o<t.length-1;o+=2){var s=t[o],u=t[o+1];Array.isArray(s)||(s=[s]);var l=e.concat(o);if(0===s.length)return l.error("Expected at least one branch label.");for(var p=0,c=s;p<c.length;p+=1){var h=c[p];if("number"!=typeof h&&"string"!=typeof h)return l.error("Branch labels must be numbers or strings.");if("number"==typeof h&&Math.abs(h)>Number.MAX_SAFE_INTEGER)return l.error("Branch labels must be integers no larger than "+Number.MAX_SAFE_INTEGER+".");if("number"==typeof h&&Math.floor(h)!==h)return l.error("Numeric branch labels must be integer values.");if(r){if(l.checkSubtype(r,oe(h)))return null}else r=oe(h);if(void 0!==i[String(h)])return l.error("Branch labels must be unique.");i[String(h)]=a.length;}var f=e.parse(u,o,n);if(!f)return null;n=n||f.type,a.push(f);}var y=e.parse(t[1],1,qt);if(!y)return null;var d=e.parse(t[t.length-1],t.length-1,n);return d?"value"!==y.type.kind&&e.concat(1).checkSubtype(r,y.type)?null:new cr(r,n,y,i,a,d):null},cr.prototype.evaluate=function(t){var e=this.input.evaluate(t);return (oe(e)===this.inputType&&this.outputs[this.cases[e]]||this.otherwise).evaluate(t)},cr.prototype.eachChild=function(t){t(this.input),this.outputs.forEach(t),t(this.otherwise);},cr.prototype.outputDefined=function(){return this.outputs.every((function(t){return t.outputDefined()}))&&this.otherwise.outputDefined()},cr.prototype.serialize=function(){for(var t=this,e=["match",this.input.serialize()],r=[],n={},i=0,a=Object.keys(this.cases).sort();i<a.length;i+=1){var o=a[i];void 0===(c=n[this.cases[o]])?(n[this.cases[o]]=r.length,r.push([this.cases[o],[o]])):r[c][1].push(o);}for(var s=function(e){return "number"===t.inputType.kind?Number(e):e},u=0,l=r;u<l.length;u+=1){var p=l[u],c=p[0],h=p[1];e.push(1===h.length?s(h[0]):h.map(s)),e.push(this.outputs[outputIndex$1].serialize());}return e.push(this.otherwise.serialize()),e};var hr=function(t,e,r){this.type=t,this.branches=e,this.otherwise=r;};hr.parse=function(t,e){if(t.length<4)return e.error("Expected at least 3 arguments, but found only "+(t.length-1)+".");if(t.length%2!=0)return e.error("Expected an odd number of arguments.");var r;e.expectedType&&"value"!==e.expectedType.kind&&(r=e.expectedType);for(var n=[],i=1;i<t.length-1;i+=2){var a=e.parse(t[i],i,Ot);if(!a)return null;var o=e.parse(t[i+1],i+1,r);if(!o)return null;n.push([a,o]),r=r||o.type;}var s=e.parse(t[t.length-1],t.length-1,r);return s?new hr(r,n,s):null},hr.prototype.evaluate=function(t){for(var e=0,r=this.branches;e<r.length;e+=1){var n=r[e],i=n[1];if(n[0].evaluate(t))return i.evaluate(t)}return this.otherwise.evaluate(t)},hr.prototype.eachChild=function(t){for(var e=0,r=this.branches;e<r.length;e+=1){var n=r[e],i=n[1];t(n[0]),t(i);}t(this.otherwise);},hr.prototype.outputDefined=function(){return this.branches.every((function(t){return t[1].outputDefined()}))&&this.otherwise.outputDefined()},hr.prototype.serialize=function(){var t=["case"];return this.eachChild((function(e){t.push(e.serialize());})),t};var fr=function(t,e,r,n){this.type=t,this.input=e,this.beginIndex=r,this.endIndex=n;};function yr(t,e){return "=="===t||"!="===t?"boolean"===e.kind||"string"===e.kind||"number"===e.kind||"null"===e.kind||"value"===e.kind:"string"===e.kind||"number"===e.kind||"value"===e.kind}function dr(t,e,r,n){return 0===n.compare(e,r)}function mr(t,e,r){var n="=="!==t&&"!="!==t;return function(){function i(t,e,r){this.type=Ot,this.lhs=t,this.rhs=e,this.collator=r,this.hasUntypedArgument="value"===t.type.kind||"value"===e.type.kind;}return i.parse=function(t,e){if(3!==t.length&&4!==t.length)return e.error("Expected two or three arguments.");var r=t[0],a=e.parse(t[1],1,qt);if(!a)return null;if(!yr(r,a.type))return e.concat(1).error('"'+r+"\" comparisons are not supported for type '"+Xt(a.type)+"'.");var o=e.parse(t[2],2,qt);if(!o)return null;if(!yr(r,o.type))return e.concat(2).error('"'+r+"\" comparisons are not supported for type '"+Xt(o.type)+"'.");if(a.type.kind!==o.type.kind&&"value"!==a.type.kind&&"value"!==o.type.kind)return e.error("Cannot compare types '"+Xt(a.type)+"' and '"+Xt(o.type)+"'.");n&&("value"===a.type.kind&&"value"!==o.type.kind?a=new ce(o.type,[a]):"value"!==a.type.kind&&"value"===o.type.kind&&(o=new ce(a.type,[o])));var s=null;if(4===t.length){if("string"!==a.type.kind&&"string"!==o.type.kind&&"value"!==a.type.kind&&"value"!==o.type.kind)return e.error("Cannot use collator to compare non-string types.");if(!(s=e.parse(t[3],3,Nt)))return null}return new i(a,o,s)},i.prototype.evaluate=function(i){var a=this.lhs.evaluate(i),o=this.rhs.evaluate(i);if(n&&this.hasUntypedArgument){var s=oe(a),u=oe(o);if(s.kind!==u.kind||"string"!==s.kind&&"number"!==s.kind)throw new le('Expected arguments for "'+t+'" to be (string, string) or (number, number), but found ('+s.kind+", "+u.kind+") instead.")}if(this.collator&&!n&&this.hasUntypedArgument){var l=oe(a),p=oe(o);if("string"!==l.kind||"string"!==p.kind)return e(i,a,o)}return this.collator?r(i,a,o,this.collator.evaluate(i)):e(i,a,o)},i.prototype.eachChild=function(t){t(this.lhs),t(this.rhs),this.collator&&t(this.collator);},i.prototype.outputDefined=function(){return !0},i.prototype.serialize=function(){var e=[t];return this.eachChild((function(t){e.push(t.serialize());})),e},i}()}fr.parse=function(t,e){if(t.length<=2||t.length>=5)return e.error("Expected 3 or 4 arguments, but found "+(t.length-1)+" instead.");var r=e.parse(t[1],1,qt),n=e.parse(t[2],2,Lt);if(!r||!n)return null;if(!Yt(r.type,[Zt(qt),Rt,qt]))return e.error("Expected first argument to be of type array or string, but found "+Xt(r.type)+" instead");if(4===t.length){var i=e.parse(t[3],3,Lt);return i?new fr(r.type,r,n,i):null}return new fr(r.type,r,n)},fr.prototype.evaluate=function(t){var e=this.input.evaluate(t),r=this.beginIndex.evaluate(t);if(!$t(e,["string","array"]))throw new le("Expected first argument to be of type array or string, but found "+Xt(oe(e))+" instead.");if(this.endIndex){var n=this.endIndex.evaluate(t);return e.slice(r,n)}return e.slice(r)},fr.prototype.eachChild=function(t){t(this.input),t(this.beginIndex),this.endIndex&&t(this.endIndex);},fr.prototype.outputDefined=function(){return !1},fr.prototype.serialize=function(){if(null!=this.endIndex&&void 0!==this.endIndex){var t=this.endIndex.serialize();return ["slice",this.input.serialize(),this.beginIndex.serialize(),t]}return ["slice",this.input.serialize(),this.beginIndex.serialize()]};var vr=mr("==",(function(t,e,r){return e===r}),dr),gr=mr("!=",(function(t,e,r){return e!==r}),(function(t,e,r,n){return !dr(0,e,r,n)})),xr=mr("<",(function(t,e,r){return e<r}),(function(t,e,r,n){return n.compare(e,r)<0})),br=mr(">",(function(t,e,r){return e>r}),(function(t,e,r,n){return n.compare(e,r)>0})),wr=mr("<=",(function(t,e,r){return e<=r}),(function(t,e,r,n){return n.compare(e,r)<=0})),_r=mr(">=",(function(t,e,r){return e>=r}),(function(t,e,r,n){return n.compare(e,r)>=0})),Ar=function(t,e,r,n,i){this.type=Rt,this.number=t,this.locale=e,this.currency=r,this.minFractionDigits=n,this.maxFractionDigits=i;};Ar.parse=function(t,e){if(3!==t.length)return e.error("Expected two arguments.");var r=e.parse(t[1],1,Lt);if(!r)return null;var n=t[2];if("object"!=typeof n||Array.isArray(n))return e.error("NumberFormat options argument must be an object.");var i=null;if(n.locale&&!(i=e.parse(n.locale,1,Rt)))return null;var a=null;if(n.currency&&!(a=e.parse(n.currency,1,Rt)))return null;var o=null;if(n["min-fraction-digits"]&&!(o=e.parse(n["min-fraction-digits"],1,Lt)))return null;var s=null;return n["max-fraction-digits"]&&!(s=e.parse(n["max-fraction-digits"],1,Lt))?null:new Ar(r,i,a,o,s)},Ar.prototype.evaluate=function(t){return new Intl.NumberFormat(this.locale?this.locale.evaluate(t):[],{style:this.currency?"currency":"decimal",currency:this.currency?this.currency.evaluate(t):void 0,minimumFractionDigits:this.minFractionDigits?this.minFractionDigits.evaluate(t):void 0,maximumFractionDigits:this.maxFractionDigits?this.maxFractionDigits.evaluate(t):void 0}).format(this.number.evaluate(t))},Ar.prototype.eachChild=function(t){t(this.number),this.locale&&t(this.locale),this.currency&&t(this.currency),this.minFractionDigits&&t(this.minFractionDigits),this.maxFractionDigits&&t(this.maxFractionDigits);},Ar.prototype.outputDefined=function(){return !1},Ar.prototype.serialize=function(){var t={};return this.locale&&(t.locale=this.locale.serialize()),this.currency&&(t.currency=this.currency.serialize()),this.minFractionDigits&&(t["min-fraction-digits"]=this.minFractionDigits.serialize()),this.maxFractionDigits&&(t["max-fraction-digits"]=this.maxFractionDigits.serialize()),["number-format",this.number.serialize(),t]};var Sr=function(t){this.type=Lt,this.input=t;};Sr.parse=function(t,e){if(2!==t.length)return e.error("Expected 1 argument, but found "+(t.length-1)+" instead.");var r=e.parse(t[1],1);return r?"array"!==r.type.kind&&"string"!==r.type.kind&&"value"!==r.type.kind?e.error("Expected argument of type string or array, but found "+Xt(r.type)+" instead."):new Sr(r):null},Sr.prototype.evaluate=function(t){var e=this.input.evaluate(t);if("string"==typeof e)return e.length;if(Array.isArray(e))return e.length;throw new le("Expected value to be of type string or array, but found "+Xt(oe(e))+" instead.")},Sr.prototype.eachChild=function(t){t(this.input);},Sr.prototype.outputDefined=function(){return !1},Sr.prototype.serialize=function(){var t=["length"];return this.eachChild((function(e){t.push(e.serialize());})),t};var kr={"==":vr,"!=":gr,">":br,"<":xr,">=":_r,"<=":wr,array:ce,at:ur,boolean:ce,case:hr,coalesce:or,collator:xe,format:he,image:fe,in:lr,"index-of":pr,interpolate:ir,"interpolate-hcl":ir,"interpolate-lab":ir,length:Sr,let:sr,literal:ue,match:cr,number:ce,"number-format":Ar,object:ce,slice:fr,step:qe,string:ce,"to-boolean":de,"to-color":de,"to-number":de,"to-string":de,var:Oe,within:Fe};function Ir(t,e){var r=e[0],n=e[1],i=e[2],a=e[3];r=r.evaluate(t),n=n.evaluate(t),i=i.evaluate(t);var o=a?a.evaluate(t):1,s=ie(r,n,i,o);if(s)throw new le(s);return new Qt(r/255*o,n/255*o,i/255*o,o)}function zr(t,e){return t in e}function Cr(t,e){var r=e[t];return void 0===r?null:r}function Er(t){return {type:t}}function Pr(t){return {result:"success",value:t}}function Mr(t){return {result:"error",value:t}}function Br(t){return "data-driven"===t["property-type"]||"cross-faded-data-driven"===t["property-type"]}function Tr(t){return !!t.expression&&t.expression.parameters.indexOf("zoom")>-1}function Vr(t){return !!t.expression&&t.expression.interpolated}function Fr(t){return t instanceof Number?"number":t instanceof String?"string":t instanceof Boolean?"boolean":Array.isArray(t)?"array":null===t?"null":typeof t}function Dr(t){return "object"==typeof t&&null!==t&&!Array.isArray(t)}function Lr(t){return t}function Rr(t,e,r){return void 0!==t?t:void 0!==e?e:void 0!==r?r:void 0}function Or(t,e,r,n,i){return Rr(typeof r===i?n[r]:void 0,t.default,e.default)}function Ur(t,e,r){if("number"!==Fr(r))return Rr(t.default,e.default);var n=t.stops.length;if(1===n)return t.stops[0][1];if(r<=t.stops[0][0])return t.stops[0][1];if(r>=t.stops[n-1][0])return t.stops[n-1][1];var i=je(t.stops.map((function(t){return t[0]})),r);return t.stops[i][1]}function jr(t,e,r){var n=void 0!==t.base?t.base:1;if("number"!==Fr(r))return Rr(t.default,e.default);var i=t.stops.length;if(1===i)return t.stops[0][1];if(r<=t.stops[0][0])return t.stops[0][1];if(r>=t.stops[i-1][0])return t.stops[i-1][1];var a=je(t.stops.map((function(t){return t[0]})),r),o=function(t,e,r,n){var i=n-r,a=t-r;return 0===i?0:1===e?a/i:(Math.pow(e,a)-1)/(Math.pow(e,i)-1)}(r,n,t.stops[a][0],t.stops[a+1][0]),s=t.stops[a][1],u=t.stops[a+1][1],l=Ke[e.type]||Lr;if(t.colorSpace&&"rgb"!==t.colorSpace){var p=nr[t.colorSpace];l=function(t,e){return p.reverse(p.interpolate(p.forward(t),p.forward(e),o))};}return "function"==typeof s.evaluate?{evaluate:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var r=s.evaluate.apply(void 0,t),n=u.evaluate.apply(void 0,t);if(void 0!==r&&void 0!==n)return l(r,n,o)}}:l(s,u,o)}function qr(t,e,r){return "color"===e.type?r=Qt.parse(r):"formatted"===e.type?r=re.fromString(r.toString()):"resolvedImage"===e.type?r=ne.fromString(r.toString()):Fr(r)===e.type||"enum"===e.type&&e.values[r]||(r=void 0),Rr(r,t.default,e.default)}ge.register(kr,{error:[{kind:"error"},[Rt],function(t,e){throw new le(e[0].evaluate(t))}],typeof:[Rt,[qt],function(t,e){return Xt(oe(e[0].evaluate(t)))}],"to-rgba":[Zt(Lt,4),[Ut],function(t,e){return e[0].evaluate(t).toArray()}],rgb:[Ut,[Lt,Lt,Lt],Ir],rgba:[Ut,[Lt,Lt,Lt,Lt],Ir],has:{type:Ot,overloads:[[[Rt],function(t,e){return zr(e[0].evaluate(t),t.properties())}],[[Rt,jt],function(t,e){var r=e[1];return zr(e[0].evaluate(t),r.evaluate(t))}]]},get:{type:qt,overloads:[[[Rt],function(t,e){return Cr(e[0].evaluate(t),t.properties())}],[[Rt,jt],function(t,e){var r=e[1];return Cr(e[0].evaluate(t),r.evaluate(t))}]]},"feature-state":[qt,[Rt],function(t,e){return Cr(e[0].evaluate(t),t.featureState||{})}],properties:[jt,[],function(t){return t.properties()}],"geometry-type":[Rt,[],function(t){return t.geometryType()}],id:[qt,[],function(t){return t.id()}],zoom:[Lt,[],function(t){return t.globals.zoom}],"heatmap-density":[Lt,[],function(t){return t.globals.heatmapDensity||0}],"line-progress":[Lt,[],function(t){return t.globals.lineProgress||0}],accumulated:[qt,[],function(t){return void 0===t.globals.accumulated?null:t.globals.accumulated}],"+":[Lt,Er(Lt),function(t,e){for(var r=0,n=0,i=e;n<i.length;n+=1)r+=i[n].evaluate(t);return r}],"*":[Lt,Er(Lt),function(t,e){for(var r=1,n=0,i=e;n<i.length;n+=1)r*=i[n].evaluate(t);return r}],"-":{type:Lt,overloads:[[[Lt,Lt],function(t,e){var r=e[1];return e[0].evaluate(t)-r.evaluate(t)}],[[Lt],function(t,e){return -e[0].evaluate(t)}]]},"/":[Lt,[Lt,Lt],function(t,e){var r=e[1];return e[0].evaluate(t)/r.evaluate(t)}],"%":[Lt,[Lt,Lt],function(t,e){var r=e[1];return e[0].evaluate(t)%r.evaluate(t)}],ln2:[Lt,[],function(){return Math.LN2}],pi:[Lt,[],function(){return Math.PI}],e:[Lt,[],function(){return Math.E}],"^":[Lt,[Lt,Lt],function(t,e){var r=e[1];return Math.pow(e[0].evaluate(t),r.evaluate(t))}],sqrt:[Lt,[Lt],function(t,e){return Math.sqrt(e[0].evaluate(t))}],log10:[Lt,[Lt],function(t,e){return Math.log(e[0].evaluate(t))/Math.LN10}],ln:[Lt,[Lt],function(t,e){return Math.log(e[0].evaluate(t))}],log2:[Lt,[Lt],function(t,e){return Math.log(e[0].evaluate(t))/Math.LN2}],sin:[Lt,[Lt],function(t,e){return Math.sin(e[0].evaluate(t))}],cos:[Lt,[Lt],function(t,e){return Math.cos(e[0].evaluate(t))}],tan:[Lt,[Lt],function(t,e){return Math.tan(e[0].evaluate(t))}],asin:[Lt,[Lt],function(t,e){return Math.asin(e[0].evaluate(t))}],acos:[Lt,[Lt],function(t,e){return Math.acos(e[0].evaluate(t))}],atan:[Lt,[Lt],function(t,e){return Math.atan(e[0].evaluate(t))}],min:[Lt,Er(Lt),function(t,e){return Math.min.apply(Math,e.map((function(e){return e.evaluate(t)})))}],max:[Lt,Er(Lt),function(t,e){return Math.max.apply(Math,e.map((function(e){return e.evaluate(t)})))}],abs:[Lt,[Lt],function(t,e){return Math.abs(e[0].evaluate(t))}],round:[Lt,[Lt],function(t,e){var r=e[0].evaluate(t);return r<0?-Math.round(-r):Math.round(r)}],floor:[Lt,[Lt],function(t,e){return Math.floor(e[0].evaluate(t))}],ceil:[Lt,[Lt],function(t,e){return Math.ceil(e[0].evaluate(t))}],"filter-==":[Ot,[Rt,qt],function(t,e){var r=e[0],n=e[1];return t.properties()[r.value]===n.value}],"filter-id-==":[Ot,[qt],function(t,e){var r=e[0];return t.id()===r.value}],"filter-type-==":[Ot,[Rt],function(t,e){var r=e[0];return t.geometryType()===r.value}],"filter-<":[Ot,[Rt,qt],function(t,e){var r=e[0],n=e[1],i=t.properties()[r.value],a=n.value;return typeof i==typeof a&&i<a}],"filter-id-<":[Ot,[qt],function(t,e){var r=e[0],n=t.id(),i=r.value;return typeof n==typeof i&&n<i}],"filter->":[Ot,[Rt,qt],function(t,e){var r=e[0],n=e[1],i=t.properties()[r.value],a=n.value;return typeof i==typeof a&&i>a}],"filter-id->":[Ot,[qt],function(t,e){var r=e[0],n=t.id(),i=r.value;return typeof n==typeof i&&n>i}],"filter-<=":[Ot,[Rt,qt],function(t,e){var r=e[0],n=e[1],i=t.properties()[r.value],a=n.value;return typeof i==typeof a&&i<=a}],"filter-id-<=":[Ot,[qt],function(t,e){var r=e[0],n=t.id(),i=r.value;return typeof n==typeof i&&n<=i}],"filter->=":[Ot,[Rt,qt],function(t,e){var r=e[0],n=e[1],i=t.properties()[r.value],a=n.value;return typeof i==typeof a&&i>=a}],"filter-id->=":[Ot,[qt],function(t,e){var r=e[0],n=t.id(),i=r.value;return typeof n==typeof i&&n>=i}],"filter-has":[Ot,[qt],function(t,e){return e[0].value in t.properties()}],"filter-has-id":[Ot,[],function(t){return null!==t.id()&&void 0!==t.id()}],"filter-type-in":[Ot,[Zt(Rt)],function(t,e){return e[0].value.indexOf(t.geometryType())>=0}],"filter-id-in":[Ot,[Zt(qt)],function(t,e){return e[0].value.indexOf(t.id())>=0}],"filter-in-small":[Ot,[Rt,Zt(qt)],function(t,e){var r=e[0];return e[1].value.indexOf(t.properties()[r.value])>=0}],"filter-in-large":[Ot,[Rt,Zt(qt)],function(t,e){var r=e[0],n=e[1];return function(t,e,r,n){for(;r<=n;){var i=r+n>>1;if(e[i]===t)return !0;e[i]>t?n=i-1:r=i+1;}return !1}(t.properties()[r.value],n.value,0,n.value.length-1)}],all:{type:Ot,overloads:[[[Ot,Ot],function(t,e){var r=e[1];return e[0].evaluate(t)&&r.evaluate(t)}],[Er(Ot),function(t,e){for(var r=0,n=e;r<n.length;r+=1)if(!n[r].evaluate(t))return !1;return !0}]]},any:{type:Ot,overloads:[[[Ot,Ot],function(t,e){var r=e[1];return e[0].evaluate(t)||r.evaluate(t)}],[Er(Ot),function(t,e){for(var r=0,n=e;r<n.length;r+=1)if(n[r].evaluate(t))return !0;return !1}]]},"!":[Ot,[Ot],function(t,e){return !e[0].evaluate(t)}],"is-supported-script":[Ot,[Rt],function(t,e){var r=t.globals&&t.globals.isSupportedScript;return !r||r(e[0].evaluate(t))}],upcase:[Rt,[Rt],function(t,e){return e[0].evaluate(t).toUpperCase()}],downcase:[Rt,[Rt],function(t,e){return e[0].evaluate(t).toLowerCase()}],concat:[Rt,Er(qt),function(t,e){return e.map((function(e){return se(e.evaluate(t))})).join("")}],"resolved-locale":[Rt,[Nt],function(t,e){return e[0].evaluate(t).resolvedLocale()}]});var Nr=function(t,e){this.expression=t,this._warningHistory={},this._evaluator=new ve,this._defaultValue=e?function(t){return "color"===t.type&&Dr(t.default)?new Qt(0,0,0,0):"color"===t.type?Qt.parse(t.default)||null:void 0===t.default?null:t.default}(e):null,this._enumValues=e&&"enum"===e.type?e.values:null;};function Kr(t){return Array.isArray(t)&&t.length>0&&"string"==typeof t[0]&&t[0]in kr}function Gr(t,e){var r=new Ue(kr,[],e?function(t){var e={color:Ut,string:Rt,number:Lt,enum:Rt,boolean:Ot,formatted:Kt,resolvedImage:Gt};return "array"===t.type?Zt(e[t.value]||qt,t.length):e[t.type]}(e):void 0),n=r.parse(t,void 0,void 0,void 0,e&&"string"===e.type?{typeAnnotation:"coerce"}:void 0);return n?Pr(new Nr(n,e)):Mr(r.errors)}Nr.prototype.evaluateWithoutErrorHandling=function(t,e,r,n,i,a){return this._evaluator.globals=t,this._evaluator.feature=e,this._evaluator.featureState=r,this._evaluator.canonical=n,this._evaluator.availableImages=i||null,this._evaluator.formattedSection=a,this.expression.evaluate(this._evaluator)},Nr.prototype.evaluate=function(t,e,r,n,i,a){this._evaluator.globals=t,this._evaluator.feature=e||null,this._evaluator.featureState=r||null,this._evaluator.canonical=n,this._evaluator.availableImages=i||null,this._evaluator.formattedSection=a||null;try{var o=this.expression.evaluate(this._evaluator);if(null==o||"number"==typeof o&&o!=o)return this._defaultValue;if(this._enumValues&&!(o in this._enumValues))throw new le("Expected value to be one of "+Object.keys(this._enumValues).map((function(t){return JSON.stringify(t)})).join(", ")+", but found "+JSON.stringify(o)+" instead.");return o}catch(t){return this._warningHistory[t.message]||(this._warningHistory[t.message]=!0,"undefined"!=typeof console&&console.warn(t.message)),this._defaultValue}};var Zr=function(t,e){this.kind=t,this._styleExpression=e,this.isStateDependent="constant"!==t&&!Le(e.expression);};Zr.prototype.evaluateWithoutErrorHandling=function(t,e,r,n,i,a){return this._styleExpression.evaluateWithoutErrorHandling(t,e,r,n,i,a)},Zr.prototype.evaluate=function(t,e,r,n,i,a){return this._styleExpression.evaluate(t,e,r,n,i,a)};var Xr=function(t,e,r,n){this.kind=t,this.zoomStops=r,this._styleExpression=e,this.isStateDependent="camera"!==t&&!Le(e.expression),this.interpolationType=n;};function Jr(t,e){if("error"===(t=Gr(t,e)).result)return t;var r=t.value.expression,n=De(r);if(!n&&!Br(e))return Mr([new Vt("","data expressions not supported")]);var i=Re(r,["zoom"]);if(!i&&!Tr(e))return Mr([new Vt("","zoom expressions not supported")]);var a=function t(e){var r=null;if(e instanceof sr)r=t(e.result);else if(e instanceof or)for(var n=0,i=e.args;n<i.length&&!(r=t(i[n]));n+=1);else (e instanceof qe||e instanceof ir)&&e.input instanceof ge&&"zoom"===e.input.name&&(r=e);return r instanceof Vt||e.eachChild((function(e){var n=t(e);n instanceof Vt?r=n:!r&&n?r=new Vt("",'"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.'):r&&n&&r!==n&&(r=new Vt("",'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));})),r}(r);return a||i?a instanceof Vt?Mr([a]):a instanceof ir&&!Vr(e)?Mr([new Vt("",'"interpolate" expressions cannot be used with this property')]):Pr(a?new Xr(n?"camera":"composite",t.value,a.labels,a instanceof ir?a.interpolation:void 0):new Zr(n?"constant":"source",t.value)):Mr([new Vt("",'"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')])}Xr.prototype.evaluateWithoutErrorHandling=function(t,e,r,n,i,a){return this._styleExpression.evaluateWithoutErrorHandling(t,e,r,n,i,a)},Xr.prototype.evaluate=function(t,e,r,n,i,a){return this._styleExpression.evaluate(t,e,r,n,i,a)},Xr.prototype.interpolationFactor=function(t,e,r){return this.interpolationType?ir.interpolationFactor(this.interpolationType,t,e,r):0};var Hr=function(t,e){this._parameters=t,this._specification=e,Mt(this,function t(e,r){var n,i,a,o="color"===r.type,s=e.stops&&"object"==typeof e.stops[0][0],u=s||!(s||void 0!==e.property),l=e.type||(Vr(r)?"exponential":"interval");if(o&&((e=Mt({},e)).stops&&(e.stops=e.stops.map((function(t){return [t[0],Qt.parse(t[1])]}))),e.default=Qt.parse(e.default?e.default:r.default)),e.colorSpace&&"rgb"!==e.colorSpace&&!nr[e.colorSpace])throw new Error("Unknown color space: "+e.colorSpace);if("exponential"===l)n=jr;else if("interval"===l)n=Ur;else if("categorical"===l){n=Or,i=Object.create(null);for(var p=0,c=e.stops;p<c.length;p+=1){var h=c[p];i[h[0]]=h[1];}a=typeof e.stops[0][0];}else {if("identity"!==l)throw new Error('Unknown function type "'+l+'"');n=qr;}if(s){for(var f={},y=[],d=0;d<e.stops.length;d++){var m=e.stops[d],v=m[0].zoom;void 0===f[v]&&(f[v]={zoom:v,type:e.type,property:e.property,default:e.default,stops:[]},y.push(v)),f[v].stops.push([m[0].value,m[1]]);}for(var g=[],x=0,b=y;x<b.length;x+=1){var w=b[x];g.push([f[w].zoom,t(f[w],r)]);}var _={name:"linear"};return {kind:"composite",interpolationType:_,interpolationFactor:ir.interpolationFactor.bind(void 0,_),zoomStops:g.map((function(t){return t[0]})),evaluate:function(t,n){var i=t.zoom;return jr({stops:g,base:e.base},r,i).evaluate(i,n)}}}if(u){var A="exponential"===l?{name:"exponential",base:void 0!==e.base?e.base:1}:null;return {kind:"camera",interpolationType:A,interpolationFactor:ir.interpolationFactor.bind(void 0,A),zoomStops:e.stops.map((function(t){return t[0]})),evaluate:function(t){return n(e,r,t.zoom,i,a)}}}return {kind:"source",evaluate:function(t,o){var s=o&&o.properties?o.properties[e.property]:void 0;return void 0===s?Rr(e.default,r.default):n(e,r,s,i,a)}}}(this._parameters,this._specification));};function Yr(t){var e=t.key,r=t.value,n=t.valueSpec||{},i=t.objectElementValidators||{},a=t.style,o=t.styleSpec,s=[],u=Fr(r);if("object"!==u)return [new Et(e,r,"object expected, "+u+" found")];for(var l in r){var p=l.split(".")[0],c=n[p]||n["*"],h=void 0;if(i[p])h=i[p];else if(n[p])h=_n;else if(i["*"])h=i["*"];else {if(!n["*"]){s.push(new Et(e,r[l],'unknown property "'+l+'"'));continue}h=_n;}s=s.concat(h({key:(e?e+".":e)+l,value:r[l],valueSpec:c,style:a,styleSpec:o,object:r,objectKey:l},r));}for(var f in n)i[f]||n[f].required&&void 0===n[f].default&&void 0===r[f]&&s.push(new Et(e,r,'missing required property "'+f+'"'));return s}function $r(t){var e=t.value,r=t.valueSpec,n=t.style,i=t.styleSpec,a=t.key,o=t.arrayElementValidator||_n;if("array"!==Fr(e))return [new Et(a,e,"array expected, "+Fr(e)+" found")];if(r.length&&e.length!==r.length)return [new Et(a,e,"array length "+r.length+" expected, length "+e.length+" found")];if(r["min-length"]&&e.length<r["min-length"])return [new Et(a,e,"array length at least "+r["min-length"]+" expected, length "+e.length+" found")];var s={type:r.value,values:r.values};i.$version<7&&(s.function=r.function),"object"===Fr(r.value)&&(s=r.value);for(var u=[],l=0;l<e.length;l++)u=u.concat(o({array:e,arrayIndex:l,value:e[l],valueSpec:s,style:n,styleSpec:i,key:a+"["+l+"]"}));return u}function Wr(t){var e=t.key,r=t.value,n=t.valueSpec,i=Fr(r);return "number"===i&&r!=r&&(i="NaN"),"number"!==i?[new Et(e,r,"number expected, "+i+" found")]:"minimum"in n&&r<n.minimum?[new Et(e,r,r+" is less than the minimum value "+n.minimum)]:"maximum"in n&&r>n.maximum?[new Et(e,r,r+" is greater than the maximum value "+n.maximum)]:[]}function Qr(t){var e,r,n,i=t.valueSpec,a=Bt(t.value.type),o={},s="categorical"!==a&&void 0===t.value.property,u=!s,l="array"===Fr(t.value.stops)&&"array"===Fr(t.value.stops[0])&&"object"===Fr(t.value.stops[0][0]),p=Yr({key:t.key,value:t.value,valueSpec:t.styleSpec.function,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{stops:function(t){if("identity"===a)return [new Et(t.key,t.value,'identity function may not have a "stops" property')];var e=[],r=t.value;return e=e.concat($r({key:t.key,value:r,valueSpec:t.valueSpec,style:t.style,styleSpec:t.styleSpec,arrayElementValidator:c})),"array"===Fr(r)&&0===r.length&&e.push(new Et(t.key,r,"array must have at least one stop")),e},default:function(t){return _n({key:t.key,value:t.value,valueSpec:i,style:t.style,styleSpec:t.styleSpec})}}});return "identity"===a&&s&&p.push(new Et(t.key,t.value,'missing required property "property"')),"identity"===a||t.value.stops||p.push(new Et(t.key,t.value,'missing required property "stops"')),"exponential"===a&&t.valueSpec.expression&&!Vr(t.valueSpec)&&p.push(new Et(t.key,t.value,"exponential functions not supported")),t.styleSpec.$version>=8&&(u&&!Br(t.valueSpec)?p.push(new Et(t.key,t.value,"property functions not supported")):s&&!Tr(t.valueSpec)&&p.push(new Et(t.key,t.value,"zoom functions not supported"))),"categorical"!==a&&!l||void 0!==t.value.property||p.push(new Et(t.key,t.value,'"property" property is required')),p;function c(t){var e=[],a=t.value,s=t.key;if("array"!==Fr(a))return [new Et(s,a,"array expected, "+Fr(a)+" found")];if(2!==a.length)return [new Et(s,a,"array length 2 expected, length "+a.length+" found")];if(l){if("object"!==Fr(a[0]))return [new Et(s,a,"object expected, "+Fr(a[0])+" found")];if(void 0===a[0].zoom)return [new Et(s,a,"object stop key must have zoom")];if(void 0===a[0].value)return [new Et(s,a,"object stop key must have value")];if(n&&n>Bt(a[0].zoom))return [new Et(s,a[0].zoom,"stop zoom values must appear in ascending order")];Bt(a[0].zoom)!==n&&(n=Bt(a[0].zoom),r=void 0,o={}),e=e.concat(Yr({key:s+"[0]",value:a[0],valueSpec:{zoom:{}},style:t.style,styleSpec:t.styleSpec,objectElementValidators:{zoom:Wr,value:h}}));}else e=e.concat(h({key:s+"[0]",value:a[0],valueSpec:{},style:t.style,styleSpec:t.styleSpec},a));return Kr(Tt(a[1]))?e.concat([new Et(s+"[1]",a[1],"expressions are not allowed in function stops.")]):e.concat(_n({key:s+"[1]",value:a[1],valueSpec:i,style:t.style,styleSpec:t.styleSpec}))}function h(t,n){var s=Fr(t.value),u=Bt(t.value),l=null!==t.value?t.value:n;if(e){if(s!==e)return [new Et(t.key,l,s+" stop domain type must match previous stop domain type "+e)]}else e=s;if("number"!==s&&"string"!==s&&"boolean"!==s)return [new Et(t.key,l,"stop domain value must be a number, string, or boolean")];if("number"!==s&&"categorical"!==a){var p="number expected, "+s+" found";return Br(i)&&void 0===a&&(p+='\nIf you intended to use a categorical function, specify `"type": "categorical"`.'),[new Et(t.key,l,p)]}return "categorical"!==a||"number"!==s||isFinite(u)&&Math.floor(u)===u?"categorical"!==a&&"number"===s&&void 0!==r&&u<r?[new Et(t.key,l,"stop domain values must appear in ascending order")]:(r=u,"categorical"===a&&u in o?[new Et(t.key,l,"stop domain values must be unique")]:(o[u]=!0,[])):[new Et(t.key,l,"integer expected, found "+u)]}}function tn(t){var e=("property"===t.expressionContext?Jr:Gr)(Tt(t.value),t.valueSpec);if("error"===e.result)return e.value.map((function(e){return new Et(""+t.key+e.key,t.value,e.message)}));var r=e.value.expression||e.value._styleExpression.expression;if("property"===t.expressionContext&&"text-font"===t.propertyKey&&!r.outputDefined())return [new Et(t.key,t.value,'Invalid data expression for "'+t.propertyKey+'". Output values must be contained as literals within the expression.')];if("property"===t.expressionContext&&"layout"===t.propertyType&&!Le(r))return [new Et(t.key,t.value,'"feature-state" data expressions are not supported with layout properties.')];if("filter"===t.expressionContext&&!Le(r))return [new Et(t.key,t.value,'"feature-state" data expressions are not supported with filters.')];if(t.expressionContext&&0===t.expressionContext.indexOf("cluster")){if(!Re(r,["zoom","feature-state"]))return [new Et(t.key,t.value,'"zoom" and "feature-state" expressions are not supported with cluster properties.')];if("cluster-initial"===t.expressionContext&&!De(r))return [new Et(t.key,t.value,"Feature data expressions are not supported with initial expression part of cluster properties.")]}return []}function en(t){var e=t.key,r=t.value,n=t.valueSpec,i=[];return Array.isArray(n.values)?-1===n.values.indexOf(Bt(r))&&i.push(new Et(e,r,"expected one of ["+n.values.join(", ")+"], "+JSON.stringify(r)+" found")):-1===Object.keys(n.values).indexOf(Bt(r))&&i.push(new Et(e,r,"expected one of ["+Object.keys(n.values).join(", ")+"], "+JSON.stringify(r)+" found")),i}function rn(t){if(!0===t||!1===t)return !0;if(!Array.isArray(t)||0===t.length)return !1;switch(t[0]){case"has":return t.length>=2&&"$id"!==t[1]&&"$type"!==t[1];case"in":return t.length>=3&&("string"!=typeof t[1]||Array.isArray(t[2]));case"!in":case"!has":case"none":return !1;case"==":case"!=":case">":case">=":case"<":case"<=":return 3!==t.length||Array.isArray(t[1])||Array.isArray(t[2]);case"any":case"all":for(var e=0,r=t.slice(1);e<r.length;e+=1){var n=r[e];if(!rn(n)&&"boolean"!=typeof n)return !1}return !0;default:return !0}}Hr.deserialize=function(t){return new Hr(t._parameters,t._specification)},Hr.serialize=function(t){return {_parameters:t._parameters,_specification:t._specification}};var nn={type:"boolean",default:!1,transition:!1,"property-type":"data-driven",expression:{interpolated:!1,parameters:["zoom","feature"]}};function an(t){if(null==t)return {filter:function(){return !0},needGeometry:!1};rn(t)||(t=sn(t));var e=Gr(t,nn);if("error"===e.result)throw new Error(e.value.map((function(t){return t.key+": "+t.message})).join(", "));return {filter:function(t,r,n){return e.value.evaluate(t,r,{},n)},needGeometry:function t(e){if(!Array.isArray(e))return !1;if("within"===e[0])return !0;for(var r=1;r<e.length;r++)if(t(e[r]))return !0;return !1}(t)}}function on(t,e){return t<e?-1:t>e?1:0}function sn(t){if(!t)return !0;var e,r=t[0];return t.length<=1?"any"!==r:"=="===r?un(t[1],t[2],"=="):"!="===r?cn(un(t[1],t[2],"==")):"<"===r||">"===r||"<="===r||">="===r?un(t[1],t[2],r):"any"===r?(e=t.slice(1),["any"].concat(e.map(sn))):"all"===r?["all"].concat(t.slice(1).map(sn)):"none"===r?["all"].concat(t.slice(1).map(sn).map(cn)):"in"===r?ln(t[1],t.slice(2)):"!in"===r?cn(ln(t[1],t.slice(2))):"has"===r?pn(t[1]):"!has"===r?cn(pn(t[1])):"within"!==r||t}function un(t,e,r){switch(t){case"$type":return ["filter-type-"+r,e];case"$id":return ["filter-id-"+r,e];default:return ["filter-"+r,t,e]}}function ln(t,e){if(0===e.length)return !1;switch(t){case"$type":return ["filter-type-in",["literal",e]];case"$id":return ["filter-id-in",["literal",e]];default:return e.length>200&&!e.some((function(t){return typeof t!=typeof e[0]}))?["filter-in-large",t,["literal",e.sort(on)]]:["filter-in-small",t,["literal",e]]}}function pn(t){switch(t){case"$type":return !0;case"$id":return ["filter-has-id"];default:return ["filter-has",t]}}function cn(t){return ["!",t]}function hn(t){return rn(Tt(t.value))?tn(Mt({},t,{expressionContext:"filter",valueSpec:{value:"boolean"}})):function t(e){var r=e.value,n=e.key;if("array"!==Fr(r))return [new Et(n,r,"array expected, "+Fr(r)+" found")];var i,a=e.styleSpec,o=[];if(r.length<1)return [new Et(n,r,"filter array must have at least 1 element")];switch(o=o.concat(en({key:n+"[0]",value:r[0],valueSpec:a.filter_operator,style:e.style,styleSpec:e.styleSpec})),Bt(r[0])){case"<":case"<=":case">":case">=":r.length>=2&&"$type"===Bt(r[1])&&o.push(new Et(n,r,'"$type" cannot be use with operator "'+r[0]+'"'));case"==":case"!=":3!==r.length&&o.push(new Et(n,r,'filter array for operator "'+r[0]+'" must have 3 elements'));case"in":case"!in":r.length>=2&&"string"!==(i=Fr(r[1]))&&o.push(new Et(n+"[1]",r[1],"string expected, "+i+" found"));for(var s=2;s<r.length;s++)i=Fr(r[s]),"$type"===Bt(r[1])?o=o.concat(en({key:n+"["+s+"]",value:r[s],valueSpec:a.geometry_type,style:e.style,styleSpec:e.styleSpec})):"string"!==i&&"number"!==i&&"boolean"!==i&&o.push(new Et(n+"["+s+"]",r[s],"string, number, or boolean expected, "+i+" found"));break;case"any":case"all":case"none":for(var u=1;u<r.length;u++)o=o.concat(t({key:n+"["+u+"]",value:r[u],style:e.style,styleSpec:e.styleSpec}));break;case"has":case"!has":i=Fr(r[1]),2!==r.length?o.push(new Et(n,r,'filter array for "'+r[0]+'" operator must have 2 elements')):"string"!==i&&o.push(new Et(n+"[1]",r[1],"string expected, "+i+" found"));break;case"within":i=Fr(r[1]),2!==r.length?o.push(new Et(n,r,'filter array for "'+r[0]+'" operator must have 2 elements')):"object"!==i&&o.push(new Et(n+"[1]",r[1],"object expected, "+i+" found"));}return o}(t)}function fn(t,e){var r=t.key,n=t.style,i=t.styleSpec,a=t.value,o=t.objectKey,s=i[e+"_"+t.layerType];if(!s)return [];var u=o.match(/^(.*)-transition$/);if("paint"===e&&u&&s[u[1]]&&s[u[1]].transition)return _n({key:r,value:a,valueSpec:i.transition,style:n,styleSpec:i});var l,p=t.valueSpec||s[o];if(!p)return [new Et(r,a,'unknown property "'+o+'"')];if("string"===Fr(a)&&Br(p)&&!p.tokens&&(l=/^{([^}]+)}$/.exec(a)))return [new Et(r,a,'"'+o+'" does not support interpolation syntax\nUse an identity property function instead: `{ "type": "identity", "property": '+JSON.stringify(l[1])+" }`.")];var c=[];return "symbol"===t.layerType&&("text-field"===o&&n&&!n.glyphs&&c.push(new Et(r,a,'use of "text-field" requires a style "glyphs" property')),"text-font"===o&&Dr(Tt(a))&&"identity"===Bt(a.type)&&c.push(new Et(r,a,'"text-font" does not support identity functions'))),c.concat(_n({key:t.key,value:a,valueSpec:p,style:n,styleSpec:i,expressionContext:"property",propertyType:e,propertyKey:o}))}function yn(t){return fn(t,"paint")}function dn(t){return fn(t,"layout")}function mn(t){var e=[],r=t.value,n=t.key,i=t.style,a=t.styleSpec;r.type||r.ref||e.push(new Et(n,r,'either "type" or "ref" is required'));var o,s=Bt(r.type),u=Bt(r.ref);if(r.id)for(var l=Bt(r.id),p=0;p<t.arrayIndex;p++){var c=i.layers[p];Bt(c.id)===l&&e.push(new Et(n,r.id,'duplicate layer id "'+r.id+'", previously used at line '+c.id.__line__));}if("ref"in r)["type","source","source-layer","filter","layout"].forEach((function(t){t in r&&e.push(new Et(n,r[t],'"'+t+'" is prohibited for ref layers'));})),i.layers.forEach((function(t){Bt(t.id)===u&&(o=t);})),o?o.ref?e.push(new Et(n,r.ref,"ref cannot reference another ref layer")):s=Bt(o.type):e.push(new Et(n,r.ref,'ref layer "'+u+'" not found'));else if("background"!==s)if(r.source){var h=i.sources&&i.sources[r.source],f=h&&Bt(h.type);h?"vector"===f&&"raster"===s?e.push(new Et(n,r.source,'layer "'+r.id+'" requires a raster source')):"raster"===f&&"raster"!==s?e.push(new Et(n,r.source,'layer "'+r.id+'" requires a vector source')):"vector"!==f||r["source-layer"]?"raster-dem"===f&&"hillshade"!==s?e.push(new Et(n,r.source,"raster-dem source can only be used with layer type 'hillshade'.")):"line"!==s||!r.paint||!r.paint["line-gradient"]||"geojson"===f&&h.lineMetrics||e.push(new Et(n,r,'layer "'+r.id+'" specifies a line-gradient, which requires a GeoJSON source with `lineMetrics` enabled.')):e.push(new Et(n,r,'layer "'+r.id+'" must specify a "source-layer"')):e.push(new Et(n,r.source,'source "'+r.source+'" not found'));}else e.push(new Et(n,r,'missing required property "source"'));return e=e.concat(Yr({key:n,value:r,valueSpec:a.layer,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":function(){return []},type:function(){return _n({key:n+".type",value:r.type,valueSpec:a.layer.type,style:t.style,styleSpec:t.styleSpec,object:r,objectKey:"type"})},filter:hn,layout:function(t){return Yr({layer:r,key:t.key,value:t.value,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":function(t){return dn(Mt({layerType:s},t))}}})},paint:function(t){return Yr({layer:r,key:t.key,value:t.value,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":function(t){return yn(Mt({layerType:s},t))}}})}}}))}function vn(t){var e=t.value,r=t.key,n=Fr(e);return "string"!==n?[new Et(r,e,"string expected, "+n+" found")]:[]}var gn={promoteId:function(t){var e=t.key,r=t.value;if("string"===Fr(r))return vn({key:e,value:r});var n=[];for(var i in r)n.push.apply(n,vn({key:e+"."+i,value:r[i]}));return n}};function xn(t){var e=t.value,r=t.key,n=t.styleSpec,i=t.style;if(!e.type)return [new Et(r,e,'"type" is required')];var a,o=Bt(e.type);switch(o){case"vector":case"raster":case"raster-dem":return Yr({key:r,value:e,valueSpec:n["source_"+o.replace("-","_")],style:t.style,styleSpec:n,objectElementValidators:gn});case"geojson":if(a=Yr({key:r,value:e,valueSpec:n.source_geojson,style:i,styleSpec:n,objectElementValidators:gn}),e.cluster)for(var s in e.clusterProperties){var u=e.clusterProperties[s],l=u[0],p="string"==typeof l?[l,["accumulated"],["get",s]]:l;a.push.apply(a,tn({key:r+"."+s+".map",value:u[1],expressionContext:"cluster-map"})),a.push.apply(a,tn({key:r+"."+s+".reduce",value:p,expressionContext:"cluster-reduce"}));}return a;case"video":return Yr({key:r,value:e,valueSpec:n.source_video,style:i,styleSpec:n});case"image":return Yr({key:r,value:e,valueSpec:n.source_image,style:i,styleSpec:n});case"canvas":return [new Et(r,null,"Please use runtime APIs to add canvas sources, rather than including them in stylesheets.","source.canvas")];default:return en({key:r+".type",value:e.type,valueSpec:{values:["vector","raster","raster-dem","geojson","video","image"]},style:i,styleSpec:n})}}function bn(t){var e=t.value,r=t.styleSpec,n=r.light,i=t.style,a=[],o=Fr(e);if(void 0===e)return a;if("object"!==o)return a.concat([new Et("light",e,"object expected, "+o+" found")]);for(var s in e){var u=s.match(/^(.*)-transition$/);a=a.concat(u&&n[u[1]]&&n[u[1]].transition?_n({key:s,value:e[s],valueSpec:r.transition,style:i,styleSpec:r}):n[s]?_n({key:s,value:e[s],valueSpec:n[s],style:i,styleSpec:r}):[new Et(s,e[s],'unknown property "'+s+'"')]);}return a}var wn={"*":function(){return []},array:$r,boolean:function(t){var e=t.value,r=t.key,n=Fr(e);return "boolean"!==n?[new Et(r,e,"boolean expected, "+n+" found")]:[]},number:Wr,color:function(t){var e=t.key,r=t.value,n=Fr(r);return "string"!==n?[new Et(e,r,"color expected, "+n+" found")]:null===Wt(r)?[new Et(e,r,'color expected, "'+r+'" found')]:[]},constants:Pt,enum:en,filter:hn,function:Qr,layer:mn,object:Yr,source:xn,light:bn,string:vn,formatted:function(t){return 0===vn(t).length?[]:tn(t)},resolvedImage:function(t){return 0===vn(t).length?[]:tn(t)}};function _n(t){var e=t.value,r=t.valueSpec,n=t.styleSpec;return r.expression&&Dr(Bt(e))?Qr(t):r.expression&&Kr(Tt(e))?tn(t):r.type&&wn[r.type]?wn[r.type](t):Yr(Mt({},t,{valueSpec:r.type?n[r.type]:r}))}function An(t){var e=t.value,r=t.key,n=vn(t);return n.length||(-1===e.indexOf("{fontstack}")&&n.push(new Et(r,e,'"glyphs" url must include a "{fontstack}" token')),-1===e.indexOf("{range}")&&n.push(new Et(r,e,'"glyphs" url must include a "{range}" token'))),n}function Sn(t,e){void 0===e&&(e=Ct);var r=[];return r=r.concat(_n({key:"",value:t,valueSpec:e.$root,styleSpec:e,style:t,objectElementValidators:{glyphs:An,"*":function(){return []}}})),t.constants&&(r=r.concat(Pt({key:"constants",value:t.constants,style:t,styleSpec:e}))),kn(r)}function kn(t){return [].concat(t).sort((function(t,e){return t.line-e.line}))}function In(t){return function(){for(var e=[],r=arguments.length;r--;)e[r]=arguments[r];return kn(t.apply(this,e))}}Sn.source=In(xn),Sn.light=In(bn),Sn.layer=In(mn),Sn.filter=In(hn),Sn.paintProperty=In(yn),Sn.layoutProperty=In(dn);var zn=Sn,Cn=zn.light,En=zn.paintProperty,Pn=zn.layoutProperty;function Mn(t,e){var r=!1;if(e&&e.length)for(var n=0,i=e;n<i.length;n+=1)t.fire(new It(new Error(i[n].message))),r=!0;return r}var Bn=Tn;function Tn(t,e,r){var n=this.cells=[];if(t instanceof ArrayBuffer){this.arrayBuffer=t;var i=new Int32Array(this.arrayBuffer);t=i[0],this.d=(e=i[1])+2*(r=i[2]);for(var a=0;a<this.d*this.d;a++){var o=i[3+a],s=i[3+a+1];n.push(o===s?null:i.subarray(o,s));}var u=i[3+n.length+1];this.keys=i.subarray(i[3+n.length],u),this.bboxes=i.subarray(u),this.insert=this._insertReadonly;}else {this.d=e+2*r;for(var l=0;l<this.d*this.d;l++)n.push([]);this.keys=[],this.bboxes=[];}this.n=e,this.extent=t,this.padding=r,this.scale=e/t,this.uid=0;var p=r/e*t;this.min=-p,this.max=t+p;}Tn.prototype.insert=function(t,e,r,n,i){this._forEachCell(e,r,n,i,this._insertCell,this.uid++),this.keys.push(t),this.bboxes.push(e),this.bboxes.push(r),this.bboxes.push(n),this.bboxes.push(i);},Tn.prototype._insertReadonly=function(){throw "Cannot insert into a GridIndex created from an ArrayBuffer."},Tn.prototype._insertCell=function(t,e,r,n,i,a){this.cells[i].push(a);},Tn.prototype.query=function(t,e,r,n,i){var a=this.min,o=this.max;if(t<=a&&e<=a&&o<=r&&o<=n&&!i)return Array.prototype.slice.call(this.keys);var s=[];return this._forEachCell(t,e,r,n,this._queryCell,s,{},i),s},Tn.prototype._queryCell=function(t,e,r,n,i,a,o,s){var u=this.cells[i];if(null!==u)for(var l=this.keys,p=this.bboxes,c=0;c<u.length;c++){var h=u[c];if(void 0===o[h]){var f=4*h;(s?s(p[f+0],p[f+1],p[f+2],p[f+3]):t<=p[f+2]&&e<=p[f+3]&&r>=p[f+0]&&n>=p[f+1])?(o[h]=!0,a.push(l[h])):o[h]=!1;}}},Tn.prototype._forEachCell=function(t,e,r,n,i,a,o,s){for(var u=this._convertToCellCoord(t),l=this._convertToCellCoord(e),p=this._convertToCellCoord(r),c=this._convertToCellCoord(n),h=u;h<=p;h++)for(var f=l;f<=c;f++){var y=this.d*f+h;if((!s||s(this._convertFromCellCoord(h),this._convertFromCellCoord(f),this._convertFromCellCoord(h+1),this._convertFromCellCoord(f+1)))&&i.call(this,t,e,r,n,y,a,o,s))return}},Tn.prototype._convertFromCellCoord=function(t){return (t-this.padding)/this.scale},Tn.prototype._convertToCellCoord=function(t){return Math.max(0,Math.min(this.d-1,Math.floor(t*this.scale)+this.padding))},Tn.prototype.toArrayBuffer=function(){if(this.arrayBuffer)return this.arrayBuffer;for(var t=this.cells,e=3+this.cells.length+1+1,r=0,n=0;n<this.cells.length;n++)r+=this.cells[n].length;var i=new Int32Array(e+r+this.keys.length+this.bboxes.length);i[0]=this.extent,i[1]=this.n,i[2]=this.padding;for(var a=e,o=0;o<t.length;o++){var s=t[o];i[3+o]=a,i.set(s,a),a+=s.length;}return i[3+t.length]=a,i.set(this.keys,a),i[3+t.length+1]=a+=this.keys.length,i.set(this.bboxes,a),a+=this.bboxes.length,i.buffer};var Vn=o.ImageData,Fn=o.ImageBitmap,Dn={};function Ln(t,e,r){void 0===r&&(r={}),Object.defineProperty(e,"_classRegistryKey",{value:t,writeable:!1}),Dn[t]={klass:e,omit:r.omit||[],shallow:r.shallow||[]};}for(var Rn in Ln("Object",Object),Bn.serialize=function(t,e){var r=t.toArrayBuffer();return e&&e.push(r),{buffer:r}},Bn.deserialize=function(t){return new Bn(t.buffer)},Ln("Grid",Bn),Ln("Color",Qt),Ln("Error",Error),Ln("ResolvedImage",ne),Ln("StylePropertyFunction",Hr),Ln("StyleExpression",Nr,{omit:["_evaluator"]}),Ln("ZoomDependentExpression",Xr),Ln("ZoomConstantExpression",Zr),Ln("CompoundExpression",ge,{omit:["_evaluate"]}),kr)kr[Rn]._classRegistryKey||Ln("Expression_"+Rn,kr[Rn]);function On(t){return t&&"undefined"!=typeof ArrayBuffer&&(t instanceof ArrayBuffer||t.constructor&&"ArrayBuffer"===t.constructor.name)}function Un(t){return Fn&&t instanceof Fn}function jn(t,e){if(null==t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||t instanceof Boolean||t instanceof Number||t instanceof String||t instanceof Date||t instanceof RegExp)return t;if(On(t)||Un(t))return e&&e.push(t),t;if(ArrayBuffer.isView(t)){var r=t;return e&&e.push(r.buffer),r}if(t instanceof Vn)return e&&e.push(t.data.buffer),t;if(Array.isArray(t)){for(var n=[],i=0,a=t;i<a.length;i+=1)n.push(jn(a[i],e));return n}if("object"==typeof t){var o=t.constructor,s=o._classRegistryKey;if(!s)throw new Error("can't serialize object of unregistered class");var u=o.serialize?o.serialize(t,e):{};if(!o.serialize){for(var l in t)if(t.hasOwnProperty(l)&&!(Dn[s].omit.indexOf(l)>=0)){var p=t[l];u[l]=Dn[s].shallow.indexOf(l)>=0?p:jn(p,e);}t instanceof Error&&(u.message=t.message);}if(u.$name)throw new Error("$name property is reserved for worker serialization logic.");return "Object"!==s&&(u.$name=s),u}throw new Error("can't serialize object of type "+typeof t)}function qn(t){if(null==t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||t instanceof Boolean||t instanceof Number||t instanceof String||t instanceof Date||t instanceof RegExp||On(t)||Un(t)||ArrayBuffer.isView(t)||t instanceof Vn)return t;if(Array.isArray(t))return t.map(qn);if("object"==typeof t){var e=t.$name||"Object",r=Dn[e].klass;if(!r)throw new Error("can't deserialize unregistered class "+e);if(r.deserialize)return r.deserialize(t);for(var n=Object.create(r.prototype),i=0,a=Object.keys(t);i<a.length;i+=1){var o=a[i];if("$name"!==o){var s=t[o];n[o]=Dn[e].shallow.indexOf(o)>=0?s:qn(s);}}return n}throw new Error("can't deserialize object of type "+typeof t)}var Nn=function(){this.first=!0;};Nn.prototype.update=function(t,e){var r=Math.floor(t);return this.first?(this.first=!1,this.lastIntegerZoom=r,this.lastIntegerZoomTime=0,this.lastZoom=t,this.lastFloorZoom=r,!0):(this.lastFloorZoom>r?(this.lastIntegerZoom=r+1,this.lastIntegerZoomTime=e):this.lastFloorZoom<r&&(this.lastIntegerZoom=r,this.lastIntegerZoomTime=e),t!==this.lastZoom&&(this.lastZoom=t,this.lastFloorZoom=r,!0))};var Kn={"Latin-1 Supplement":function(t){return t>=128&&t<=255},Arabic:function(t){return t>=1536&&t<=1791},"Arabic Supplement":function(t){return t>=1872&&t<=1919},"Arabic Extended-A":function(t){return t>=2208&&t<=2303},"Hangul Jamo":function(t){return t>=4352&&t<=4607},"Unified Canadian Aboriginal Syllabics":function(t){return t>=5120&&t<=5759},Khmer:function(t){return t>=6016&&t<=6143},"Unified Canadian Aboriginal Syllabics Extended":function(t){return t>=6320&&t<=6399},"General Punctuation":function(t){return t>=8192&&t<=8303},"Letterlike Symbols":function(t){return t>=8448&&t<=8527},"Number Forms":function(t){return t>=8528&&t<=8591},"Miscellaneous Technical":function(t){return t>=8960&&t<=9215},"Control Pictures":function(t){return t>=9216&&t<=9279},"Optical Character Recognition":function(t){return t>=9280&&t<=9311},"Enclosed Alphanumerics":function(t){return t>=9312&&t<=9471},"Geometric Shapes":function(t){return t>=9632&&t<=9727},"Miscellaneous Symbols":function(t){return t>=9728&&t<=9983},"Miscellaneous Symbols and Arrows":function(t){return t>=11008&&t<=11263},"CJK Radicals Supplement":function(t){return t>=11904&&t<=12031},"Kangxi Radicals":function(t){return t>=12032&&t<=12255},"Ideographic Description Characters":function(t){return t>=12272&&t<=12287},"CJK Symbols and Punctuation":function(t){return t>=12288&&t<=12351},Hiragana:function(t){return t>=12352&&t<=12447},Katakana:function(t){return t>=12448&&t<=12543},Bopomofo:function(t){return t>=12544&&t<=12591},"Hangul Compatibility Jamo":function(t){return t>=12592&&t<=12687},Kanbun:function(t){return t>=12688&&t<=12703},"Bopomofo Extended":function(t){return t>=12704&&t<=12735},"CJK Strokes":function(t){return t>=12736&&t<=12783},"Katakana Phonetic Extensions":function(t){return t>=12784&&t<=12799},"Enclosed CJK Letters and Months":function(t){return t>=12800&&t<=13055},"CJK Compatibility":function(t){return t>=13056&&t<=13311},"CJK Unified Ideographs Extension A":function(t){return t>=13312&&t<=19903},"Yijing Hexagram Symbols":function(t){return t>=19904&&t<=19967},"CJK Unified Ideographs":function(t){return t>=19968&&t<=40959},"Yi Syllables":function(t){return t>=40960&&t<=42127},"Yi Radicals":function(t){return t>=42128&&t<=42191},"Hangul Jamo Extended-A":function(t){return t>=43360&&t<=43391},"Hangul Syllables":function(t){return t>=44032&&t<=55215},"Hangul Jamo Extended-B":function(t){return t>=55216&&t<=55295},"Private Use Area":function(t){return t>=57344&&t<=63743},"CJK Compatibility Ideographs":function(t){return t>=63744&&t<=64255},"Arabic Presentation Forms-A":function(t){return t>=64336&&t<=65023},"Vertical Forms":function(t){return t>=65040&&t<=65055},"CJK Compatibility Forms":function(t){return t>=65072&&t<=65103},"Small Form Variants":function(t){return t>=65104&&t<=65135},"Arabic Presentation Forms-B":function(t){return t>=65136&&t<=65279},"Halfwidth and Fullwidth Forms":function(t){return t>=65280&&t<=65519}};function Gn(t){for(var e=0,r=t;e<r.length;e+=1)if(Zn(r[e].charCodeAt(0)))return !0;return !1}function Zn(t){return !(746!==t&&747!==t&&(t<4352||!(Kn["Bopomofo Extended"](t)||Kn.Bopomofo(t)||Kn["CJK Compatibility Forms"](t)&&!(t>=65097&&t<=65103)||Kn["CJK Compatibility Ideographs"](t)||Kn["CJK Compatibility"](t)||Kn["CJK Radicals Supplement"](t)||Kn["CJK Strokes"](t)||!(!Kn["CJK Symbols and Punctuation"](t)||t>=12296&&t<=12305||t>=12308&&t<=12319||12336===t)||Kn["CJK Unified Ideographs Extension A"](t)||Kn["CJK Unified Ideographs"](t)||Kn["Enclosed CJK Letters and Months"](t)||Kn["Hangul Compatibility Jamo"](t)||Kn["Hangul Jamo Extended-A"](t)||Kn["Hangul Jamo Extended-B"](t)||Kn["Hangul Jamo"](t)||Kn["Hangul Syllables"](t)||Kn.Hiragana(t)||Kn["Ideographic Description Characters"](t)||Kn.Kanbun(t)||Kn["Kangxi Radicals"](t)||Kn["Katakana Phonetic Extensions"](t)||Kn.Katakana(t)&&12540!==t||!(!Kn["Halfwidth and Fullwidth Forms"](t)||65288===t||65289===t||65293===t||t>=65306&&t<=65310||65339===t||65341===t||65343===t||t>=65371&&t<=65503||65507===t||t>=65512&&t<=65519)||!(!Kn["Small Form Variants"](t)||t>=65112&&t<=65118||t>=65123&&t<=65126)||Kn["Unified Canadian Aboriginal Syllabics"](t)||Kn["Unified Canadian Aboriginal Syllabics Extended"](t)||Kn["Vertical Forms"](t)||Kn["Yijing Hexagram Symbols"](t)||Kn["Yi Syllables"](t)||Kn["Yi Radicals"](t))))}function Xn(t){return !(Zn(t)||function(t){return !!(Kn["Latin-1 Supplement"](t)&&(167===t||169===t||174===t||177===t||188===t||189===t||190===t||215===t||247===t)||Kn["General Punctuation"](t)&&(8214===t||8224===t||8225===t||8240===t||8241===t||8251===t||8252===t||8258===t||8263===t||8264===t||8265===t||8273===t)||Kn["Letterlike Symbols"](t)||Kn["Number Forms"](t)||Kn["Miscellaneous Technical"](t)&&(t>=8960&&t<=8967||t>=8972&&t<=8991||t>=8996&&t<=9e3||9003===t||t>=9085&&t<=9114||t>=9150&&t<=9165||9167===t||t>=9169&&t<=9179||t>=9186&&t<=9215)||Kn["Control Pictures"](t)&&9251!==t||Kn["Optical Character Recognition"](t)||Kn["Enclosed Alphanumerics"](t)||Kn["Geometric Shapes"](t)||Kn["Miscellaneous Symbols"](t)&&!(t>=9754&&t<=9759)||Kn["Miscellaneous Symbols and Arrows"](t)&&(t>=11026&&t<=11055||t>=11088&&t<=11097||t>=11192&&t<=11243)||Kn["CJK Symbols and Punctuation"](t)||Kn.Katakana(t)||Kn["Private Use Area"](t)||Kn["CJK Compatibility Forms"](t)||Kn["Small Form Variants"](t)||Kn["Halfwidth and Fullwidth Forms"](t)||8734===t||8756===t||8757===t||t>=9984&&t<=10087||t>=10102&&t<=10131||65532===t||65533===t)}(t))}function Jn(t){return t>=1424&&t<=2303||Kn["Arabic Presentation Forms-A"](t)||Kn["Arabic Presentation Forms-B"](t)}function Hn(t,e){return !(!e&&Jn(t)||t>=2304&&t<=3583||t>=3840&&t<=4255||Kn.Khmer(t))}function Yn(t){for(var e=0,r=t;e<r.length;e+=1)if(Jn(r[e].charCodeAt(0)))return !0;return !1}var $n=null,Wn="unavailable",Qn=null,ti=function(t){t&&"string"==typeof t&&t.indexOf("NetworkError")>-1&&(Wn="error"),$n&&$n(t);};function ei(){ri.fire(new kt("pluginStateChange",{pluginStatus:Wn,pluginURL:Qn}));}var ri=new zt,ni=function(){return Wn},ii=function(){if("deferred"!==Wn||!Qn)throw new Error("rtl-text-plugin cannot be downloaded unless a pluginURL is specified");Wn="loading",ei(),Qn&&bt({url:Qn},(function(t){t?ti(t):(Wn="loaded",ei());}));},ai={applyArabicShaping:null,processBidirectionalText:null,processStyledBidirectionalText:null,isLoaded:function(){return "loaded"===Wn||null!=ai.applyArabicShaping},isLoading:function(){return "loading"===Wn},setState:function(t){Wn=t.pluginStatus,Qn=t.pluginURL;},isParsed:function(){return null!=ai.applyArabicShaping&&null!=ai.processBidirectionalText&&null!=ai.processStyledBidirectionalText},getPluginURL:function(){return Qn}},oi=function(t,e){this.zoom=t,e?(this.now=e.now,this.fadeDuration=e.fadeDuration,this.zoomHistory=e.zoomHistory,this.transition=e.transition):(this.now=0,this.fadeDuration=0,this.zoomHistory=new Nn,this.transition={});};oi.prototype.isSupportedScript=function(t){return function(t,e){for(var r=0,n=t;r<n.length;r+=1)if(!Hn(n[r].charCodeAt(0),e))return !1;return !0}(t,ai.isLoaded())},oi.prototype.crossFadingFactor=function(){return 0===this.fadeDuration?1:Math.min((this.now-this.zoomHistory.lastIntegerZoomTime)/this.fadeDuration,1)},oi.prototype.getCrossfadeParameters=function(){var t=this.zoom,e=t-Math.floor(t),r=this.crossFadingFactor();return t>this.zoomHistory.lastIntegerZoom?{fromScale:2,toScale:1,t:e+(1-e)*r}:{fromScale:.5,toScale:1,t:1-(1-r)*e}};var si=function(t,e){this.property=t,this.value=e,this.expression=function(t,e){if(Dr(t))return new Hr(t,e);if(Kr(t)){var r=Jr(t,e);if("error"===r.result)throw new Error(r.value.map((function(t){return t.key+": "+t.message})).join(", "));return r.value}var n=t;return "string"==typeof t&&"color"===e.type&&(n=Qt.parse(t)),{kind:"constant",evaluate:function(){return n}}}(void 0===e?t.specification.default:e,t.specification);};si.prototype.isDataDriven=function(){return "source"===this.expression.kind||"composite"===this.expression.kind},si.prototype.possiblyEvaluate=function(t,e,r){return this.property.possiblyEvaluate(this,t,e,r)};var ui=function(t){this.property=t,this.value=new si(t,void 0);};ui.prototype.transitioned=function(t,e){return new pi(this.property,this.value,e,h({},t.transition,this.transition),t.now)},ui.prototype.untransitioned=function(){return new pi(this.property,this.value,null,{},0)};var li=function(t){this._properties=t,this._values=Object.create(t.defaultTransitionablePropertyValues);};li.prototype.getValue=function(t){return w(this._values[t].value.value)},li.prototype.setValue=function(t,e){this._values.hasOwnProperty(t)||(this._values[t]=new ui(this._values[t].property)),this._values[t].value=new si(this._values[t].property,null===e?void 0:w(e));},li.prototype.getTransition=function(t){return w(this._values[t].transition)},li.prototype.setTransition=function(t,e){this._values.hasOwnProperty(t)||(this._values[t]=new ui(this._values[t].property)),this._values[t].transition=w(e)||void 0;},li.prototype.serialize=function(){for(var t={},e=0,r=Object.keys(this._values);e<r.length;e+=1){var n=r[e],i=this.getValue(n);void 0!==i&&(t[n]=i);var a=this.getTransition(n);void 0!==a&&(t[n+"-transition"]=a);}return t},li.prototype.transitioned=function(t,e){for(var r=new ci(this._properties),n=0,i=Object.keys(this._values);n<i.length;n+=1){var a=i[n];r._values[a]=this._values[a].transitioned(t,e._values[a]);}return r},li.prototype.untransitioned=function(){for(var t=new ci(this._properties),e=0,r=Object.keys(this._values);e<r.length;e+=1){var n=r[e];t._values[n]=this._values[n].untransitioned();}return t};var pi=function(t,e,r,n,i){this.property=t,this.value=e,this.begin=i+n.delay||0,this.end=this.begin+n.duration||0,t.specification.transition&&(n.delay||n.duration)&&(this.prior=r);};pi.prototype.possiblyEvaluate=function(t,e,r){var n=t.now||0,i=this.value.possiblyEvaluate(t,e,r),a=this.prior;if(a){if(n>this.end)return this.prior=null,i;if(this.value.isDataDriven())return this.prior=null,i;if(n<this.begin)return a.possiblyEvaluate(t,e,r);var o=(n-this.begin)/(this.end-this.begin);return this.property.interpolate(a.possiblyEvaluate(t,e,r),i,function(t){if(t<=0)return 0;if(t>=1)return 1;var e=t*t,r=e*t;return 4*(t<.5?r:3*(t-e)+r-.75)}(o))}return i};var ci=function(t){this._properties=t,this._values=Object.create(t.defaultTransitioningPropertyValues);};ci.prototype.possiblyEvaluate=function(t,e,r){for(var n=new yi(this._properties),i=0,a=Object.keys(this._values);i<a.length;i+=1){var o=a[i];n._values[o]=this._values[o].possiblyEvaluate(t,e,r);}return n},ci.prototype.hasTransition=function(){for(var t=0,e=Object.keys(this._values);t<e.length;t+=1)if(this._values[e[t]].prior)return !0;return !1};var hi=function(t){this._properties=t,this._values=Object.create(t.defaultPropertyValues);};hi.prototype.getValue=function(t){return w(this._values[t].value)},hi.prototype.setValue=function(t,e){this._values[t]=new si(this._values[t].property,null===e?void 0:w(e));},hi.prototype.serialize=function(){for(var t={},e=0,r=Object.keys(this._values);e<r.length;e+=1){var n=r[e],i=this.getValue(n);void 0!==i&&(t[n]=i);}return t},hi.prototype.possiblyEvaluate=function(t,e,r){for(var n=new yi(this._properties),i=0,a=Object.keys(this._values);i<a.length;i+=1){var o=a[i];n._values[o]=this._values[o].possiblyEvaluate(t,e,r);}return n};var fi=function(t,e,r){this.property=t,this.value=e,this.parameters=r;};fi.prototype.isConstant=function(){return "constant"===this.value.kind},fi.prototype.constantOr=function(t){return "constant"===this.value.kind?this.value.value:t},fi.prototype.evaluate=function(t,e,r,n){return this.property.evaluate(this.value,this.parameters,t,e,r,n)};var yi=function(t){this._properties=t,this._values=Object.create(t.defaultPossiblyEvaluatedValues);};yi.prototype.get=function(t){return this._values[t]};var di=function(t){this.specification=t;};di.prototype.possiblyEvaluate=function(t,e){return t.expression.evaluate(e)},di.prototype.interpolate=function(t,e,r){var n=Ke[this.specification.type];return n?n(t,e,r):t};var mi=function(t,e){this.specification=t,this.overrides=e;};mi.prototype.possiblyEvaluate=function(t,e,r,n){return new fi(this,"constant"===t.expression.kind||"camera"===t.expression.kind?{kind:"constant",value:t.expression.evaluate(e,null,{},r,n)}:t.expression,e)},mi.prototype.interpolate=function(t,e,r){if("constant"!==t.value.kind||"constant"!==e.value.kind)return t;if(void 0===t.value.value||void 0===e.value.value)return new fi(this,{kind:"constant",value:void 0},t.parameters);var n=Ke[this.specification.type];return n?new fi(this,{kind:"constant",value:n(t.value.value,e.value.value,r)},t.parameters):t},mi.prototype.evaluate=function(t,e,r,n,i,a){return "constant"===t.kind?t.value:t.evaluate(e,r,n,i,a)};var vi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.possiblyEvaluate=function(t,e,r,n){if(void 0===t.value)return new fi(this,{kind:"constant",value:void 0},e);if("constant"===t.expression.kind){var i=t.expression.evaluate(e,null,{},r,n),a="resolvedImage"===t.property.specification.type&&"string"!=typeof i?i.name:i,o=this._calculate(a,a,a,e);return new fi(this,{kind:"constant",value:o},e)}if("camera"===t.expression.kind){var s=this._calculate(t.expression.evaluate({zoom:e.zoom-1}),t.expression.evaluate({zoom:e.zoom}),t.expression.evaluate({zoom:e.zoom+1}),e);return new fi(this,{kind:"constant",value:s},e)}return new fi(this,t.expression,e)},e.prototype.evaluate=function(t,e,r,n,i,a){if("source"===t.kind){var o=t.evaluate(e,r,n,i,a);return this._calculate(o,o,o,e)}return "composite"===t.kind?this._calculate(t.evaluate({zoom:Math.floor(e.zoom)-1},r,n),t.evaluate({zoom:Math.floor(e.zoom)},r,n),t.evaluate({zoom:Math.floor(e.zoom)+1},r,n),e):t.value},e.prototype._calculate=function(t,e,r,n){return n.zoom>n.zoomHistory.lastIntegerZoom?{from:t,to:e}:{from:r,to:e}},e.prototype.interpolate=function(t){return t},e}(mi),gi=function(t){this.specification=t;};gi.prototype.possiblyEvaluate=function(t,e,r,n){if(void 0!==t.value){if("constant"===t.expression.kind){var i=t.expression.evaluate(e,null,{},r,n);return this._calculate(i,i,i,e)}return this._calculate(t.expression.evaluate(new oi(Math.floor(e.zoom-1),e)),t.expression.evaluate(new oi(Math.floor(e.zoom),e)),t.expression.evaluate(new oi(Math.floor(e.zoom+1),e)),e)}},gi.prototype._calculate=function(t,e,r,n){return n.zoom>n.zoomHistory.lastIntegerZoom?{from:t,to:e}:{from:r,to:e}},gi.prototype.interpolate=function(t){return t};var xi=function(t){this.specification=t;};xi.prototype.possiblyEvaluate=function(t,e,r,n){return !!t.expression.evaluate(e,null,{},r,n)},xi.prototype.interpolate=function(){return !1};var bi=function(t){for(var e in this.properties=t,this.defaultPropertyValues={},this.defaultTransitionablePropertyValues={},this.defaultTransitioningPropertyValues={},this.defaultPossiblyEvaluatedValues={},this.overridableProperties=[],t){var r=t[e];r.specification.overridable&&this.overridableProperties.push(e);var n=this.defaultPropertyValues[e]=new si(r,void 0),i=this.defaultTransitionablePropertyValues[e]=new ui(r);this.defaultTransitioningPropertyValues[e]=i.untransitioned(),this.defaultPossiblyEvaluatedValues[e]=n.possiblyEvaluate({});}};Ln("DataDrivenProperty",mi),Ln("DataConstantProperty",di),Ln("CrossFadedDataDrivenProperty",vi),Ln("CrossFadedProperty",gi),Ln("ColorRampProperty",xi);var wi=function(t){function e(e,r){if(t.call(this),this.id=e.id,this.type=e.type,this._featureFilter={filter:function(){return !0},needGeometry:!1},"custom"!==e.type&&(this.metadata=(e=e).metadata,this.minzoom=e.minzoom,this.maxzoom=e.maxzoom,"background"!==e.type&&(this.source=e.source,this.sourceLayer=e["source-layer"],this.filter=e.filter),r.layout&&(this._unevaluatedLayout=new hi(r.layout)),r.paint)){for(var n in this._transitionablePaint=new li(r.paint),e.paint)this.setPaintProperty(n,e.paint[n],{validate:!1});for(var i in e.layout)this.setLayoutProperty(i,e.layout[i],{validate:!1});this._transitioningPaint=this._transitionablePaint.untransitioned(),this.paint=new yi(r.paint);}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getCrossfadeParameters=function(){return this._crossfadeParameters},e.prototype.getLayoutProperty=function(t){return "visibility"===t?this.visibility:this._unevaluatedLayout.getValue(t)},e.prototype.setLayoutProperty=function(t,e,r){void 0===r&&(r={}),null!=e&&this._validate(Pn,"layers."+this.id+".layout."+t,t,e,r)||("visibility"!==t?this._unevaluatedLayout.setValue(t,e):this.visibility=e);},e.prototype.getPaintProperty=function(t){return g(t,"-transition")?this._transitionablePaint.getTransition(t.slice(0,-"-transition".length)):this._transitionablePaint.getValue(t)},e.prototype.setPaintProperty=function(t,e,r){if(void 0===r&&(r={}),null!=e&&this._validate(En,"layers."+this.id+".paint."+t,t,e,r))return !1;if(g(t,"-transition"))return this._transitionablePaint.setTransition(t.slice(0,-"-transition".length),e||void 0),!1;var n=this._transitionablePaint._values[t],i="cross-faded-data-driven"===n.property.specification["property-type"],a=n.value.isDataDriven(),o=n.value;this._transitionablePaint.setValue(t,e),this._handleSpecialPaintPropertyUpdate(t);var s=this._transitionablePaint._values[t].value;return s.isDataDriven()||a||i||this._handleOverridablePaintPropertyUpdate(t,o,s)},e.prototype._handleSpecialPaintPropertyUpdate=function(t){},e.prototype._handleOverridablePaintPropertyUpdate=function(t,e,r){return !1},e.prototype.isHidden=function(t){return !!(this.minzoom&&t<this.minzoom)||!!(this.maxzoom&&t>=this.maxzoom)||"none"===this.visibility},e.prototype.updateTransitions=function(t){this._transitioningPaint=this._transitionablePaint.transitioned(t,this._transitioningPaint);},e.prototype.hasTransition=function(){return this._transitioningPaint.hasTransition()},e.prototype.recalculate=function(t,e){t.getCrossfadeParameters&&(this._crossfadeParameters=t.getCrossfadeParameters()),this._unevaluatedLayout&&(this.layout=this._unevaluatedLayout.possiblyEvaluate(t,void 0,e)),this.paint=this._transitioningPaint.possiblyEvaluate(t,void 0,e);},e.prototype.serialize=function(){var t={id:this.id,type:this.type,source:this.source,"source-layer":this.sourceLayer,metadata:this.metadata,minzoom:this.minzoom,maxzoom:this.maxzoom,filter:this.filter,layout:this._unevaluatedLayout&&this._unevaluatedLayout.serialize(),paint:this._transitionablePaint&&this._transitionablePaint.serialize()};return this.visibility&&(t.layout=t.layout||{},t.layout.visibility=this.visibility),b(t,(function(t,e){return !(void 0===t||"layout"===e&&!Object.keys(t).length||"paint"===e&&!Object.keys(t).length)}))},e.prototype._validate=function(t,e,r,n,i){return void 0===i&&(i={}),(!i||!1!==i.validate)&&Mn(this,t.call(zn,{key:e,layerType:this.type,objectKey:r,value:n,styleSpec:Ct,style:{glyphs:!0,sprite:!0}}))},e.prototype.is3D=function(){return !1},e.prototype.isTileClipped=function(){return !1},e.prototype.hasOffscreenPass=function(){return !1},e.prototype.resize=function(){},e.prototype.isStateDependent=function(){for(var t in this.paint._values){var e=this.paint.get(t);if(e instanceof fi&&Br(e.property.specification)&&("source"===e.value.kind||"composite"===e.value.kind)&&e.value.isStateDependent)return !0}return !1},e}(zt),_i={Int8:Int8Array,Uint8:Uint8Array,Int16:Int16Array,Uint16:Uint16Array,Int32:Int32Array,Uint32:Uint32Array,Float32:Float32Array},Ai=function(t,e){this._structArray=t,this._pos1=e*this.size,this._pos2=this._pos1/2,this._pos4=this._pos1/4,this._pos8=this._pos1/8;},Si=function(){this.isTransferred=!1,this.capacity=-1,this.resize(0);};function ki(t,e){void 0===e&&(e=1);var r=0,n=0;return {members:t.map((function(t){var i=_i[t.type].BYTES_PER_ELEMENT,a=r=Ii(r,Math.max(e,i)),o=t.components||1;return n=Math.max(n,i),r+=i*o,{name:t.name,type:t.type,components:o,offset:a}})),size:Ii(r,Math.max(n,e)),alignment:e}}function Ii(t,e){return Math.ceil(t/e)*e}Si.serialize=function(t,e){return t._trim(),e&&(t.isTransferred=!0,e.push(t.arrayBuffer)),{length:t.length,arrayBuffer:t.arrayBuffer}},Si.deserialize=function(t){var e=Object.create(this.prototype);return e.arrayBuffer=t.arrayBuffer,e.length=t.length,e.capacity=t.arrayBuffer.byteLength/e.bytesPerElement,e._refreshViews(),e},Si.prototype._trim=function(){this.length!==this.capacity&&(this.capacity=this.length,this.arrayBuffer=this.arrayBuffer.slice(0,this.length*this.bytesPerElement),this._refreshViews());},Si.prototype.clear=function(){this.length=0;},Si.prototype.resize=function(t){this.reserve(t),this.length=t;},Si.prototype.reserve=function(t){if(t>this.capacity){this.capacity=Math.max(t,Math.floor(5*this.capacity),128),this.arrayBuffer=new ArrayBuffer(this.capacity*this.bytesPerElement);var e=this.uint8;this._refreshViews(),e&&this.uint8.set(e);}},Si.prototype._refreshViews=function(){throw new Error("_refreshViews() must be implemented by each concrete StructArray layout")};var zi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e){var r=this.length;return this.resize(r+1),this.emplace(r,t,e)},e.prototype.emplace=function(t,e,r){var n=2*t;return this.int16[n+0]=e,this.int16[n+1]=r,t},e}(Si);zi.prototype.bytesPerElement=4,Ln("StructArrayLayout2i4",zi);var Ci=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n){var i=this.length;return this.resize(i+1),this.emplace(i,t,e,r,n)},e.prototype.emplace=function(t,e,r,n,i){var a=4*t;return this.int16[a+0]=e,this.int16[a+1]=r,this.int16[a+2]=n,this.int16[a+3]=i,t},e}(Si);Ci.prototype.bytesPerElement=8,Ln("StructArrayLayout4i8",Ci);var Ei=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a){var o=this.length;return this.resize(o+1),this.emplace(o,t,e,r,n,i,a)},e.prototype.emplace=function(t,e,r,n,i,a,o){var s=6*t;return this.int16[s+0]=e,this.int16[s+1]=r,this.int16[s+2]=n,this.int16[s+3]=i,this.int16[s+4]=a,this.int16[s+5]=o,t},e}(Si);Ei.prototype.bytesPerElement=12,Ln("StructArrayLayout2i4i12",Ei);var Pi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a){var o=this.length;return this.resize(o+1),this.emplace(o,t,e,r,n,i,a)},e.prototype.emplace=function(t,e,r,n,i,a,o){var s=4*t,u=8*t;return this.int16[s+0]=e,this.int16[s+1]=r,this.uint8[u+4]=n,this.uint8[u+5]=i,this.uint8[u+6]=a,this.uint8[u+7]=o,t},e}(Si);Pi.prototype.bytesPerElement=8,Ln("StructArrayLayout2i4ub8",Pi);var Mi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e){var r=this.length;return this.resize(r+1),this.emplace(r,t,e)},e.prototype.emplace=function(t,e,r){var n=2*t;return this.float32[n+0]=e,this.float32[n+1]=r,t},e}(Si);Mi.prototype.bytesPerElement=8,Ln("StructArrayLayout2f8",Mi);var Bi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s,u,l){var p=this.length;return this.resize(p+1),this.emplace(p,t,e,r,n,i,a,o,s,u,l)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u,l,p){var c=10*t;return this.uint16[c+0]=e,this.uint16[c+1]=r,this.uint16[c+2]=n,this.uint16[c+3]=i,this.uint16[c+4]=a,this.uint16[c+5]=o,this.uint16[c+6]=s,this.uint16[c+7]=u,this.uint16[c+8]=l,this.uint16[c+9]=p,t},e}(Si);Bi.prototype.bytesPerElement=20,Ln("StructArrayLayout10ui20",Bi);var Ti=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s,u,l,p,c){var h=this.length;return this.resize(h+1),this.emplace(h,t,e,r,n,i,a,o,s,u,l,p,c)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u,l,p,c,h){var f=12*t;return this.int16[f+0]=e,this.int16[f+1]=r,this.int16[f+2]=n,this.int16[f+3]=i,this.uint16[f+4]=a,this.uint16[f+5]=o,this.uint16[f+6]=s,this.uint16[f+7]=u,this.int16[f+8]=l,this.int16[f+9]=p,this.int16[f+10]=c,this.int16[f+11]=h,t},e}(Si);Ti.prototype.bytesPerElement=24,Ln("StructArrayLayout4i4ui4i24",Ti);var Vi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r){var n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)},e.prototype.emplace=function(t,e,r,n){var i=3*t;return this.float32[i+0]=e,this.float32[i+1]=r,this.float32[i+2]=n,t},e}(Si);Vi.prototype.bytesPerElement=12,Ln("StructArrayLayout3f12",Vi);var Fi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t){var e=this.length;return this.resize(e+1),this.emplace(e,t)},e.prototype.emplace=function(t,e){return this.uint32[1*t+0]=e,t},e}(Si);Fi.prototype.bytesPerElement=4,Ln("StructArrayLayout1ul4",Fi);var Di=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s,u){var l=this.length;return this.resize(l+1),this.emplace(l,t,e,r,n,i,a,o,s,u)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u,l){var p=10*t,c=5*t;return this.int16[p+0]=e,this.int16[p+1]=r,this.int16[p+2]=n,this.int16[p+3]=i,this.int16[p+4]=a,this.int16[p+5]=o,this.uint32[c+3]=s,this.uint16[p+8]=u,this.uint16[p+9]=l,t},e}(Si);Di.prototype.bytesPerElement=20,Ln("StructArrayLayout6i1ul2ui20",Di);var Li=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a){var o=this.length;return this.resize(o+1),this.emplace(o,t,e,r,n,i,a)},e.prototype.emplace=function(t,e,r,n,i,a,o){var s=6*t;return this.int16[s+0]=e,this.int16[s+1]=r,this.int16[s+2]=n,this.int16[s+3]=i,this.int16[s+4]=a,this.int16[s+5]=o,t},e}(Si);Li.prototype.bytesPerElement=12,Ln("StructArrayLayout2i2i2i12",Li);var Ri=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i){var a=this.length;return this.resize(a+1),this.emplace(a,t,e,r,n,i)},e.prototype.emplace=function(t,e,r,n,i,a){var o=4*t,s=8*t;return this.float32[o+0]=e,this.float32[o+1]=r,this.float32[o+2]=n,this.int16[s+6]=i,this.int16[s+7]=a,t},e}(Si);Ri.prototype.bytesPerElement=16,Ln("StructArrayLayout2f1f2i16",Ri);var Oi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n){var i=this.length;return this.resize(i+1),this.emplace(i,t,e,r,n)},e.prototype.emplace=function(t,e,r,n,i){var a=12*t,o=3*t;return this.uint8[a+0]=e,this.uint8[a+1]=r,this.float32[o+1]=n,this.float32[o+2]=i,t},e}(Si);Oi.prototype.bytesPerElement=12,Ln("StructArrayLayout2ub2f12",Oi);var Ui=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r){var n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)},e.prototype.emplace=function(t,e,r,n){var i=3*t;return this.uint16[i+0]=e,this.uint16[i+1]=r,this.uint16[i+2]=n,t},e}(Si);Ui.prototype.bytesPerElement=6,Ln("StructArrayLayout3ui6",Ui);var ji=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s,u,l,p,c,h,f,y,d,m){var v=this.length;return this.resize(v+1),this.emplace(v,t,e,r,n,i,a,o,s,u,l,p,c,h,f,y,d,m)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u,l,p,c,h,f,y,d,m,v){var g=24*t,x=12*t,b=48*t;return this.int16[g+0]=e,this.int16[g+1]=r,this.uint16[g+2]=n,this.uint16[g+3]=i,this.uint32[x+2]=a,this.uint32[x+3]=o,this.uint32[x+4]=s,this.uint16[g+10]=u,this.uint16[g+11]=l,this.uint16[g+12]=p,this.float32[x+7]=c,this.float32[x+8]=h,this.uint8[b+36]=f,this.uint8[b+37]=y,this.uint8[b+38]=d,this.uint32[x+10]=m,this.int16[g+22]=v,t},e}(Si);ji.prototype.bytesPerElement=48,Ln("StructArrayLayout2i2ui3ul3ui2f3ub1ul1i48",ji);var qi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s,u,l,p,c,h,f,y,d,m,v,g,x,b,w,_,A,S,k,I,z){var C=this.length;return this.resize(C+1),this.emplace(C,t,e,r,n,i,a,o,s,u,l,p,c,h,f,y,d,m,v,g,x,b,w,_,A,S,k,I,z)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u,l,p,c,h,f,y,d,m,v,g,x,b,w,_,A,S,k,I,z,C){var E=34*t,P=17*t;return this.int16[E+0]=e,this.int16[E+1]=r,this.int16[E+2]=n,this.int16[E+3]=i,this.int16[E+4]=a,this.int16[E+5]=o,this.int16[E+6]=s,this.int16[E+7]=u,this.uint16[E+8]=l,this.uint16[E+9]=p,this.uint16[E+10]=c,this.uint16[E+11]=h,this.uint16[E+12]=f,this.uint16[E+13]=y,this.uint16[E+14]=d,this.uint16[E+15]=m,this.uint16[E+16]=v,this.uint16[E+17]=g,this.uint16[E+18]=x,this.uint16[E+19]=b,this.uint16[E+20]=w,this.uint16[E+21]=_,this.uint16[E+22]=A,this.uint32[P+12]=S,this.float32[P+13]=k,this.float32[P+14]=I,this.float32[P+15]=z,this.float32[P+16]=C,t},e}(Si);qi.prototype.bytesPerElement=68,Ln("StructArrayLayout8i15ui1ul4f68",qi);var Ni=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t){var e=this.length;return this.resize(e+1),this.emplace(e,t)},e.prototype.emplace=function(t,e){return this.float32[1*t+0]=e,t},e}(Si);Ni.prototype.bytesPerElement=4,Ln("StructArrayLayout1f4",Ni);var Ki=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r){var n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)},e.prototype.emplace=function(t,e,r,n){var i=3*t;return this.int16[i+0]=e,this.int16[i+1]=r,this.int16[i+2]=n,t},e}(Si);Ki.prototype.bytesPerElement=6,Ln("StructArrayLayout3i6",Ki);var Gi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r){var n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)},e.prototype.emplace=function(t,e,r,n){var i=4*t;return this.uint32[2*t+0]=e,this.uint16[i+2]=r,this.uint16[i+3]=n,t},e}(Si);Gi.prototype.bytesPerElement=8,Ln("StructArrayLayout1ul2ui8",Gi);var Zi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e){var r=this.length;return this.resize(r+1),this.emplace(r,t,e)},e.prototype.emplace=function(t,e,r){var n=2*t;return this.uint16[n+0]=e,this.uint16[n+1]=r,t},e}(Si);Zi.prototype.bytesPerElement=4,Ln("StructArrayLayout2ui4",Zi);var Xi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t){var e=this.length;return this.resize(e+1),this.emplace(e,t)},e.prototype.emplace=function(t,e){return this.uint16[1*t+0]=e,t},e}(Si);Xi.prototype.bytesPerElement=2,Ln("StructArrayLayout1ui2",Xi);var Ji=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n){var i=this.length;return this.resize(i+1),this.emplace(i,t,e,r,n)},e.prototype.emplace=function(t,e,r,n,i){var a=4*t;return this.float32[a+0]=e,this.float32[a+1]=r,this.float32[a+2]=n,this.float32[a+3]=i,t},e}(Si);Ji.prototype.bytesPerElement=16,Ln("StructArrayLayout4f16",Ji);var Hi=function(t){function e(){t.apply(this,arguments);}t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e;var r={anchorPointX:{configurable:!0},anchorPointY:{configurable:!0},x1:{configurable:!0},y1:{configurable:!0},x2:{configurable:!0},y2:{configurable:!0},featureIndex:{configurable:!0},sourceLayerIndex:{configurable:!0},bucketIndex:{configurable:!0},anchorPoint:{configurable:!0}};return r.anchorPointX.get=function(){return this._structArray.int16[this._pos2+0]},r.anchorPointY.get=function(){return this._structArray.int16[this._pos2+1]},r.x1.get=function(){return this._structArray.int16[this._pos2+2]},r.y1.get=function(){return this._structArray.int16[this._pos2+3]},r.x2.get=function(){return this._structArray.int16[this._pos2+4]},r.y2.get=function(){return this._structArray.int16[this._pos2+5]},r.featureIndex.get=function(){return this._structArray.uint32[this._pos4+3]},r.sourceLayerIndex.get=function(){return this._structArray.uint16[this._pos2+8]},r.bucketIndex.get=function(){return this._structArray.uint16[this._pos2+9]},r.anchorPoint.get=function(){return new i(this.anchorPointX,this.anchorPointY)},Object.defineProperties(e.prototype,r),e}(Ai);Hi.prototype.size=20;var Yi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.get=function(t){return new Hi(this,t)},e}(Di);Ln("CollisionBoxArray",Yi);var $i=function(t){function e(){t.apply(this,arguments);}t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e;var r={anchorX:{configurable:!0},anchorY:{configurable:!0},glyphStartIndex:{configurable:!0},numGlyphs:{configurable:!0},vertexStartIndex:{configurable:!0},lineStartIndex:{configurable:!0},lineLength:{configurable:!0},segment:{configurable:!0},lowerSize:{configurable:!0},upperSize:{configurable:!0},lineOffsetX:{configurable:!0},lineOffsetY:{configurable:!0},writingMode:{configurable:!0},placedOrientation:{configurable:!0},hidden:{configurable:!0},crossTileID:{configurable:!0},associatedIconIndex:{configurable:!0}};return r.anchorX.get=function(){return this._structArray.int16[this._pos2+0]},r.anchorY.get=function(){return this._structArray.int16[this._pos2+1]},r.glyphStartIndex.get=function(){return this._structArray.uint16[this._pos2+2]},r.numGlyphs.get=function(){return this._structArray.uint16[this._pos2+3]},r.vertexStartIndex.get=function(){return this._structArray.uint32[this._pos4+2]},r.lineStartIndex.get=function(){return this._structArray.uint32[this._pos4+3]},r.lineLength.get=function(){return this._structArray.uint32[this._pos4+4]},r.segment.get=function(){return this._structArray.uint16[this._pos2+10]},r.lowerSize.get=function(){return this._structArray.uint16[this._pos2+11]},r.upperSize.get=function(){return this._structArray.uint16[this._pos2+12]},r.lineOffsetX.get=function(){return this._structArray.float32[this._pos4+7]},r.lineOffsetY.get=function(){return this._structArray.float32[this._pos4+8]},r.writingMode.get=function(){return this._structArray.uint8[this._pos1+36]},r.placedOrientation.get=function(){return this._structArray.uint8[this._pos1+37]},r.placedOrientation.set=function(t){this._structArray.uint8[this._pos1+37]=t;},r.hidden.get=function(){return this._structArray.uint8[this._pos1+38]},r.hidden.set=function(t){this._structArray.uint8[this._pos1+38]=t;},r.crossTileID.get=function(){return this._structArray.uint32[this._pos4+10]},r.crossTileID.set=function(t){this._structArray.uint32[this._pos4+10]=t;},r.associatedIconIndex.get=function(){return this._structArray.int16[this._pos2+22]},Object.defineProperties(e.prototype,r),e}(Ai);$i.prototype.size=48;var Wi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.get=function(t){return new $i(this,t)},e}(ji);Ln("PlacedSymbolArray",Wi);var Qi=function(t){function e(){t.apply(this,arguments);}t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e;var r={anchorX:{configurable:!0},anchorY:{configurable:!0},rightJustifiedTextSymbolIndex:{configurable:!0},centerJustifiedTextSymbolIndex:{configurable:!0},leftJustifiedTextSymbolIndex:{configurable:!0},verticalPlacedTextSymbolIndex:{configurable:!0},placedIconSymbolIndex:{configurable:!0},verticalPlacedIconSymbolIndex:{configurable:!0},key:{configurable:!0},textBoxStartIndex:{configurable:!0},textBoxEndIndex:{configurable:!0},verticalTextBoxStartIndex:{configurable:!0},verticalTextBoxEndIndex:{configurable:!0},iconBoxStartIndex:{configurable:!0},iconBoxEndIndex:{configurable:!0},verticalIconBoxStartIndex:{configurable:!0},verticalIconBoxEndIndex:{configurable:!0},featureIndex:{configurable:!0},numHorizontalGlyphVertices:{configurable:!0},numVerticalGlyphVertices:{configurable:!0},numIconVertices:{configurable:!0},numVerticalIconVertices:{configurable:!0},useRuntimeCollisionCircles:{configurable:!0},crossTileID:{configurable:!0},textBoxScale:{configurable:!0},textOffset0:{configurable:!0},textOffset1:{configurable:!0},collisionCircleDiameter:{configurable:!0}};return r.anchorX.get=function(){return this._structArray.int16[this._pos2+0]},r.anchorY.get=function(){return this._structArray.int16[this._pos2+1]},r.rightJustifiedTextSymbolIndex.get=function(){return this._structArray.int16[this._pos2+2]},r.centerJustifiedTextSymbolIndex.get=function(){return this._structArray.int16[this._pos2+3]},r.leftJustifiedTextSymbolIndex.get=function(){return this._structArray.int16[this._pos2+4]},r.verticalPlacedTextSymbolIndex.get=function(){return this._structArray.int16[this._pos2+5]},r.placedIconSymbolIndex.get=function(){return this._structArray.int16[this._pos2+6]},r.verticalPlacedIconSymbolIndex.get=function(){return this._structArray.int16[this._pos2+7]},r.key.get=function(){return this._structArray.uint16[this._pos2+8]},r.textBoxStartIndex.get=function(){return this._structArray.uint16[this._pos2+9]},r.textBoxEndIndex.get=function(){return this._structArray.uint16[this._pos2+10]},r.verticalTextBoxStartIndex.get=function(){return this._structArray.uint16[this._pos2+11]},r.verticalTextBoxEndIndex.get=function(){return this._structArray.uint16[this._pos2+12]},r.iconBoxStartIndex.get=function(){return this._structArray.uint16[this._pos2+13]},r.iconBoxEndIndex.get=function(){return this._structArray.uint16[this._pos2+14]},r.verticalIconBoxStartIndex.get=function(){return this._structArray.uint16[this._pos2+15]},r.verticalIconBoxEndIndex.get=function(){return this._structArray.uint16[this._pos2+16]},r.featureIndex.get=function(){return this._structArray.uint16[this._pos2+17]},r.numHorizontalGlyphVertices.get=function(){return this._structArray.uint16[this._pos2+18]},r.numVerticalGlyphVertices.get=function(){return this._structArray.uint16[this._pos2+19]},r.numIconVertices.get=function(){return this._structArray.uint16[this._pos2+20]},r.numVerticalIconVertices.get=function(){return this._structArray.uint16[this._pos2+21]},r.useRuntimeCollisionCircles.get=function(){return this._structArray.uint16[this._pos2+22]},r.crossTileID.get=function(){return this._structArray.uint32[this._pos4+12]},r.crossTileID.set=function(t){this._structArray.uint32[this._pos4+12]=t;},r.textBoxScale.get=function(){return this._structArray.float32[this._pos4+13]},r.textOffset0.get=function(){return this._structArray.float32[this._pos4+14]},r.textOffset1.get=function(){return this._structArray.float32[this._pos4+15]},r.collisionCircleDiameter.get=function(){return this._structArray.float32[this._pos4+16]},Object.defineProperties(e.prototype,r),e}(Ai);Qi.prototype.size=68;var ta=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.get=function(t){return new Qi(this,t)},e}(qi);Ln("SymbolInstanceArray",ta);var ea=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getoffsetX=function(t){return this.float32[1*t+0]},e}(Ni);Ln("GlyphOffsetArray",ea);var ra=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getx=function(t){return this.int16[3*t+0]},e.prototype.gety=function(t){return this.int16[3*t+1]},e.prototype.gettileUnitDistanceFromAnchor=function(t){return this.int16[3*t+2]},e}(Ki);Ln("SymbolLineVertexArray",ra);var na=function(t){function e(){t.apply(this,arguments);}t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e;var r={featureIndex:{configurable:!0},sourceLayerIndex:{configurable:!0},bucketIndex:{configurable:!0}};return r.featureIndex.get=function(){return this._structArray.uint32[this._pos4+0]},r.sourceLayerIndex.get=function(){return this._structArray.uint16[this._pos2+2]},r.bucketIndex.get=function(){return this._structArray.uint16[this._pos2+3]},Object.defineProperties(e.prototype,r),e}(Ai);na.prototype.size=8;var ia=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.get=function(t){return new na(this,t)},e}(Gi);Ln("FeatureIndexArray",ia);var aa=ki([{name:"a_pos",components:2,type:"Int16"}],4).members,oa=function(t){void 0===t&&(t=[]),this.segments=t;};function sa(t,e){return 256*(t=p(Math.floor(t),0,255))+p(Math.floor(e),0,255)}oa.prototype.prepareSegment=function(t,e,r,n){var i=this.segments[this.segments.length-1];return t>oa.MAX_VERTEX_ARRAY_LENGTH&&A("Max vertices per segment is "+oa.MAX_VERTEX_ARRAY_LENGTH+": bucket requested "+t),(!i||i.vertexLength+t>oa.MAX_VERTEX_ARRAY_LENGTH||i.sortKey!==n)&&(i={vertexOffset:e.length,primitiveOffset:r.length,vertexLength:0,primitiveLength:0},void 0!==n&&(i.sortKey=n),this.segments.push(i)),i},oa.prototype.get=function(){return this.segments},oa.prototype.destroy=function(){for(var t=0,e=this.segments;t<e.length;t+=1){var r=e[t];for(var n in r.vaos)r.vaos[n].destroy();}},oa.simpleSegment=function(t,e,r,n){return new oa([{vertexOffset:t,primitiveOffset:e,vertexLength:r,primitiveLength:n,vaos:{},sortKey:0}])},oa.MAX_VERTEX_ARRAY_LENGTH=Math.pow(2,16)-1,Ln("SegmentVector",oa);var ua=ki([{name:"a_pattern_from",components:4,type:"Uint16"},{name:"a_pattern_to",components:4,type:"Uint16"},{name:"a_pixel_ratio_from",components:1,type:"Uint16"},{name:"a_pixel_ratio_to",components:1,type:"Uint16"}]),la=e((function(t){t.exports=function(t,e){var r,n,i,a,o,s,u,l;for(n=t.length-(r=3&t.length),i=e,o=3432918353,s=461845907,l=0;l<n;)u=255&t.charCodeAt(l)|(255&t.charCodeAt(++l))<<8|(255&t.charCodeAt(++l))<<16|(255&t.charCodeAt(++l))<<24,++l,i=27492+(65535&(a=5*(65535&(i=(i^=u=(65535&(u=(u=(65535&u)*o+(((u>>>16)*o&65535)<<16)&4294967295)<<15|u>>>17))*s+(((u>>>16)*s&65535)<<16)&4294967295)<<13|i>>>19))+((5*(i>>>16)&65535)<<16)&4294967295))+((58964+(a>>>16)&65535)<<16);switch(u=0,r){case 3:u^=(255&t.charCodeAt(l+2))<<16;case 2:u^=(255&t.charCodeAt(l+1))<<8;case 1:i^=u=(65535&(u=(u=(65535&(u^=255&t.charCodeAt(l)))*o+(((u>>>16)*o&65535)<<16)&4294967295)<<15|u>>>17))*s+(((u>>>16)*s&65535)<<16)&4294967295;}return i^=t.length,i=2246822507*(65535&(i^=i>>>16))+((2246822507*(i>>>16)&65535)<<16)&4294967295,i=3266489909*(65535&(i^=i>>>13))+((3266489909*(i>>>16)&65535)<<16)&4294967295,(i^=i>>>16)>>>0};})),pa=e((function(t){t.exports=function(t,e){for(var r,n=t.length,i=e^n,a=0;n>=4;)r=1540483477*(65535&(r=255&t.charCodeAt(a)|(255&t.charCodeAt(++a))<<8|(255&t.charCodeAt(++a))<<16|(255&t.charCodeAt(++a))<<24))+((1540483477*(r>>>16)&65535)<<16),i=1540483477*(65535&i)+((1540483477*(i>>>16)&65535)<<16)^(r=1540483477*(65535&(r^=r>>>24))+((1540483477*(r>>>16)&65535)<<16)),n-=4,++a;switch(n){case 3:i^=(255&t.charCodeAt(a+2))<<16;case 2:i^=(255&t.charCodeAt(a+1))<<8;case 1:i=1540483477*(65535&(i^=255&t.charCodeAt(a)))+((1540483477*(i>>>16)&65535)<<16);}return i=1540483477*(65535&(i^=i>>>13))+((1540483477*(i>>>16)&65535)<<16),(i^=i>>>15)>>>0};})),ca=la,ha=pa;ca.murmur3=la,ca.murmur2=ha;var fa=function(){this.ids=[],this.positions=[],this.indexed=!1;};fa.prototype.add=function(t,e,r,n){this.ids.push(da(t)),this.positions.push(e,r,n);},fa.prototype.getPositions=function(t){for(var e=da(t),r=0,n=this.ids.length-1;r<n;){var i=r+n>>1;this.ids[i]>=e?n=i:r=i+1;}for(var a=[];this.ids[r]===e;)a.push({index:this.positions[3*r],start:this.positions[3*r+1],end:this.positions[3*r+2]}),r++;return a},fa.serialize=function(t,e){var r=new Float64Array(t.ids),n=new Uint32Array(t.positions);return function t(e,r,n,i){for(;n<i;){for(var a=e[n+i>>1],o=n-1,s=i+1;;){do{o++;}while(e[o]<a);do{s--;}while(e[s]>a);if(o>=s)break;ma(e,o,s),ma(r,3*o,3*s),ma(r,3*o+1,3*s+1),ma(r,3*o+2,3*s+2);}s-n<i-s?(t(e,r,n,s),n=s+1):(t(e,r,s+1,i),i=s);}}(r,n,0,r.length-1),e&&e.push(r.buffer,n.buffer),{ids:r,positions:n}},fa.deserialize=function(t){var e=new fa;return e.ids=t.ids,e.positions=t.positions,e.indexed=!0,e};var ya=Math.pow(2,53)-1;function da(t){var e=+t;return !isNaN(e)&&e<=ya?e:ca(String(t))}function ma(t,e,r){var n=t[e];t[e]=t[r],t[r]=n;}Ln("FeaturePositionMap",fa);var va=function(t,e){this.gl=t.gl,this.location=e;},ga=function(t){function e(e,r){t.call(this,e,r),this.current=0;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.set=function(t){this.current!==t&&(this.current=t,this.gl.uniform1i(this.location,t));},e}(va),xa=function(t){function e(e,r){t.call(this,e,r),this.current=0;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.set=function(t){this.current!==t&&(this.current=t,this.gl.uniform1f(this.location,t));},e}(va),ba=function(t){function e(e,r){t.call(this,e,r),this.current=[0,0];}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.set=function(t){t[0]===this.current[0]&&t[1]===this.current[1]||(this.current=t,this.gl.uniform2f(this.location,t[0],t[1]));},e}(va),wa=function(t){function e(e,r){t.call(this,e,r),this.current=[0,0,0];}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.set=function(t){t[0]===this.current[0]&&t[1]===this.current[1]&&t[2]===this.current[2]||(this.current=t,this.gl.uniform3f(this.location,t[0],t[1],t[2]));},e}(va),_a=function(t){function e(e,r){t.call(this,e,r),this.current=[0,0,0,0];}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.set=function(t){t[0]===this.current[0]&&t[1]===this.current[1]&&t[2]===this.current[2]&&t[3]===this.current[3]||(this.current=t,this.gl.uniform4f(this.location,t[0],t[1],t[2],t[3]));},e}(va),Aa=function(t){function e(e,r){t.call(this,e,r),this.current=Qt.transparent;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.set=function(t){t.r===this.current.r&&t.g===this.current.g&&t.b===this.current.b&&t.a===this.current.a||(this.current=t,this.gl.uniform4f(this.location,t.r,t.g,t.b,t.a));},e}(va),Sa=new Float32Array(16),ka=function(t){function e(e,r){t.call(this,e,r),this.current=Sa;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.set=function(t){if(t[12]!==this.current[12]||t[0]!==this.current[0])return this.current=t,void this.gl.uniformMatrix4fv(this.location,!1,t);for(var e=1;e<16;e++)if(t[e]!==this.current[e]){this.current=t,this.gl.uniformMatrix4fv(this.location,!1,t);break}},e}(va);function Ia(t){return [sa(255*t.r,255*t.g),sa(255*t.b,255*t.a)]}var za=function(t,e,r){this.value=t,this.uniformNames=e.map((function(t){return "u_"+t})),this.type=r;};za.prototype.setUniform=function(t,e,r){t.set(r.constantOr(this.value));},za.prototype.getBinding=function(t,e,r){return "color"===this.type?new Aa(t,e):new xa(t,e)};var Ca=function(t,e){this.uniformNames=e.map((function(t){return "u_"+t})),this.patternFrom=null,this.patternTo=null,this.pixelRatioFrom=1,this.pixelRatioTo=1;};Ca.prototype.setConstantPatternPositions=function(t,e){this.pixelRatioFrom=e.pixelRatio,this.pixelRatioTo=t.pixelRatio,this.patternFrom=e.tlbr,this.patternTo=t.tlbr;},Ca.prototype.setUniform=function(t,e,r,n){var i="u_pattern_to"===n?this.patternTo:"u_pattern_from"===n?this.patternFrom:"u_pixel_ratio_to"===n?this.pixelRatioTo:"u_pixel_ratio_from"===n?this.pixelRatioFrom:null;i&&t.set(i);},Ca.prototype.getBinding=function(t,e,r){return "u_pattern"===r.substr(0,9)?new _a(t,e):new xa(t,e)};var Ea=function(t,e,r,n){this.expression=t,this.type=r,this.maxValue=0,this.paintVertexAttributes=e.map((function(t){return {name:"a_"+t,type:"Float32",components:"color"===r?2:1,offset:0}})),this.paintVertexArray=new n;};Ea.prototype.populatePaintArray=function(t,e,r,n,i){var a=this.paintVertexArray.length,o=this.expression.evaluate(new oi(0),e,{},n,[],i);this.paintVertexArray.resize(t),this._setPaintValue(a,t,o);},Ea.prototype.updatePaintArray=function(t,e,r,n){var i=this.expression.evaluate({zoom:0},r,n);this._setPaintValue(t,e,i);},Ea.prototype._setPaintValue=function(t,e,r){if("color"===this.type)for(var n=Ia(r),i=t;i<e;i++)this.paintVertexArray.emplace(i,n[0],n[1]);else {for(var a=t;a<e;a++)this.paintVertexArray.emplace(a,r);this.maxValue=Math.max(this.maxValue,Math.abs(r));}},Ea.prototype.upload=function(t){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer&&this.paintVertexBuffer.buffer?this.paintVertexBuffer.updateData(this.paintVertexArray):this.paintVertexBuffer=t.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent));},Ea.prototype.destroy=function(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();};var Pa=function(t,e,r,n,i,a){this.expression=t,this.uniformNames=e.map((function(t){return "u_"+t+"_t"})),this.type=r,this.useIntegerZoom=n,this.zoom=i,this.maxValue=0,this.paintVertexAttributes=e.map((function(t){return {name:"a_"+t,type:"Float32",components:"color"===r?4:2,offset:0}})),this.paintVertexArray=new a;};Pa.prototype.populatePaintArray=function(t,e,r,n,i){var a=this.expression.evaluate(new oi(this.zoom),e,{},n,[],i),o=this.expression.evaluate(new oi(this.zoom+1),e,{},n,[],i),s=this.paintVertexArray.length;this.paintVertexArray.resize(t),this._setPaintValue(s,t,a,o);},Pa.prototype.updatePaintArray=function(t,e,r,n){var i=this.expression.evaluate({zoom:this.zoom},r,n),a=this.expression.evaluate({zoom:this.zoom+1},r,n);this._setPaintValue(t,e,i,a);},Pa.prototype._setPaintValue=function(t,e,r,n){if("color"===this.type)for(var i=Ia(r),a=Ia(n),o=t;o<e;o++)this.paintVertexArray.emplace(o,i[0],i[1],a[0],a[1]);else {for(var s=t;s<e;s++)this.paintVertexArray.emplace(s,r,n);this.maxValue=Math.max(this.maxValue,Math.abs(r),Math.abs(n));}},Pa.prototype.upload=function(t){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer&&this.paintVertexBuffer.buffer?this.paintVertexBuffer.updateData(this.paintVertexArray):this.paintVertexBuffer=t.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent));},Pa.prototype.destroy=function(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();},Pa.prototype.setUniform=function(t,e){var r=this.useIntegerZoom?Math.floor(e.zoom):e.zoom,n=p(this.expression.interpolationFactor(r,this.zoom,this.zoom+1),0,1);t.set(n);},Pa.prototype.getBinding=function(t,e,r){return new xa(t,e)};var Ma=function(t,e,r,n,i,a){this.expression=t,this.type=e,this.useIntegerZoom=r,this.zoom=n,this.layerId=a,this.zoomInPaintVertexArray=new i,this.zoomOutPaintVertexArray=new i;};Ma.prototype.populatePaintArray=function(t,e,r){var n=this.zoomInPaintVertexArray.length;this.zoomInPaintVertexArray.resize(t),this.zoomOutPaintVertexArray.resize(t),this._setPaintValues(n,t,e.patterns&&e.patterns[this.layerId],r);},Ma.prototype.updatePaintArray=function(t,e,r,n,i){this._setPaintValues(t,e,r.patterns&&r.patterns[this.layerId],i);},Ma.prototype._setPaintValues=function(t,e,r,n){if(n&&r){var i=n[r.min],a=n[r.mid],o=n[r.max];if(i&&a&&o)for(var s=t;s<e;s++)this.zoomInPaintVertexArray.emplace(s,a.tl[0],a.tl[1],a.br[0],a.br[1],i.tl[0],i.tl[1],i.br[0],i.br[1],a.pixelRatio,i.pixelRatio),this.zoomOutPaintVertexArray.emplace(s,a.tl[0],a.tl[1],a.br[0],a.br[1],o.tl[0],o.tl[1],o.br[0],o.br[1],a.pixelRatio,o.pixelRatio);}},Ma.prototype.upload=function(t){this.zoomInPaintVertexArray&&this.zoomInPaintVertexArray.arrayBuffer&&this.zoomOutPaintVertexArray&&this.zoomOutPaintVertexArray.arrayBuffer&&(this.zoomInPaintVertexBuffer=t.createVertexBuffer(this.zoomInPaintVertexArray,ua.members,this.expression.isStateDependent),this.zoomOutPaintVertexBuffer=t.createVertexBuffer(this.zoomOutPaintVertexArray,ua.members,this.expression.isStateDependent));},Ma.prototype.destroy=function(){this.zoomOutPaintVertexBuffer&&this.zoomOutPaintVertexBuffer.destroy(),this.zoomInPaintVertexBuffer&&this.zoomInPaintVertexBuffer.destroy();};var Ba=function(t,e,r){this.binders={},this._buffers=[];var n=[];for(var i in t.paint._values)if(r(i)){var a=t.paint.get(i);if(a instanceof fi&&Br(a.property.specification)){var o=Va(i,t.type),s=a.value,u=a.property.specification.type,l=a.property.useIntegerZoom,p=a.property.specification["property-type"],c="cross-faded"===p||"cross-faded-data-driven"===p;if("constant"===s.kind)this.binders[i]=c?new Ca(s.value,o):new za(s.value,o,u),n.push("/u_"+i);else if("source"===s.kind||c){var h=Fa(i,u,"source");this.binders[i]=c?new Ma(s,u,l,e,h,t.id):new Ea(s,o,u,h),n.push("/a_"+i);}else {var f=Fa(i,u,"composite");this.binders[i]=new Pa(s,o,u,l,e,f),n.push("/z_"+i);}}}this.cacheKey=n.sort().join("");};Ba.prototype.getMaxValue=function(t){var e=this.binders[t];return e instanceof Ea||e instanceof Pa?e.maxValue:0},Ba.prototype.populatePaintArrays=function(t,e,r,n,i){for(var a in this.binders){var o=this.binders[a];(o instanceof Ea||o instanceof Pa||o instanceof Ma)&&o.populatePaintArray(t,e,r,n,i);}},Ba.prototype.setConstantPatternPositions=function(t,e){for(var r in this.binders){var n=this.binders[r];n instanceof Ca&&n.setConstantPatternPositions(t,e);}},Ba.prototype.updatePaintArrays=function(t,e,r,n,i){var a=!1;for(var o in t)for(var s=0,u=e.getPositions(o);s<u.length;s+=1){var l=u[s],p=r.feature(l.index);for(var c in this.binders){var h=this.binders[c];if((h instanceof Ea||h instanceof Pa||h instanceof Ma)&&!0===h.expression.isStateDependent){var f=n.paint.get(c);h.expression=f.value,h.updatePaintArray(l.start,l.end,p,t[o],i),a=!0;}}}return a},Ba.prototype.defines=function(){var t=[];for(var e in this.binders){var r=this.binders[e];(r instanceof za||r instanceof Ca)&&t.push.apply(t,r.uniformNames.map((function(t){return "#define HAS_UNIFORM_"+t})));}return t},Ba.prototype.getBinderAttributes=function(){var t=[];for(var e in this.binders){var r=this.binders[e];if(r instanceof Ea||r instanceof Pa)for(var n=0;n<r.paintVertexAttributes.length;n++)t.push(r.paintVertexAttributes[n].name);else if(r instanceof Ma)for(var i=0;i<ua.members.length;i++)t.push(ua.members[i].name);}return t},Ba.prototype.getBinderUniforms=function(){var t=[];for(var e in this.binders){var r=this.binders[e];if(r instanceof za||r instanceof Ca||r instanceof Pa)for(var n=0,i=r.uniformNames;n<i.length;n+=1)t.push(i[n]);}return t},Ba.prototype.getPaintVertexBuffers=function(){return this._buffers},Ba.prototype.getUniforms=function(t,e){var r=[];for(var n in this.binders){var i=this.binders[n];if(i instanceof za||i instanceof Ca||i instanceof Pa)for(var a=0,o=i.uniformNames;a<o.length;a+=1){var s=o[a];if(e[s]){var u=i.getBinding(t,e[s],s);r.push({name:s,property:n,binding:u});}}}return r},Ba.prototype.setUniforms=function(t,e,r,n){for(var i=0,a=e;i<a.length;i+=1){var o=a[i],s=o.name,u=o.property;this.binders[u].setUniform(o.binding,n,r.get(u),s);}},Ba.prototype.updatePaintBuffers=function(t){for(var e in this._buffers=[],this.binders){var r=this.binders[e];if(t&&r instanceof Ma){var n=2===t.fromScale?r.zoomInPaintVertexBuffer:r.zoomOutPaintVertexBuffer;n&&this._buffers.push(n);}else (r instanceof Ea||r instanceof Pa)&&r.paintVertexBuffer&&this._buffers.push(r.paintVertexBuffer);}},Ba.prototype.upload=function(t){for(var e in this.binders){var r=this.binders[e];(r instanceof Ea||r instanceof Pa||r instanceof Ma)&&r.upload(t);}this.updatePaintBuffers();},Ba.prototype.destroy=function(){for(var t in this.binders){var e=this.binders[t];(e instanceof Ea||e instanceof Pa||e instanceof Ma)&&e.destroy();}};var Ta=function(t,e,r){void 0===r&&(r=function(){return !0}),this.programConfigurations={};for(var n=0,i=t;n<i.length;n+=1){var a=i[n];this.programConfigurations[a.id]=new Ba(a,e,r);}this.needsUpload=!1,this._featureMap=new fa,this._bufferOffset=0;};function Va(t,e){return {"text-opacity":["opacity"],"icon-opacity":["opacity"],"text-color":["fill_color"],"icon-color":["fill_color"],"text-halo-color":["halo_color"],"icon-halo-color":["halo_color"],"text-halo-blur":["halo_blur"],"icon-halo-blur":["halo_blur"],"text-halo-width":["halo_width"],"icon-halo-width":["halo_width"],"line-gap-width":["gapwidth"],"line-pattern":["pattern_to","pattern_from","pixel_ratio_to","pixel_ratio_from"],"fill-pattern":["pattern_to","pattern_from","pixel_ratio_to","pixel_ratio_from"],"fill-extrusion-pattern":["pattern_to","pattern_from","pixel_ratio_to","pixel_ratio_from"]}[t]||[t.replace(e+"-","").replace(/-/g,"_")]}function Fa(t,e,r){var n={color:{source:Mi,composite:Ji},number:{source:Ni,composite:Mi}},i=function(t){return {"line-pattern":{source:Bi,composite:Bi},"fill-pattern":{source:Bi,composite:Bi},"fill-extrusion-pattern":{source:Bi,composite:Bi}}[t]}(t);return i&&i[r]||n[e][r]}Ta.prototype.populatePaintArrays=function(t,e,r,n,i,a){for(var o in this.programConfigurations)this.programConfigurations[o].populatePaintArrays(t,e,n,i,a);void 0!==e.id&&this._featureMap.add(e.id,r,this._bufferOffset,t),this._bufferOffset=t,this.needsUpload=!0;},Ta.prototype.updatePaintArrays=function(t,e,r,n){for(var i=0,a=r;i<a.length;i+=1){var o=a[i];this.needsUpload=this.programConfigurations[o.id].updatePaintArrays(t,this._featureMap,e,o,n)||this.needsUpload;}},Ta.prototype.get=function(t){return this.programConfigurations[t]},Ta.prototype.upload=function(t){if(this.needsUpload){for(var e in this.programConfigurations)this.programConfigurations[e].upload(t);this.needsUpload=!1;}},Ta.prototype.destroy=function(){for(var t in this.programConfigurations)this.programConfigurations[t].destroy();},Ln("ConstantBinder",za),Ln("CrossFadedConstantBinder",Ca),Ln("SourceExpressionBinder",Ea),Ln("CrossFadedCompositeBinder",Ma),Ln("CompositeExpressionBinder",Pa),Ln("ProgramConfiguration",Ba,{omit:["_buffers"]}),Ln("ProgramConfigurationSet",Ta);var Da=Math.pow(2,14)-1,La=-Da-1;function Ra(t){for(var e=8192/t.extent,r=t.loadGeometry(),n=0;n<r.length;n++)for(var i=r[n],a=0;a<i.length;a++){var o=i[a],s=Math.round(o.x*e),u=Math.round(o.y*e);o.x=p(s,La,Da),o.y=p(u,La,Da),(s<o.x||s>o.x+1||u<o.y||u>o.y+1)&&A("Geometry exceeds allowed extent, reduce your vector tile buffer size");}return r}function Oa(t,e,r,n,i){t.emplaceBack(2*e+(n+1)/2,2*r+(i+1)/2);}var Ua=function(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map((function(t){return t.id})),this.index=t.index,this.hasPattern=!1,this.layoutVertexArray=new zi,this.indexArray=new Ui,this.segments=new oa,this.programConfigurations=new Ta(t.layers,t.zoom),this.stateDependentLayerIds=this.layers.filter((function(t){return t.isStateDependent()})).map((function(t){return t.id}));};function ja(t,e){for(var r=0;r<t.length;r++)if(Ya(e,t[r]))return !0;for(var n=0;n<e.length;n++)if(Ya(t,e[n]))return !0;return !!Ga(t,e)}function qa(t,e,r){return !!Ya(t,e)||!!Xa(e,t,r)}function Na(t,e){if(1===t.length)return Ha(e,t[0]);for(var r=0;r<e.length;r++)for(var n=e[r],i=0;i<n.length;i++)if(Ya(t,n[i]))return !0;for(var a=0;a<t.length;a++)if(Ha(e,t[a]))return !0;for(var o=0;o<e.length;o++)if(Ga(t,e[o]))return !0;return !1}function Ka(t,e,r){if(t.length>1){if(Ga(t,e))return !0;for(var n=0;n<e.length;n++)if(Xa(e[n],t,r))return !0}for(var i=0;i<t.length;i++)if(Xa(t[i],e,r))return !0;return !1}function Ga(t,e){if(0===t.length||0===e.length)return !1;for(var r=0;r<t.length-1;r++)for(var n=t[r],i=t[r+1],a=0;a<e.length-1;a++)if(Za(n,i,e[a],e[a+1]))return !0;return !1}function Za(t,e,r,n){return S(t,r,n)!==S(e,r,n)&&S(t,e,r)!==S(t,e,n)}function Xa(t,e,r){var n=r*r;if(1===e.length)return t.distSqr(e[0])<n;for(var i=1;i<e.length;i++)if(Ja(t,e[i-1],e[i])<n)return !0;return !1}function Ja(t,e,r){var n=e.distSqr(r);if(0===n)return t.distSqr(e);var i=((t.x-e.x)*(r.x-e.x)+(t.y-e.y)*(r.y-e.y))/n;return t.distSqr(i<0?e:i>1?r:r.sub(e)._mult(i)._add(e))}function Ha(t,e){for(var r,n,i,a=!1,o=0;o<t.length;o++)for(var s=0,u=(r=t[o]).length-1;s<r.length;u=s++)(n=r[s]).y>e.y!=(i=r[u]).y>e.y&&e.x<(i.x-n.x)*(e.y-n.y)/(i.y-n.y)+n.x&&(a=!a);return a}function Ya(t,e){for(var r=!1,n=0,i=t.length-1;n<t.length;i=n++){var a=t[n],o=t[i];a.y>e.y!=o.y>e.y&&e.x<(o.x-a.x)*(e.y-a.y)/(o.y-a.y)+a.x&&(r=!r);}return r}function $a(t,e,r){var n=r[0],i=r[2];if(t.x<n.x&&e.x<n.x||t.x>i.x&&e.x>i.x||t.y<n.y&&e.y<n.y||t.y>i.y&&e.y>i.y)return !1;var a=S(t,e,r[0]);return a!==S(t,e,r[1])||a!==S(t,e,r[2])||a!==S(t,e,r[3])}function Wa(t,e,r){var n=e.paint.get(t).value;return "constant"===n.kind?n.value:r.programConfigurations.get(e.id).getMaxValue(t)}function Qa(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])}function to(t,e,r,n,a){if(!e[0]&&!e[1])return t;var o=i.convert(e)._mult(a);"viewport"===r&&o._rotate(-n);for(var s=[],u=0;u<t.length;u++)s.push(t[u].sub(o));return s}Ua.prototype.populate=function(t,e,r){var n=this.layers[0],i=[],a=null;"circle"===n.type&&(a=n.layout.get("circle-sort-key"));for(var o=0,s=t;o<s.length;o+=1){var u=s[o],l=u.feature,p=u.id,c=u.index,h=u.sourceLayerIndex,f=this.layers[0]._featureFilter.needGeometry,y={type:l.type,id:p,properties:l.properties,geometry:f?Ra(l):[]};if(this.layers[0]._featureFilter.filter(new oi(this.zoom),y,r)){f||(y.geometry=Ra(l));var d=a?a.evaluate(y,{},r):void 0;i.push({id:p,properties:l.properties,type:l.type,sourceLayerIndex:h,index:c,geometry:y.geometry,patterns:{},sortKey:d});}}a&&i.sort((function(t,e){return t.sortKey-e.sortKey}));for(var m=0,v=i;m<v.length;m+=1){var g=v[m],x=g.geometry,b=g.index,w=g.sourceLayerIndex,_=t[b].feature;this.addFeature(g,x,b,r),e.featureIndex.insert(_,x,b,w,this.index);}},Ua.prototype.update=function(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);},Ua.prototype.isEmpty=function(){return 0===this.layoutVertexArray.length},Ua.prototype.uploadPending=function(){return !this.uploaded||this.programConfigurations.needsUpload},Ua.prototype.upload=function(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,aa),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;},Ua.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());},Ua.prototype.addFeature=function(t,e,r,n){for(var i=0,a=e;i<a.length;i+=1)for(var o=0,s=a[i];o<s.length;o+=1){var u=s[o],l=u.x,p=u.y;if(!(l<0||l>=8192||p<0||p>=8192)){var c=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray,t.sortKey),h=c.vertexLength;Oa(this.layoutVertexArray,l,p,-1,-1),Oa(this.layoutVertexArray,l,p,1,-1),Oa(this.layoutVertexArray,l,p,1,1),Oa(this.layoutVertexArray,l,p,-1,1),this.indexArray.emplaceBack(h,h+1,h+2),this.indexArray.emplaceBack(h,h+3,h+2),c.vertexLength+=4,c.primitiveLength+=2;}}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,{},n);},Ln("CircleBucket",Ua,{omit:["layers"]});var eo=new bi({"circle-sort-key":new mi(Ct.layout_circle["circle-sort-key"])}),ro={paint:new bi({"circle-radius":new mi(Ct.paint_circle["circle-radius"]),"circle-color":new mi(Ct.paint_circle["circle-color"]),"circle-blur":new mi(Ct.paint_circle["circle-blur"]),"circle-opacity":new mi(Ct.paint_circle["circle-opacity"]),"circle-translate":new di(Ct.paint_circle["circle-translate"]),"circle-translate-anchor":new di(Ct.paint_circle["circle-translate-anchor"]),"circle-pitch-scale":new di(Ct.paint_circle["circle-pitch-scale"]),"circle-pitch-alignment":new di(Ct.paint_circle["circle-pitch-alignment"]),"circle-stroke-width":new mi(Ct.paint_circle["circle-stroke-width"]),"circle-stroke-color":new mi(Ct.paint_circle["circle-stroke-color"]),"circle-stroke-opacity":new mi(Ct.paint_circle["circle-stroke-opacity"])}),layout:eo},no="undefined"!=typeof Float32Array?Float32Array:Array;function io(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function ao(t,e,r){var n=e[0],i=e[1],a=e[2],o=e[3],s=e[4],u=e[5],l=e[6],p=e[7],c=e[8],h=e[9],f=e[10],y=e[11],d=e[12],m=e[13],v=e[14],g=e[15],x=r[0],b=r[1],w=r[2],_=r[3];return t[0]=x*n+b*s+w*c+_*d,t[1]=x*i+b*u+w*h+_*m,t[2]=x*a+b*l+w*f+_*v,t[3]=x*o+b*p+w*y+_*g,t[4]=(x=r[4])*n+(b=r[5])*s+(w=r[6])*c+(_=r[7])*d,t[5]=x*i+b*u+w*h+_*m,t[6]=x*a+b*l+w*f+_*v,t[7]=x*o+b*p+w*y+_*g,t[8]=(x=r[8])*n+(b=r[9])*s+(w=r[10])*c+(_=r[11])*d,t[9]=x*i+b*u+w*h+_*m,t[10]=x*a+b*l+w*f+_*v,t[11]=x*o+b*p+w*y+_*g,t[12]=(x=r[12])*n+(b=r[13])*s+(w=r[14])*c+(_=r[15])*d,t[13]=x*i+b*u+w*h+_*m,t[14]=x*a+b*l+w*f+_*v,t[15]=x*o+b*p+w*y+_*g,t}Math.hypot||(Math.hypot=function(){for(var t=arguments,e=0,r=arguments.length;r--;)e+=t[r]*t[r];return Math.sqrt(e)});var oo,so=ao;function uo(t,e,r){var n=e[0],i=e[1],a=e[2],o=e[3];return t[0]=r[0]*n+r[4]*i+r[8]*a+r[12]*o,t[1]=r[1]*n+r[5]*i+r[9]*a+r[13]*o,t[2]=r[2]*n+r[6]*i+r[10]*a+r[14]*o,t[3]=r[3]*n+r[7]*i+r[11]*a+r[15]*o,t}oo=new no(3),no!=Float32Array&&(oo[0]=0,oo[1]=0,oo[2]=0),function(){var t=new no(4);no!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0);}();var lo=(function(){var t=new no(2);no!=Float32Array&&(t[0]=0,t[1]=0);}(),function(t){function e(e){t.call(this,e,ro);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.createBucket=function(t){return new Ua(t)},e.prototype.queryRadius=function(t){var e=t;return Wa("circle-radius",this,e)+Wa("circle-stroke-width",this,e)+Qa(this.paint.get("circle-translate"))},e.prototype.queryIntersectsFeature=function(t,e,r,n,i,a,o,s){for(var u=to(t,this.paint.get("circle-translate"),this.paint.get("circle-translate-anchor"),a.angle,o),l=this.paint.get("circle-radius").evaluate(e,r)+this.paint.get("circle-stroke-width").evaluate(e,r),p="map"===this.paint.get("circle-pitch-alignment"),c=p?u:function(t,e){return t.map((function(t){return po(t,e)}))}(u,s),h=p?l*o:l,f=0,y=n;f<y.length;f+=1)for(var d=0,m=y[f];d<m.length;d+=1){var v=m[d],g=p?v:po(v,s),x=h,b=uo([],[v.x,v.y,0,1],s);if("viewport"===this.paint.get("circle-pitch-scale")&&"map"===this.paint.get("circle-pitch-alignment")?x*=b[3]/a.cameraToCenterDistance:"map"===this.paint.get("circle-pitch-scale")&&"viewport"===this.paint.get("circle-pitch-alignment")&&(x*=a.cameraToCenterDistance/b[3]),qa(c,g,x))return !0}return !1},e}(wi));function po(t,e){var r=uo([],[t.x,t.y,0,1],e);return new i(r[0]/r[3],r[1]/r[3])}var co=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Ua);function ho(t,e,r,n){var i=e.width,a=e.height;if(n){if(n instanceof Uint8ClampedArray)n=new Uint8Array(n.buffer);else if(n.length!==i*a*r)throw new RangeError("mismatched image size")}else n=new Uint8Array(i*a*r);return t.width=i,t.height=a,t.data=n,t}function fo(t,e,r){var n=e.width,i=e.height;if(n!==t.width||i!==t.height){var a=ho({},{width:n,height:i},r);yo(t,a,{x:0,y:0},{x:0,y:0},{width:Math.min(t.width,n),height:Math.min(t.height,i)},r),t.width=n,t.height=i,t.data=a.data;}}function yo(t,e,r,n,i,a){if(0===i.width||0===i.height)return e;if(i.width>t.width||i.height>t.height||r.x>t.width-i.width||r.y>t.height-i.height)throw new RangeError("out of range source coordinates for image copy");if(i.width>e.width||i.height>e.height||n.x>e.width-i.width||n.y>e.height-i.height)throw new RangeError("out of range destination coordinates for image copy");for(var o=t.data,s=e.data,u=0;u<i.height;u++)for(var l=((r.y+u)*t.width+r.x)*a,p=((n.y+u)*e.width+n.x)*a,c=0;c<i.width*a;c++)s[p+c]=o[l+c];return e}Ln("HeatmapBucket",co,{omit:["layers"]});var mo=function(t,e){ho(this,t,1,e);};mo.prototype.resize=function(t){fo(this,t,1);},mo.prototype.clone=function(){return new mo({width:this.width,height:this.height},new Uint8Array(this.data))},mo.copy=function(t,e,r,n,i){yo(t,e,r,n,i,1);};var vo=function(t,e){ho(this,t,4,e);};vo.prototype.resize=function(t){fo(this,t,4);},vo.prototype.replace=function(t,e){e?this.data.set(t):this.data=t instanceof Uint8ClampedArray?new Uint8Array(t.buffer):t;},vo.prototype.clone=function(){return new vo({width:this.width,height:this.height},new Uint8Array(this.data))},vo.copy=function(t,e,r,n,i){yo(t,e,r,n,i,4);},Ln("AlphaImage",mo),Ln("RGBAImage",vo);var go={paint:new bi({"heatmap-radius":new mi(Ct.paint_heatmap["heatmap-radius"]),"heatmap-weight":new mi(Ct.paint_heatmap["heatmap-weight"]),"heatmap-intensity":new di(Ct.paint_heatmap["heatmap-intensity"]),"heatmap-color":new xi(Ct.paint_heatmap["heatmap-color"]),"heatmap-opacity":new di(Ct.paint_heatmap["heatmap-opacity"])})};function xo(t){var e={},r=t.resolution||256,n=t.clips?t.clips.length:1,i=t.image||new vo({width:r,height:n}),a=function(r,n,a){e[t.evaluationKey]=a;var o=t.expression.evaluate(e);i.data[r+n+0]=Math.floor(255*o.r/o.a),i.data[r+n+1]=Math.floor(255*o.g/o.a),i.data[r+n+2]=Math.floor(255*o.b/o.a),i.data[r+n+3]=Math.floor(255*o.a);};if(t.clips)for(var o=0,s=0;o<n;++o,s+=4*r)for(var u=0,l=0;u<r;u++,l+=4){var p=u/(r-1),c=t.clips[o];a(s,l,c.start*(1-p)+c.end*p);}else for(var h=0,f=0;h<r;h++,f+=4)a(0,f,h/(r-1));return i}var bo=function(t){function e(e){t.call(this,e,go),this._updateColorRamp();}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.createBucket=function(t){return new co(t)},e.prototype._handleSpecialPaintPropertyUpdate=function(t){"heatmap-color"===t&&this._updateColorRamp();},e.prototype._updateColorRamp=function(){this.colorRamp=xo({expression:this._transitionablePaint._values["heatmap-color"].value.expression,evaluationKey:"heatmapDensity",image:this.colorRamp}),this.colorRampTexture=null;},e.prototype.resize=function(){this.heatmapFbo&&(this.heatmapFbo.destroy(),this.heatmapFbo=null);},e.prototype.queryRadius=function(){return 0},e.prototype.queryIntersectsFeature=function(){return !1},e.prototype.hasOffscreenPass=function(){return 0!==this.paint.get("heatmap-opacity")&&"none"!==this.visibility},e}(wi),wo={paint:new bi({"hillshade-illumination-direction":new di(Ct.paint_hillshade["hillshade-illumination-direction"]),"hillshade-illumination-anchor":new di(Ct.paint_hillshade["hillshade-illumination-anchor"]),"hillshade-exaggeration":new di(Ct.paint_hillshade["hillshade-exaggeration"]),"hillshade-shadow-color":new di(Ct.paint_hillshade["hillshade-shadow-color"]),"hillshade-highlight-color":new di(Ct.paint_hillshade["hillshade-highlight-color"]),"hillshade-accent-color":new di(Ct.paint_hillshade["hillshade-accent-color"])})},_o=function(t){function e(e){t.call(this,e,wo);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.hasOffscreenPass=function(){return 0!==this.paint.get("hillshade-exaggeration")&&"none"!==this.visibility},e}(wi),Ao=ki([{name:"a_pos",components:2,type:"Int16"}],4).members,So=Io,ko=Io;function Io(t,e,r){r=r||2;var n,i,a,o,s,u,l,p=e&&e.length,c=p?e[0]*r:t.length,h=zo(t,0,c,r,!0),f=[];if(!h||h.next===h.prev)return f;if(p&&(h=function(t,e,r,n){var i,a,o,s=[];for(i=0,a=e.length;i<a;i++)(o=zo(t,e[i]*n,i<a-1?e[i+1]*n:t.length,n,!1))===o.next&&(o.steiner=!0),s.push(Ro(o));for(s.sort(Vo),i=0;i<s.length;i++)Fo(s[i],r),r=Co(r,r.next);return r}(t,e,h,r)),t.length>80*r){n=a=t[0],i=o=t[1];for(var y=r;y<c;y+=r)(s=t[y])<n&&(n=s),(u=t[y+1])<i&&(i=u),s>a&&(a=s),u>o&&(o=u);l=0!==(l=Math.max(a-n,o-i))?1/l:0;}return Eo(h,f,r,n,i,l),f}function zo(t,e,r,n,i){var a,o;if(i===$o(t,e,r,n)>0)for(a=e;a<r;a+=n)o=Jo(a,t[a],t[a+1],o);else for(a=r-n;a>=e;a-=n)o=Jo(a,t[a],t[a+1],o);return o&&qo(o,o.next)&&(Ho(o),o=o.next),o}function Co(t,e){if(!t)return t;e||(e=t);var r,n=t;do{if(r=!1,n.steiner||!qo(n,n.next)&&0!==jo(n.prev,n,n.next))n=n.next;else {if(Ho(n),(n=e=n.prev)===n.next)break;r=!0;}}while(r||n!==e);return e}function Eo(t,e,r,n,i,a,o){if(t){!o&&a&&function(t,e,r,n){var i=t;do{null===i.z&&(i.z=Lo(i.x,i.y,e,r,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;}while(i!==t);i.prevZ.nextZ=null,i.prevZ=null,function(t){var e,r,n,i,a,o,s,u,l=1;do{for(r=t,t=null,a=null,o=0;r;){for(o++,n=r,s=0,e=0;e<l&&(s++,n=n.nextZ);e++);for(u=l;s>0||u>0&&n;)0!==s&&(0===u||!n||r.z<=n.z)?(i=r,r=r.nextZ,s--):(i=n,n=n.nextZ,u--),a?a.nextZ=i:t=i,i.prevZ=a,a=i;r=n;}a.nextZ=null,l*=2;}while(o>1)}(i);}(t,n,i,a);for(var s,u,l=t;t.prev!==t.next;)if(s=t.prev,u=t.next,a?Mo(t,n,i,a):Po(t))e.push(s.i/r),e.push(t.i/r),e.push(u.i/r),Ho(t),t=u.next,l=u.next;else if((t=u)===l){o?1===o?Eo(t=Bo(Co(t),e,r),e,r,n,i,a,2):2===o&&To(t,e,r,n,i,a):Eo(Co(t),e,r,n,i,a,1);break}}}function Po(t){var e=t.prev,r=t,n=t.next;if(jo(e,r,n)>=0)return !1;for(var i=t.next.next;i!==t.prev;){if(Oo(e.x,e.y,r.x,r.y,n.x,n.y,i.x,i.y)&&jo(i.prev,i,i.next)>=0)return !1;i=i.next;}return !0}function Mo(t,e,r,n){var i=t.prev,a=t,o=t.next;if(jo(i,a,o)>=0)return !1;for(var s=i.x>a.x?i.x>o.x?i.x:o.x:a.x>o.x?a.x:o.x,u=i.y>a.y?i.y>o.y?i.y:o.y:a.y>o.y?a.y:o.y,l=Lo(i.x<a.x?i.x<o.x?i.x:o.x:a.x<o.x?a.x:o.x,i.y<a.y?i.y<o.y?i.y:o.y:a.y<o.y?a.y:o.y,e,r,n),p=Lo(s,u,e,r,n),c=t.prevZ,h=t.nextZ;c&&c.z>=l&&h&&h.z<=p;){if(c!==t.prev&&c!==t.next&&Oo(i.x,i.y,a.x,a.y,o.x,o.y,c.x,c.y)&&jo(c.prev,c,c.next)>=0)return !1;if(c=c.prevZ,h!==t.prev&&h!==t.next&&Oo(i.x,i.y,a.x,a.y,o.x,o.y,h.x,h.y)&&jo(h.prev,h,h.next)>=0)return !1;h=h.nextZ;}for(;c&&c.z>=l;){if(c!==t.prev&&c!==t.next&&Oo(i.x,i.y,a.x,a.y,o.x,o.y,c.x,c.y)&&jo(c.prev,c,c.next)>=0)return !1;c=c.prevZ;}for(;h&&h.z<=p;){if(h!==t.prev&&h!==t.next&&Oo(i.x,i.y,a.x,a.y,o.x,o.y,h.x,h.y)&&jo(h.prev,h,h.next)>=0)return !1;h=h.nextZ;}return !0}function Bo(t,e,r){var n=t;do{var i=n.prev,a=n.next.next;!qo(i,a)&&No(i,n,n.next,a)&&Zo(i,a)&&Zo(a,i)&&(e.push(i.i/r),e.push(n.i/r),e.push(a.i/r),Ho(n),Ho(n.next),n=t=a),n=n.next;}while(n!==t);return Co(n)}function To(t,e,r,n,i,a){var o=t;do{for(var s=o.next.next;s!==o.prev;){if(o.i!==s.i&&Uo(o,s)){var u=Xo(o,s);return o=Co(o,o.next),u=Co(u,u.next),Eo(o,e,r,n,i,a),void Eo(u,e,r,n,i,a)}s=s.next;}o=o.next;}while(o!==t)}function Vo(t,e){return t.x-e.x}function Fo(t,e){if(e=function(t,e){var r,n=e,i=t.x,a=t.y,o=-1/0;do{if(a<=n.y&&a>=n.next.y&&n.next.y!==n.y){var s=n.x+(a-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(s<=i&&s>o){if(o=s,s===i){if(a===n.y)return n;if(a===n.next.y)return n.next}r=n.x<n.next.x?n:n.next;}}n=n.next;}while(n!==e);if(!r)return null;if(i===o)return r;var u,l=r,p=r.x,c=r.y,h=1/0;n=r;do{i>=n.x&&n.x>=p&&i!==n.x&&Oo(a<c?i:o,a,p,c,a<c?o:i,a,n.x,n.y)&&(u=Math.abs(a-n.y)/(i-n.x),Zo(n,t)&&(u<h||u===h&&(n.x>r.x||n.x===r.x&&Do(r,n)))&&(r=n,h=u)),n=n.next;}while(n!==l);return r}(t,e)){var r=Xo(e,t);Co(e,e.next),Co(r,r.next);}}function Do(t,e){return jo(t.prev,t,e.prev)<0&&jo(e.next,t,t.next)<0}function Lo(t,e,r,n,i){return (t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=32767*(t-r)*i)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-n)*i)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Ro(t){var e=t,r=t;do{(e.x<r.x||e.x===r.x&&e.y<r.y)&&(r=e),e=e.next;}while(e!==t);return r}function Oo(t,e,r,n,i,a,o,s){return (i-o)*(e-s)-(t-o)*(a-s)>=0&&(t-o)*(n-s)-(r-o)*(e-s)>=0&&(r-o)*(a-s)-(i-o)*(n-s)>=0}function Uo(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){var r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==e.i&&r.next.i!==e.i&&No(r,r.next,t,e))return !0;r=r.next;}while(r!==t);return !1}(t,e)&&(Zo(t,e)&&Zo(e,t)&&function(t,e){var r=t,n=!1,i=(t.x+e.x)/2,a=(t.y+e.y)/2;do{r.y>a!=r.next.y>a&&r.next.y!==r.y&&i<(r.next.x-r.x)*(a-r.y)/(r.next.y-r.y)+r.x&&(n=!n),r=r.next;}while(r!==t);return n}(t,e)&&(jo(t.prev,t,e.prev)||jo(t,e.prev,e))||qo(t,e)&&jo(t.prev,t,t.next)>0&&jo(e.prev,e,e.next)>0)}function jo(t,e,r){return (e.y-t.y)*(r.x-e.x)-(e.x-t.x)*(r.y-e.y)}function qo(t,e){return t.x===e.x&&t.y===e.y}function No(t,e,r,n){var i=Go(jo(t,e,r)),a=Go(jo(t,e,n)),o=Go(jo(r,n,t)),s=Go(jo(r,n,e));return i!==a&&o!==s||!(0!==i||!Ko(t,r,e))||!(0!==a||!Ko(t,n,e))||!(0!==o||!Ko(r,t,n))||!(0!==s||!Ko(r,e,n))}function Ko(t,e,r){return e.x<=Math.max(t.x,r.x)&&e.x>=Math.min(t.x,r.x)&&e.y<=Math.max(t.y,r.y)&&e.y>=Math.min(t.y,r.y)}function Go(t){return t>0?1:t<0?-1:0}function Zo(t,e){return jo(t.prev,t,t.next)<0?jo(t,e,t.next)>=0&&jo(t,t.prev,e)>=0:jo(t,e,t.prev)<0||jo(t,t.next,e)<0}function Xo(t,e){var r=new Yo(t.i,t.x,t.y),n=new Yo(e.i,e.x,e.y),i=t.next,a=e.prev;return t.next=e,e.prev=t,r.next=i,i.prev=r,n.next=r,r.prev=n,a.next=n,n.prev=a,n}function Jo(t,e,r,n){var i=new Yo(t,e,r);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ho(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ);}function Yo(t,e,r){this.i=t,this.x=e,this.y=r,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1;}function $o(t,e,r,n){for(var i=0,a=e,o=r-n;a<r;a+=n)i+=(t[o]-t[a])*(t[a+1]+t[o+1]),o=a;return i}function Wo(t,e,r,n,i){!function t(e,r,n,i,a){for(;i>n;){if(i-n>600){var o=i-n+1,s=r-n+1,u=Math.log(o),l=.5*Math.exp(2*u/3),p=.5*Math.sqrt(u*l*(o-l)/o)*(s-o/2<0?-1:1);t(e,r,Math.max(n,Math.floor(r-s*l/o+p)),Math.min(i,Math.floor(r+(o-s)*l/o+p)),a);}var c=e[r],h=n,f=i;for(Qo(e,n,r),a(e[i],c)>0&&Qo(e,n,i);h<f;){for(Qo(e,h,f),h++,f--;a(e[h],c)<0;)h++;for(;a(e[f],c)>0;)f--;}0===a(e[n],c)?Qo(e,n,f):Qo(e,++f,i),f<=r&&(n=f+1),r<=f&&(i=f-1);}}(t,e,r||0,n||t.length-1,i||ts);}function Qo(t,e,r){var n=t[e];t[e]=t[r],t[r]=n;}function ts(t,e){return t<e?-1:t>e?1:0}function es(t,e){var r=t.length;if(r<=1)return [t];for(var n,i,a=[],o=0;o<r;o++){var s=k(t[o]);0!==s&&(t[o].area=Math.abs(s),void 0===i&&(i=s<0),i===s<0?(n&&a.push(n),n=[t[o]]):n.push(t[o]));}if(n&&a.push(n),e>1)for(var u=0;u<a.length;u++)a[u].length<=e||(Wo(a[u],e,1,a[u].length-1,rs),a[u]=a[u].slice(0,e));return a}function rs(t,e){return e.area-t.area}function ns(t,e,r){for(var n=r.patternDependencies,i=!1,a=0,o=e;a<o.length;a+=1){var s=o[a].paint.get(t+"-pattern");s.isConstant()||(i=!0);var u=s.constantOr(null);u&&(i=!0,n[u.to]=!0,n[u.from]=!0);}return i}function is(t,e,r,n,i){for(var a=i.patternDependencies,o=0,s=e;o<s.length;o+=1){var u=s[o],l=u.paint.get(t+"-pattern").value;if("constant"!==l.kind){var p=l.evaluate({zoom:n-1},r,{},i.availableImages),c=l.evaluate({zoom:n},r,{},i.availableImages),h=l.evaluate({zoom:n+1},r,{},i.availableImages);c=c&&c.name?c.name:c,h=h&&h.name?h.name:h,a[p=p&&p.name?p.name:p]=!0,a[c]=!0,a[h]=!0,r.patterns[u.id]={min:p,mid:c,max:h};}}return r}Io.deviation=function(t,e,r,n){var i=e&&e.length,a=Math.abs($o(t,0,i?e[0]*r:t.length,r));if(i)for(var o=0,s=e.length;o<s;o++)a-=Math.abs($o(t,e[o]*r,o<s-1?e[o+1]*r:t.length,r));var u=0;for(o=0;o<n.length;o+=3){var l=n[o]*r,p=n[o+1]*r,c=n[o+2]*r;u+=Math.abs((t[l]-t[c])*(t[p+1]-t[l+1])-(t[l]-t[p])*(t[c+1]-t[l+1]));}return 0===a&&0===u?0:Math.abs((u-a)/a)},Io.flatten=function(t){for(var e=t[0][0].length,r={vertices:[],holes:[],dimensions:e},n=0,i=0;i<t.length;i++){for(var a=0;a<t[i].length;a++)for(var o=0;o<e;o++)r.vertices.push(t[i][a][o]);i>0&&r.holes.push(n+=t[i-1].length);}return r},So.default=ko;var as=function(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map((function(t){return t.id})),this.index=t.index,this.hasPattern=!1,this.patternFeatures=[],this.layoutVertexArray=new zi,this.indexArray=new Ui,this.indexArray2=new Zi,this.programConfigurations=new Ta(t.layers,t.zoom),this.segments=new oa,this.segments2=new oa,this.stateDependentLayerIds=this.layers.filter((function(t){return t.isStateDependent()})).map((function(t){return t.id}));};as.prototype.populate=function(t,e,r){this.hasPattern=ns("fill",this.layers,e);for(var n=this.layers[0].layout.get("fill-sort-key"),i=[],a=0,o=t;a<o.length;a+=1){var s=o[a],u=s.feature,l=s.id,p=s.index,c=s.sourceLayerIndex,h=this.layers[0]._featureFilter.needGeometry,f={type:u.type,id:l,properties:u.properties,geometry:h?Ra(u):[]};if(this.layers[0]._featureFilter.filter(new oi(this.zoom),f,r)){h||(f.geometry=Ra(u));var y=n?n.evaluate(f,{},r,e.availableImages):void 0;i.push({id:l,properties:u.properties,type:u.type,sourceLayerIndex:c,index:p,geometry:f.geometry,patterns:{},sortKey:y});}}n&&i.sort((function(t,e){return t.sortKey-e.sortKey}));for(var d=0,m=i;d<m.length;d+=1){var v=m[d],g=v.geometry,x=v.index,b=v.sourceLayerIndex;if(this.hasPattern){var w=is("fill",this.layers,v,this.zoom,e);this.patternFeatures.push(w);}else this.addFeature(v,g,x,r,{});e.featureIndex.insert(t[x].feature,g,x,b,this.index);}},as.prototype.update=function(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);},as.prototype.addFeatures=function(t,e,r){for(var n=0,i=this.patternFeatures;n<i.length;n+=1){var a=i[n];this.addFeature(a,a.geometry,a.index,e,r);}},as.prototype.isEmpty=function(){return 0===this.layoutVertexArray.length},as.prototype.uploadPending=function(){return !this.uploaded||this.programConfigurations.needsUpload},as.prototype.upload=function(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,Ao),this.indexBuffer=t.createIndexBuffer(this.indexArray),this.indexBuffer2=t.createIndexBuffer(this.indexArray2)),this.programConfigurations.upload(t),this.uploaded=!0;},as.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.indexBuffer2.destroy(),this.programConfigurations.destroy(),this.segments.destroy(),this.segments2.destroy());},as.prototype.addFeature=function(t,e,r,n,i){for(var a=0,o=es(e,500);a<o.length;a+=1){for(var s=o[a],u=0,l=0,p=s;l<p.length;l+=1)u+=p[l].length;for(var c=this.segments.prepareSegment(u,this.layoutVertexArray,this.indexArray),h=c.vertexLength,f=[],y=[],d=0,m=s;d<m.length;d+=1){var v=m[d];if(0!==v.length){v!==s[0]&&y.push(f.length/2);var g=this.segments2.prepareSegment(v.length,this.layoutVertexArray,this.indexArray2),x=g.vertexLength;this.layoutVertexArray.emplaceBack(v[0].x,v[0].y),this.indexArray2.emplaceBack(x+v.length-1,x),f.push(v[0].x),f.push(v[0].y);for(var b=1;b<v.length;b++)this.layoutVertexArray.emplaceBack(v[b].x,v[b].y),this.indexArray2.emplaceBack(x+b-1,x+b),f.push(v[b].x),f.push(v[b].y);g.vertexLength+=v.length,g.primitiveLength+=v.length;}}for(var w=So(f,y),_=0;_<w.length;_+=3)this.indexArray.emplaceBack(h+w[_],h+w[_+1],h+w[_+2]);c.vertexLength+=u,c.primitiveLength+=w.length/3;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,i,n);},Ln("FillBucket",as,{omit:["layers","patternFeatures"]});var os=new bi({"fill-sort-key":new mi(Ct.layout_fill["fill-sort-key"])}),ss={paint:new bi({"fill-antialias":new di(Ct.paint_fill["fill-antialias"]),"fill-opacity":new mi(Ct.paint_fill["fill-opacity"]),"fill-color":new mi(Ct.paint_fill["fill-color"]),"fill-outline-color":new mi(Ct.paint_fill["fill-outline-color"]),"fill-translate":new di(Ct.paint_fill["fill-translate"]),"fill-translate-anchor":new di(Ct.paint_fill["fill-translate-anchor"]),"fill-pattern":new vi(Ct.paint_fill["fill-pattern"])}),layout:os},us=function(t){function e(e){t.call(this,e,ss);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.recalculate=function(e,r){t.prototype.recalculate.call(this,e,r);var n=this.paint._values["fill-outline-color"];"constant"===n.value.kind&&void 0===n.value.value&&(this.paint._values["fill-outline-color"]=this.paint._values["fill-color"]);},e.prototype.createBucket=function(t){return new as(t)},e.prototype.queryRadius=function(){return Qa(this.paint.get("fill-translate"))},e.prototype.queryIntersectsFeature=function(t,e,r,n,i,a,o){return Na(to(t,this.paint.get("fill-translate"),this.paint.get("fill-translate-anchor"),a.angle,o),n)},e.prototype.isTileClipped=function(){return !0},e}(wi),ls=ki([{name:"a_pos",components:2,type:"Int16"},{name:"a_normal_ed",components:4,type:"Int16"}],4).members,ps=cs;function cs(t,e,r,n,i){this.properties={},this.extent=r,this.type=0,this._pbf=t,this._geometry=-1,this._keys=n,this._values=i,t.readFields(hs,this,e);}function hs(t,e,r){1==t?e.id=r.readVarint():2==t?function(t,e){for(var r=t.readVarint()+t.pos;t.pos<r;){var n=e._keys[t.readVarint()],i=e._values[t.readVarint()];e.properties[n]=i;}}(r,e):3==t?e.type=r.readVarint():4==t&&(e._geometry=r.pos);}function fs(t){for(var e,r,n=0,i=0,a=t.length,o=a-1;i<a;o=i++)n+=((r=t[o]).x-(e=t[i]).x)*(e.y+r.y);return n}cs.types=["Unknown","Point","LineString","Polygon"],cs.prototype.loadGeometry=function(){var t=this._pbf;t.pos=this._geometry;for(var e,r=t.readVarint()+t.pos,n=1,a=0,o=0,s=0,u=[];t.pos<r;){if(a<=0){var l=t.readVarint();n=7&l,a=l>>3;}if(a--,1===n||2===n)o+=t.readSVarint(),s+=t.readSVarint(),1===n&&(e&&u.push(e),e=[]),e.push(new i(o,s));else {if(7!==n)throw new Error("unknown command "+n);e&&e.push(e[0].clone());}}return e&&u.push(e),u},cs.prototype.bbox=function(){var t=this._pbf;t.pos=this._geometry;for(var e=t.readVarint()+t.pos,r=1,n=0,i=0,a=0,o=1/0,s=-1/0,u=1/0,l=-1/0;t.pos<e;){if(n<=0){var p=t.readVarint();r=7&p,n=p>>3;}if(n--,1===r||2===r)(i+=t.readSVarint())<o&&(o=i),i>s&&(s=i),(a+=t.readSVarint())<u&&(u=a),a>l&&(l=a);else if(7!==r)throw new Error("unknown command "+r)}return [o,u,s,l]},cs.prototype.toGeoJSON=function(t,e,r){var n,i,a=this.extent*Math.pow(2,r),o=this.extent*t,s=this.extent*e,u=this.loadGeometry(),l=cs.types[this.type];function p(t){for(var e=0;e<t.length;e++){var r=t[e];t[e]=[360*(r.x+o)/a-180,360/Math.PI*Math.atan(Math.exp((180-360*(r.y+s)/a)*Math.PI/180))-90];}}switch(this.type){case 1:var c=[];for(n=0;n<u.length;n++)c[n]=u[n][0];p(u=c);break;case 2:for(n=0;n<u.length;n++)p(u[n]);break;case 3:for(u=function(t){var e=t.length;if(e<=1)return [t];for(var r,n,i=[],a=0;a<e;a++){var o=fs(t[a]);0!==o&&(void 0===n&&(n=o<0),n===o<0?(r&&i.push(r),r=[t[a]]):r.push(t[a]));}return r&&i.push(r),i}(u),n=0;n<u.length;n++)for(i=0;i<u[n].length;i++)p(u[n][i]);}1===u.length?u=u[0]:l="Multi"+l;var h={type:"Feature",geometry:{type:l,coordinates:u},properties:this.properties};return "id"in this&&(h.id=this.id),h};var ys=ds;function ds(t,e){this.version=1,this.name=null,this.extent=4096,this.length=0,this._pbf=t,this._keys=[],this._values=[],this._features=[],t.readFields(ms,this,e),this.length=this._features.length;}function ms(t,e,r){15===t?e.version=r.readVarint():1===t?e.name=r.readString():5===t?e.extent=r.readVarint():2===t?e._features.push(r.pos):3===t?e._keys.push(r.readString()):4===t&&e._values.push(function(t){for(var e=null,r=t.readVarint()+t.pos;t.pos<r;){var n=t.readVarint()>>3;e=1===n?t.readString():2===n?t.readFloat():3===n?t.readDouble():4===n?t.readVarint64():5===n?t.readVarint():6===n?t.readSVarint():7===n?t.readBoolean():null;}return e}(r));}function vs(t,e,r){if(3===t){var n=new ys(r,r.readVarint()+r.pos);n.length&&(e[n.name]=n);}}ds.prototype.feature=function(t){if(t<0||t>=this._features.length)throw new Error("feature index out of bounds");this._pbf.pos=this._features[t];var e=this._pbf.readVarint()+this._pbf.pos;return new ps(this._pbf,e,this.extent,this._keys,this._values)};var gs={VectorTile:function(t,e){this.layers=t.readFields(vs,{},e);},VectorTileFeature:ps,VectorTileLayer:ys},xs=gs.VectorTileFeature.types,bs=Math.pow(2,13);function ws(t,e,r,n,i,a,o,s){t.emplaceBack(e,r,2*Math.floor(n*bs)+o,i*bs*2,a*bs*2,Math.round(s));}var _s=function(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map((function(t){return t.id})),this.index=t.index,this.hasPattern=!1,this.layoutVertexArray=new Ei,this.indexArray=new Ui,this.programConfigurations=new Ta(t.layers,t.zoom),this.segments=new oa,this.stateDependentLayerIds=this.layers.filter((function(t){return t.isStateDependent()})).map((function(t){return t.id}));};function As(t,e){return t.x===e.x&&(t.x<0||t.x>8192)||t.y===e.y&&(t.y<0||t.y>8192)}_s.prototype.populate=function(t,e,r){this.features=[],this.hasPattern=ns("fill-extrusion",this.layers,e);for(var n=0,i=t;n<i.length;n+=1){var a=i[n],o=a.feature,s=a.id,u=a.index,l=a.sourceLayerIndex,p=this.layers[0]._featureFilter.needGeometry,c={type:o.type,id:s,properties:o.properties,geometry:p?Ra(o):[]};if(this.layers[0]._featureFilter.filter(new oi(this.zoom),c,r)){var h={id:s,sourceLayerIndex:l,index:u,geometry:p?c.geometry:Ra(o),properties:o.properties,type:o.type,patterns:{}};this.hasPattern?this.features.push(is("fill-extrusion",this.layers,h,this.zoom,e)):this.addFeature(h,h.geometry,u,r,{}),e.featureIndex.insert(o,h.geometry,u,l,this.index,!0);}}},_s.prototype.addFeatures=function(t,e,r){for(var n=0,i=this.features;n<i.length;n+=1){var a=i[n];this.addFeature(a,a.geometry,a.index,e,r);}},_s.prototype.update=function(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);},_s.prototype.isEmpty=function(){return 0===this.layoutVertexArray.length},_s.prototype.uploadPending=function(){return !this.uploaded||this.programConfigurations.needsUpload},_s.prototype.upload=function(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,ls),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;},_s.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());},_s.prototype.addFeature=function(t,e,r,n,i){for(var a=0,o=es(e,500);a<o.length;a+=1){for(var s=o[a],u=0,l=0,p=s;l<p.length;l+=1)u+=p[l].length;for(var c=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray),h=0,f=s;h<f.length;h+=1){var y=f[h];if(0!==y.length&&!((B=y).every((function(t){return t.x<0}))||B.every((function(t){return t.x>8192}))||B.every((function(t){return t.y<0}))||B.every((function(t){return t.y>8192}))))for(var d=0,m=0;m<y.length;m++){var v=y[m];if(m>=1){var g=y[m-1];if(!As(v,g)){c.vertexLength+4>oa.MAX_VERTEX_ARRAY_LENGTH&&(c=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray));var x=v.sub(g)._perp()._unit(),b=g.dist(v);d+b>32768&&(d=0),ws(this.layoutVertexArray,v.x,v.y,x.x,x.y,0,0,d),ws(this.layoutVertexArray,v.x,v.y,x.x,x.y,0,1,d),ws(this.layoutVertexArray,g.x,g.y,x.x,x.y,0,0,d+=b),ws(this.layoutVertexArray,g.x,g.y,x.x,x.y,0,1,d);var w=c.vertexLength;this.indexArray.emplaceBack(w,w+2,w+1),this.indexArray.emplaceBack(w+1,w+2,w+3),c.vertexLength+=4,c.primitiveLength+=2;}}}}if(c.vertexLength+u>oa.MAX_VERTEX_ARRAY_LENGTH&&(c=this.segments.prepareSegment(u,this.layoutVertexArray,this.indexArray)),"Polygon"===xs[t.type]){for(var _=[],A=[],S=c.vertexLength,k=0,I=s;k<I.length;k+=1){var z=I[k];if(0!==z.length){z!==s[0]&&A.push(_.length/2);for(var C=0;C<z.length;C++){var E=z[C];ws(this.layoutVertexArray,E.x,E.y,0,0,1,1,0),_.push(E.x),_.push(E.y);}}}for(var P=So(_,A),M=0;M<P.length;M+=3)this.indexArray.emplaceBack(S+P[M],S+P[M+2],S+P[M+1]);c.primitiveLength+=P.length/3,c.vertexLength+=u;}}var B;this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,i,n);},Ln("FillExtrusionBucket",_s,{omit:["layers","features"]});var Ss={paint:new bi({"fill-extrusion-opacity":new di(Ct["paint_fill-extrusion"]["fill-extrusion-opacity"]),"fill-extrusion-color":new mi(Ct["paint_fill-extrusion"]["fill-extrusion-color"]),"fill-extrusion-translate":new di(Ct["paint_fill-extrusion"]["fill-extrusion-translate"]),"fill-extrusion-translate-anchor":new di(Ct["paint_fill-extrusion"]["fill-extrusion-translate-anchor"]),"fill-extrusion-pattern":new vi(Ct["paint_fill-extrusion"]["fill-extrusion-pattern"]),"fill-extrusion-height":new mi(Ct["paint_fill-extrusion"]["fill-extrusion-height"]),"fill-extrusion-base":new mi(Ct["paint_fill-extrusion"]["fill-extrusion-base"]),"fill-extrusion-vertical-gradient":new di(Ct["paint_fill-extrusion"]["fill-extrusion-vertical-gradient"])})},ks=function(t){function e(e){t.call(this,e,Ss);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.createBucket=function(t){return new _s(t)},e.prototype.queryRadius=function(){return Qa(this.paint.get("fill-extrusion-translate"))},e.prototype.is3D=function(){return !0},e.prototype.queryIntersectsFeature=function(t,e,r,n,a,o,s,u){var l=to(t,this.paint.get("fill-extrusion-translate"),this.paint.get("fill-extrusion-translate-anchor"),o.angle,s),p=this.paint.get("fill-extrusion-height").evaluate(e,r),c=this.paint.get("fill-extrusion-base").evaluate(e,r),h=function(t,e,r,n){for(var a=[],o=0,s=t;o<s.length;o+=1){var u=s[o],l=[u.x,u.y,0,1];uo(l,l,e),a.push(new i(l[0]/l[3],l[1]/l[3]));}return a}(l,u),f=function(t,e,r,n){for(var a=[],o=[],s=n[8]*e,u=n[9]*e,l=n[10]*e,p=n[11]*e,c=n[8]*r,h=n[9]*r,f=n[10]*r,y=n[11]*r,d=0,m=t;d<m.length;d+=1){for(var v=[],g=[],x=0,b=m[d];x<b.length;x+=1){var w=b[x],_=w.x,A=w.y,S=n[0]*_+n[4]*A+n[12],k=n[1]*_+n[5]*A+n[13],I=n[2]*_+n[6]*A+n[14],z=n[3]*_+n[7]*A+n[15],C=I+l,E=z+p,P=S+c,M=k+h,B=I+f,T=z+y,V=new i((S+s)/E,(k+u)/E);V.z=C/E,v.push(V);var F=new i(P/T,M/T);F.z=B/T,g.push(F);}a.push(v),o.push(g);}return [a,o]}(n,c,p,u);return function(t,e,r){var n=1/0;Na(r,e)&&(n=zs(r,e[0]));for(var i=0;i<e.length;i++)for(var a=e[i],o=t[i],s=0;s<a.length-1;s++){var u=a[s],l=[u,a[s+1],o[s+1],o[s],u];ja(r,l)&&(n=Math.min(n,zs(r,l)));}return n!==1/0&&n}(f[0],f[1],h)},e}(wi);function Is(t,e){return t.x*e.x+t.y*e.y}function zs(t,e){if(1===t.length){for(var r,n=0,i=e[n++];!r||i.equals(r);)if(!(r=e[n++]))return 1/0;for(;n<e.length;n++){var a=e[n],o=t[0],s=r.sub(i),u=a.sub(i),l=o.sub(i),p=Is(s,s),c=Is(s,u),h=Is(u,u),f=Is(l,s),y=Is(l,u),d=p*h-c*c,m=(h*f-c*y)/d,v=(p*y-c*f)/d,g=i.z*(1-m-v)+r.z*m+a.z*v;if(isFinite(g))return g}return 1/0}for(var x=1/0,b=0,w=e;b<w.length;b+=1)x=Math.min(x,w[b].z);return x}var Cs=ki([{name:"a_pos_normal",components:2,type:"Int16"},{name:"a_data",components:4,type:"Uint8"}],4).members,Es=ki([{name:"a_uv_x",components:1,type:"Float32"},{name:"a_split_index",components:1,type:"Float32"}]).members,Ps=gs.VectorTileFeature.types,Ms=Math.cos(Math.PI/180*37.5),Bs=Math.pow(2,14)/.5,Ts=function(t){var e=this;this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map((function(t){return t.id})),this.index=t.index,this.hasPattern=!1,this.patternFeatures=[],this.lineClipsArray=[],this.gradients={},this.layers.forEach((function(t){e.gradients[t.id]={};})),this.layoutVertexArray=new Pi,this.layoutVertexArray2=new Mi,this.indexArray=new Ui,this.programConfigurations=new Ta(t.layers,t.zoom),this.segments=new oa,this.maxLineLength=0,this.stateDependentLayerIds=this.layers.filter((function(t){return t.isStateDependent()})).map((function(t){return t.id}));};Ts.prototype.populate=function(t,e,r){this.hasPattern=ns("line",this.layers,e);for(var n=this.layers[0].layout.get("line-sort-key"),i=[],a=0,o=t;a<o.length;a+=1){var s=o[a],u=s.feature,l=s.id,p=s.index,c=s.sourceLayerIndex,h=this.layers[0]._featureFilter.needGeometry,f={type:u.type,id:l,properties:u.properties,geometry:h?Ra(u):[]};if(this.layers[0]._featureFilter.filter(new oi(this.zoom),f,r)){h||(f.geometry=Ra(u));var y=n?n.evaluate(f,{},r):void 0;i.push({id:l,properties:u.properties,type:u.type,sourceLayerIndex:c,index:p,geometry:f.geometry,patterns:{},sortKey:y});}}n&&i.sort((function(t,e){return t.sortKey-e.sortKey}));for(var d=0,m=i;d<m.length;d+=1){var v=m[d],g=v.geometry,x=v.index,b=v.sourceLayerIndex;if(this.hasPattern){var w=is("line",this.layers,v,this.zoom,e);this.patternFeatures.push(w);}else this.addFeature(v,g,x,r,{});e.featureIndex.insert(t[x].feature,g,x,b,this.index);}},Ts.prototype.update=function(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);},Ts.prototype.addFeatures=function(t,e,r){for(var n=0,i=this.patternFeatures;n<i.length;n+=1){var a=i[n];this.addFeature(a,a.geometry,a.index,e,r);}},Ts.prototype.isEmpty=function(){return 0===this.layoutVertexArray.length},Ts.prototype.uploadPending=function(){return !this.uploaded||this.programConfigurations.needsUpload},Ts.prototype.upload=function(t){this.uploaded||(0!==this.layoutVertexArray2.length&&(this.layoutVertexBuffer2=t.createVertexBuffer(this.layoutVertexArray2,Es)),this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,Cs),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;},Ts.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());},Ts.prototype.lineFeatureClips=function(t){if(t.properties&&t.properties.hasOwnProperty("mapbox_clip_start")&&t.properties.hasOwnProperty("mapbox_clip_end"))return {start:+t.properties.mapbox_clip_start,end:+t.properties.mapbox_clip_end}},Ts.prototype.addFeature=function(t,e,r,n,i){var a=this.layers[0].layout,o=a.get("line-join").evaluate(t,{}),s=a.get("line-cap"),u=a.get("line-miter-limit"),l=a.get("line-round-limit");this.lineClips=this.lineFeatureClips(t);for(var p=0,c=e;p<c.length;p+=1)this.addLine(c[p],t,o,s,u,l);this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,i,n);},Ts.prototype.addLine=function(t,e,r,n,i,a){if(this.distance=0,this.scaledDistance=0,this.totalDistance=0,this.lineClips){this.lineClipsArray.push(this.lineClips);for(var o=0;o<t.length-1;o++)this.totalDistance+=t[o].dist(t[o+1]);this.updateScaledDistance(),this.maxLineLength=Math.max(this.maxLineLength,this.totalDistance);}for(var s="Polygon"===Ps[e.type],u=t.length;u>=2&&t[u-1].equals(t[u-2]);)u--;for(var l=0;l<u-1&&t[l].equals(t[l+1]);)l++;if(!(u<(s?3:2))){"bevel"===r&&(i=1.05);var p,c=this.overscaling<=16?122880/(512*this.overscaling):0,h=this.segments.prepareSegment(10*u,this.layoutVertexArray,this.indexArray),f=void 0,y=void 0,d=void 0,m=void 0;this.e1=this.e2=-1,s&&(m=t[l].sub(p=t[u-2])._unit()._perp());for(var v=l;v<u;v++)if(!(y=v===u-1?s?t[l+1]:void 0:t[v+1])||!t[v].equals(y)){m&&(d=m),p&&(f=p),p=t[v],m=y?y.sub(p)._unit()._perp():d;var g=(d=d||m).add(m);0===g.x&&0===g.y||g._unit();var x=d.x*m.x+d.y*m.y,b=g.x*m.x+g.y*m.y,w=0!==b?1/b:1/0,_=2*Math.sqrt(2-2*b),A=b<Ms&&f&&y,S=d.x*m.y-d.y*m.x>0;if(A&&v>l){var k=p.dist(f);if(k>2*c){var I=p.sub(p.sub(f)._mult(c/k)._round());this.updateDistance(f,I),this.addCurrentVertex(I,d,0,0,h),f=I;}}var z=f&&y,C=z?r:s?"butt":n;if(z&&"round"===C&&(w<a?C="miter":w<=2&&(C="fakeround")),"miter"===C&&w>i&&(C="bevel"),"bevel"===C&&(w>2&&(C="flipbevel"),w<i&&(C="miter")),f&&this.updateDistance(f,p),"miter"===C)g._mult(w),this.addCurrentVertex(p,g,0,0,h);else if("flipbevel"===C){if(w>100)g=m.mult(-1);else {var E=w*d.add(m).mag()/d.sub(m).mag();g._perp()._mult(E*(S?-1:1));}this.addCurrentVertex(p,g,0,0,h),this.addCurrentVertex(p,g.mult(-1),0,0,h);}else if("bevel"===C||"fakeround"===C){var P=-Math.sqrt(w*w-1),M=S?P:0,B=S?0:P;if(f&&this.addCurrentVertex(p,d,M,B,h),"fakeround"===C)for(var T=Math.round(180*_/Math.PI/20),V=1;V<T;V++){var F=V/T;if(.5!==F){var D=F-.5;F+=F*D*(F-1)*((1.0904+x*(x*(3.55645-1.43519*x)-3.2452))*D*D+(.848013+x*(.215638*x-1.06021)));}var L=m.sub(d)._mult(F)._add(d)._unit()._mult(S?-1:1);this.addHalfVertex(p,L.x,L.y,!1,S,0,h);}y&&this.addCurrentVertex(p,m,-M,-B,h);}else if("butt"===C)this.addCurrentVertex(p,g,0,0,h);else if("square"===C){var R=f?1:-1;this.addCurrentVertex(p,g,R,R,h);}else "round"===C&&(f&&(this.addCurrentVertex(p,d,0,0,h),this.addCurrentVertex(p,d,1,1,h,!0)),y&&(this.addCurrentVertex(p,m,-1,-1,h,!0),this.addCurrentVertex(p,m,0,0,h)));if(A&&v<u-1){var O=p.dist(y);if(O>2*c){var U=p.add(y.sub(p)._mult(c/O)._round());this.updateDistance(p,U),this.addCurrentVertex(U,m,0,0,h),p=U;}}}}},Ts.prototype.addCurrentVertex=function(t,e,r,n,i,a){void 0===a&&(a=!1);var o=e.y*n-e.x,s=-e.y-e.x*n;this.addHalfVertex(t,e.x+e.y*r,e.y-e.x*r,a,!1,r,i),this.addHalfVertex(t,o,s,a,!0,-n,i),this.distance>Bs/2&&0===this.totalDistance&&(this.distance=0,this.addCurrentVertex(t,e,r,n,i,a));},Ts.prototype.addHalfVertex=function(t,e,r,n,i,a,o){var s=.5*(this.lineClips?this.scaledDistance*(Bs-1):this.scaledDistance);this.layoutVertexArray.emplaceBack((t.x<<1)+(n?1:0),(t.y<<1)+(i?1:0),Math.round(63*e)+128,Math.round(63*r)+128,1+(0===a?0:a<0?-1:1)|(63&s)<<2,s>>6),this.lineClips&&this.layoutVertexArray2.emplaceBack((this.scaledDistance-this.lineClips.start)/(this.lineClips.end-this.lineClips.start),this.lineClipsArray.length);var u=o.vertexLength++;this.e1>=0&&this.e2>=0&&(this.indexArray.emplaceBack(this.e1,this.e2,u),o.primitiveLength++),i?this.e2=u:this.e1=u;},Ts.prototype.updateScaledDistance=function(){this.scaledDistance=this.lineClips?this.lineClips.start+(this.lineClips.end-this.lineClips.start)*this.distance/this.totalDistance:this.distance;},Ts.prototype.updateDistance=function(t,e){this.distance+=t.dist(e),this.updateScaledDistance();},Ln("LineBucket",Ts,{omit:["layers","patternFeatures"]});var Vs=new bi({"line-cap":new di(Ct.layout_line["line-cap"]),"line-join":new mi(Ct.layout_line["line-join"]),"line-miter-limit":new di(Ct.layout_line["line-miter-limit"]),"line-round-limit":new di(Ct.layout_line["line-round-limit"]),"line-sort-key":new mi(Ct.layout_line["line-sort-key"])}),Fs={paint:new bi({"line-opacity":new mi(Ct.paint_line["line-opacity"]),"line-color":new mi(Ct.paint_line["line-color"]),"line-translate":new di(Ct.paint_line["line-translate"]),"line-translate-anchor":new di(Ct.paint_line["line-translate-anchor"]),"line-width":new mi(Ct.paint_line["line-width"]),"line-gap-width":new mi(Ct.paint_line["line-gap-width"]),"line-offset":new mi(Ct.paint_line["line-offset"]),"line-blur":new mi(Ct.paint_line["line-blur"]),"line-dasharray":new gi(Ct.paint_line["line-dasharray"]),"line-pattern":new vi(Ct.paint_line["line-pattern"]),"line-gradient":new xi(Ct.paint_line["line-gradient"])}),layout:Vs},Ds=new(function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.possiblyEvaluate=function(e,r){return r=new oi(Math.floor(r.zoom),{now:r.now,fadeDuration:r.fadeDuration,zoomHistory:r.zoomHistory,transition:r.transition}),t.prototype.possiblyEvaluate.call(this,e,r)},e.prototype.evaluate=function(e,r,n,i){return r=h({},r,{zoom:Math.floor(r.zoom)}),t.prototype.evaluate.call(this,e,r,n,i)},e}(mi))(Fs.paint.properties["line-width"].specification);Ds.useIntegerZoom=!0;var Ls=function(t){function e(e){t.call(this,e,Fs),this.gradientVersion=0;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._handleSpecialPaintPropertyUpdate=function(t){"line-gradient"===t&&(this.stepInterpolant=this._transitionablePaint._values["line-gradient"].value.expression._styleExpression.expression instanceof qe,this.gradientVersion=(this.gradientVersion+1)%s);},e.prototype.gradientExpression=function(){return this._transitionablePaint._values["line-gradient"].value.expression},e.prototype.recalculate=function(e,r){t.prototype.recalculate.call(this,e,r),this.paint._values["line-floorwidth"]=Ds.possiblyEvaluate(this._transitioningPaint._values["line-width"].value,e);},e.prototype.createBucket=function(t){return new Ts(t)},e.prototype.queryRadius=function(t){var e=t,r=Rs(Wa("line-width",this,e),Wa("line-gap-width",this,e)),n=Wa("line-offset",this,e);return r/2+Math.abs(n)+Qa(this.paint.get("line-translate"))},e.prototype.queryIntersectsFeature=function(t,e,r,n,a,o,s){var u=to(t,this.paint.get("line-translate"),this.paint.get("line-translate-anchor"),o.angle,s),l=s/2*Rs(this.paint.get("line-width").evaluate(e,r),this.paint.get("line-gap-width").evaluate(e,r)),p=this.paint.get("line-offset").evaluate(e,r);return p&&(n=function(t,e){for(var r=[],n=new i(0,0),a=0;a<t.length;a++){for(var o=t[a],s=[],u=0;u<o.length;u++){var l=o[u],p=o[u+1],c=0===u?n:l.sub(o[u-1])._unit()._perp(),h=u===o.length-1?n:p.sub(l)._unit()._perp(),f=c._add(h)._unit();f._mult(1/(f.x*h.x+f.y*h.y)),s.push(f._mult(e)._add(l));}r.push(s);}return r}(n,p*s)),function(t,e,r){for(var n=0;n<e.length;n++){var i=e[n];if(t.length>=3)for(var a=0;a<i.length;a++)if(Ya(t,i[a]))return !0;if(Ka(t,i,r))return !0}return !1}(u,n,l)},e.prototype.isTileClipped=function(){return !0},e}(wi);function Rs(t,e){return e>0?e+2*t:t}var Os=ki([{name:"a_pos_offset",components:4,type:"Int16"},{name:"a_data",components:4,type:"Uint16"},{name:"a_pixeloffset",components:4,type:"Int16"}],4),Us=ki([{name:"a_projected_pos",components:3,type:"Float32"}],4),js=(ki([{name:"a_fade_opacity",components:1,type:"Uint32"}],4),ki([{name:"a_placed",components:2,type:"Uint8"},{name:"a_shift",components:2,type:"Float32"}])),qs=(ki([{type:"Int16",name:"anchorPointX"},{type:"Int16",name:"anchorPointY"},{type:"Int16",name:"x1"},{type:"Int16",name:"y1"},{type:"Int16",name:"x2"},{type:"Int16",name:"y2"},{type:"Uint32",name:"featureIndex"},{type:"Uint16",name:"sourceLayerIndex"},{type:"Uint16",name:"bucketIndex"}]),ki([{name:"a_pos",components:2,type:"Int16"},{name:"a_anchor_pos",components:2,type:"Int16"},{name:"a_extrude",components:2,type:"Int16"}],4)),Ns=ki([{name:"a_pos",components:2,type:"Float32"},{name:"a_radius",components:1,type:"Float32"},{name:"a_flags",components:2,type:"Int16"}],4);function Ks(t,e,r){return t.sections.forEach((function(t){t.text=function(t,e,r){var n=e.layout.get("text-transform").evaluate(r,{});return "uppercase"===n?t=t.toLocaleUpperCase():"lowercase"===n&&(t=t.toLocaleLowerCase()),ai.applyArabicShaping&&(t=ai.applyArabicShaping(t)),t}(t.text,e,r);})),t}ki([{name:"triangle",components:3,type:"Uint16"}]),ki([{type:"Int16",name:"anchorX"},{type:"Int16",name:"anchorY"},{type:"Uint16",name:"glyphStartIndex"},{type:"Uint16",name:"numGlyphs"},{type:"Uint32",name:"vertexStartIndex"},{type:"Uint32",name:"lineStartIndex"},{type:"Uint32",name:"lineLength"},{type:"Uint16",name:"segment"},{type:"Uint16",name:"lowerSize"},{type:"Uint16",name:"upperSize"},{type:"Float32",name:"lineOffsetX"},{type:"Float32",name:"lineOffsetY"},{type:"Uint8",name:"writingMode"},{type:"Uint8",name:"placedOrientation"},{type:"Uint8",name:"hidden"},{type:"Uint32",name:"crossTileID"},{type:"Int16",name:"associatedIconIndex"}]),ki([{type:"Int16",name:"anchorX"},{type:"Int16",name:"anchorY"},{type:"Int16",name:"rightJustifiedTextSymbolIndex"},{type:"Int16",name:"centerJustifiedTextSymbolIndex"},{type:"Int16",name:"leftJustifiedTextSymbolIndex"},{type:"Int16",name:"verticalPlacedTextSymbolIndex"},{type:"Int16",name:"placedIconSymbolIndex"},{type:"Int16",name:"verticalPlacedIconSymbolIndex"},{type:"Uint16",name:"key"},{type:"Uint16",name:"textBoxStartIndex"},{type:"Uint16",name:"textBoxEndIndex"},{type:"Uint16",name:"verticalTextBoxStartIndex"},{type:"Uint16",name:"verticalTextBoxEndIndex"},{type:"Uint16",name:"iconBoxStartIndex"},{type:"Uint16",name:"iconBoxEndIndex"},{type:"Uint16",name:"verticalIconBoxStartIndex"},{type:"Uint16",name:"verticalIconBoxEndIndex"},{type:"Uint16",name:"featureIndex"},{type:"Uint16",name:"numHorizontalGlyphVertices"},{type:"Uint16",name:"numVerticalGlyphVertices"},{type:"Uint16",name:"numIconVertices"},{type:"Uint16",name:"numVerticalIconVertices"},{type:"Uint16",name:"useRuntimeCollisionCircles"},{type:"Uint32",name:"crossTileID"},{type:"Float32",name:"textBoxScale"},{type:"Float32",components:2,name:"textOffset"},{type:"Float32",name:"collisionCircleDiameter"}]),ki([{type:"Float32",name:"offsetX"}]),ki([{type:"Int16",name:"x"},{type:"Int16",name:"y"},{type:"Int16",name:"tileUnitDistanceFromAnchor"}]);var Gs={"!":"︕","#":"＃",$:"＄","%":"％","&":"＆","(":"︵",")":"︶","*":"＊","+":"＋",",":"︐","-":"︲",".":"・","/":"／",":":"︓",";":"︔","<":"︿","=":"＝",">":"﹀","?":"︖","@":"＠","[":"﹇","\\":"＼","]":"﹈","^":"＾",_:"︳","`":"｀","{":"︷","|":"―","}":"︸","~":"～","¢":"￠","£":"￡","¥":"￥","¦":"￤","¬":"￢","¯":"￣","–":"︲","—":"︱","‘":"﹃","’":"﹄","“":"﹁","”":"﹂","…":"︙","‧":"・","₩":"￦","、":"︑","。":"︒","〈":"︿","〉":"﹀","《":"︽","》":"︾","「":"﹁","」":"﹂","『":"﹃","』":"﹄","【":"︻","】":"︼","〔":"︹","〕":"︺","〖":"︗","〗":"︘","！":"︕","（":"︵","）":"︶","，":"︐","－":"︲","．":"・","：":"︓","；":"︔","＜":"︿","＞":"﹀","？":"︖","［":"﹇","］":"﹈","＿":"︳","｛":"︷","｜":"―","｝":"︸","｟":"︵","｠":"︶","｡":"︒","｢":"﹁","｣":"﹂"},Zs=function(t,e,r,n,i){var a,o,s=8*i-n-1,u=(1<<s)-1,l=u>>1,p=-7,c=r?i-1:0,h=r?-1:1,f=t[e+c];for(c+=h,a=f&(1<<-p)-1,f>>=-p,p+=s;p>0;a=256*a+t[e+c],c+=h,p-=8);for(o=a&(1<<-p)-1,a>>=-p,p+=n;p>0;o=256*o+t[e+c],c+=h,p-=8);if(0===a)a=1-l;else {if(a===u)return o?NaN:1/0*(f?-1:1);o+=Math.pow(2,n),a-=l;}return (f?-1:1)*o*Math.pow(2,a-n)},Xs=function(t,e,r,n,i,a){var o,s,u,l=8*a-i-1,p=(1<<l)-1,c=p>>1,h=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,f=n?0:a-1,y=n?1:-1,d=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,o=p):(o=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-o))<1&&(o--,u*=2),(e+=o+c>=1?h/u:h*Math.pow(2,1-c))*u>=2&&(o++,u/=2),o+c>=p?(s=0,o=p):o+c>=1?(s=(e*u-1)*Math.pow(2,i),o+=c):(s=e*Math.pow(2,c-1)*Math.pow(2,i),o=0));i>=8;t[r+f]=255&s,f+=y,s/=256,i-=8);for(o=o<<i|s,l+=i;l>0;t[r+f]=255&o,f+=y,o/=256,l-=8);t[r+f-y]|=128*d;},Js=Hs;function Hs(t){this.buf=ArrayBuffer.isView&&ArrayBuffer.isView(t)?t:new Uint8Array(t||0),this.pos=0,this.type=0,this.length=this.buf.length;}Hs.Varint=0,Hs.Fixed64=1,Hs.Bytes=2,Hs.Fixed32=5;var Ys="undefined"==typeof TextDecoder?null:new TextDecoder("utf8");function $s(t){return t.type===Hs.Bytes?t.readVarint()+t.pos:t.pos+1}function Ws(t,e,r){return r?4294967296*e+(t>>>0):4294967296*(e>>>0)+(t>>>0)}function Qs(t,e,r){var n=e<=16383?1:e<=2097151?2:e<=268435455?3:Math.floor(Math.log(e)/(7*Math.LN2));r.realloc(n);for(var i=r.pos-1;i>=t;i--)r.buf[i+n]=r.buf[i];}function tu(t,e){for(var r=0;r<t.length;r++)e.writeVarint(t[r]);}function eu(t,e){for(var r=0;r<t.length;r++)e.writeSVarint(t[r]);}function ru(t,e){for(var r=0;r<t.length;r++)e.writeFloat(t[r]);}function nu(t,e){for(var r=0;r<t.length;r++)e.writeDouble(t[r]);}function iu(t,e){for(var r=0;r<t.length;r++)e.writeBoolean(t[r]);}function au(t,e){for(var r=0;r<t.length;r++)e.writeFixed32(t[r]);}function ou(t,e){for(var r=0;r<t.length;r++)e.writeSFixed32(t[r]);}function su(t,e){for(var r=0;r<t.length;r++)e.writeFixed64(t[r]);}function uu(t,e){for(var r=0;r<t.length;r++)e.writeSFixed64(t[r]);}function lu(t,e){return (t[e]|t[e+1]<<8|t[e+2]<<16)+16777216*t[e+3]}function pu(t,e,r){t[r]=e,t[r+1]=e>>>8,t[r+2]=e>>>16,t[r+3]=e>>>24;}function cu(t,e){return (t[e]|t[e+1]<<8|t[e+2]<<16)+(t[e+3]<<24)}function hu(t,e,r){1===t&&r.readMessage(fu,e);}function fu(t,e,r){if(3===t){var n=r.readMessage(yu,{}),i=n.width,a=n.height,o=n.left,s=n.top,u=n.advance;e.push({id:n.id,bitmap:new mo({width:i+6,height:a+6},n.bitmap),metrics:{width:i,height:a,left:o,top:s,advance:u}});}}function yu(t,e,r){1===t?e.id=r.readVarint():2===t?e.bitmap=r.readBytes():3===t?e.width=r.readVarint():4===t?e.height=r.readVarint():5===t?e.left=r.readSVarint():6===t?e.top=r.readSVarint():7===t&&(e.advance=r.readVarint());}function du(t){for(var e=0,r=0,n=0,i=t;n<i.length;n+=1){var a=i[n];e+=a.w*a.h,r=Math.max(r,a.w);}t.sort((function(t,e){return e.h-t.h}));for(var o=[{x:0,y:0,w:Math.max(Math.ceil(Math.sqrt(e/.95)),r),h:1/0}],s=0,u=0,l=0,p=t;l<p.length;l+=1)for(var c=p[l],h=o.length-1;h>=0;h--){var f=o[h];if(!(c.w>f.w||c.h>f.h)){if(c.x=f.x,c.y=f.y,u=Math.max(u,c.y+c.h),s=Math.max(s,c.x+c.w),c.w===f.w&&c.h===f.h){var y=o.pop();h<o.length&&(o[h]=y);}else c.h===f.h?(f.x+=c.w,f.w-=c.w):c.w===f.w?(f.y+=c.h,f.h-=c.h):(o.push({x:f.x+c.w,y:f.y,w:f.w-c.w,h:c.h}),f.y+=c.h,f.h-=c.h);break}}return {w:s,h:u,fill:e/(s*u)||0}}Hs.prototype={destroy:function(){this.buf=null;},readFields:function(t,e,r){for(r=r||this.length;this.pos<r;){var n=this.readVarint(),i=n>>3,a=this.pos;this.type=7&n,t(i,e,this),this.pos===a&&this.skip(n);}return e},readMessage:function(t,e){return this.readFields(t,e,this.readVarint()+this.pos)},readFixed32:function(){var t=lu(this.buf,this.pos);return this.pos+=4,t},readSFixed32:function(){var t=cu(this.buf,this.pos);return this.pos+=4,t},readFixed64:function(){var t=lu(this.buf,this.pos)+4294967296*lu(this.buf,this.pos+4);return this.pos+=8,t},readSFixed64:function(){var t=lu(this.buf,this.pos)+4294967296*cu(this.buf,this.pos+4);return this.pos+=8,t},readFloat:function(){var t=Zs(this.buf,this.pos,!0,23,4);return this.pos+=4,t},readDouble:function(){var t=Zs(this.buf,this.pos,!0,52,8);return this.pos+=8,t},readVarint:function(t){var e,r,n=this.buf;return e=127&(r=n[this.pos++]),r<128?e:(e|=(127&(r=n[this.pos++]))<<7,r<128?e:(e|=(127&(r=n[this.pos++]))<<14,r<128?e:(e|=(127&(r=n[this.pos++]))<<21,r<128?e:function(t,e,r){var n,i,a=r.buf;if(n=(112&(i=a[r.pos++]))>>4,i<128)return Ws(t,n,e);if(n|=(127&(i=a[r.pos++]))<<3,i<128)return Ws(t,n,e);if(n|=(127&(i=a[r.pos++]))<<10,i<128)return Ws(t,n,e);if(n|=(127&(i=a[r.pos++]))<<17,i<128)return Ws(t,n,e);if(n|=(127&(i=a[r.pos++]))<<24,i<128)return Ws(t,n,e);if(n|=(1&(i=a[r.pos++]))<<31,i<128)return Ws(t,n,e);throw new Error("Expected varint not more than 10 bytes")}(e|=(15&(r=n[this.pos]))<<28,t,this))))},readVarint64:function(){return this.readVarint(!0)},readSVarint:function(){var t=this.readVarint();return t%2==1?(t+1)/-2:t/2},readBoolean:function(){return Boolean(this.readVarint())},readString:function(){var t=this.readVarint()+this.pos,e=this.pos;return this.pos=t,t-e>=12&&Ys?function(t,e,r){return Ys.decode(t.subarray(e,r))}(this.buf,e,t):function(t,e,r){for(var n="",i=e;i<r;){var a,o,s,u=t[i],l=null,p=u>239?4:u>223?3:u>191?2:1;if(i+p>r)break;1===p?u<128&&(l=u):2===p?128==(192&(a=t[i+1]))&&(l=(31&u)<<6|63&a)<=127&&(l=null):3===p?(o=t[i+2],128==(192&(a=t[i+1]))&&128==(192&o)&&((l=(15&u)<<12|(63&a)<<6|63&o)<=2047||l>=55296&&l<=57343)&&(l=null)):4===p&&(o=t[i+2],s=t[i+3],128==(192&(a=t[i+1]))&&128==(192&o)&&128==(192&s)&&((l=(15&u)<<18|(63&a)<<12|(63&o)<<6|63&s)<=65535||l>=1114112)&&(l=null)),null===l?(l=65533,p=1):l>65535&&(l-=65536,n+=String.fromCharCode(l>>>10&1023|55296),l=56320|1023&l),n+=String.fromCharCode(l),i+=p;}return n}(this.buf,e,t)},readBytes:function(){var t=this.readVarint()+this.pos,e=this.buf.subarray(this.pos,t);return this.pos=t,e},readPackedVarint:function(t,e){if(this.type!==Hs.Bytes)return t.push(this.readVarint(e));var r=$s(this);for(t=t||[];this.pos<r;)t.push(this.readVarint(e));return t},readPackedSVarint:function(t){if(this.type!==Hs.Bytes)return t.push(this.readSVarint());var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readSVarint());return t},readPackedBoolean:function(t){if(this.type!==Hs.Bytes)return t.push(this.readBoolean());var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readBoolean());return t},readPackedFloat:function(t){if(this.type!==Hs.Bytes)return t.push(this.readFloat());var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readFloat());return t},readPackedDouble:function(t){if(this.type!==Hs.Bytes)return t.push(this.readDouble());var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readDouble());return t},readPackedFixed32:function(t){if(this.type!==Hs.Bytes)return t.push(this.readFixed32());var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readFixed32());return t},readPackedSFixed32:function(t){if(this.type!==Hs.Bytes)return t.push(this.readSFixed32());var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readSFixed32());return t},readPackedFixed64:function(t){if(this.type!==Hs.Bytes)return t.push(this.readFixed64());var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readFixed64());return t},readPackedSFixed64:function(t){if(this.type!==Hs.Bytes)return t.push(this.readSFixed64());var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readSFixed64());return t},skip:function(t){var e=7&t;if(e===Hs.Varint)for(;this.buf[this.pos++]>127;);else if(e===Hs.Bytes)this.pos=this.readVarint()+this.pos;else if(e===Hs.Fixed32)this.pos+=4;else {if(e!==Hs.Fixed64)throw new Error("Unimplemented type: "+e);this.pos+=8;}},writeTag:function(t,e){this.writeVarint(t<<3|e);},realloc:function(t){for(var e=this.length||16;e<this.pos+t;)e*=2;if(e!==this.length){var r=new Uint8Array(e);r.set(this.buf),this.buf=r,this.length=e;}},finish:function(){return this.length=this.pos,this.pos=0,this.buf.subarray(0,this.length)},writeFixed32:function(t){this.realloc(4),pu(this.buf,t,this.pos),this.pos+=4;},writeSFixed32:function(t){this.realloc(4),pu(this.buf,t,this.pos),this.pos+=4;},writeFixed64:function(t){this.realloc(8),pu(this.buf,-1&t,this.pos),pu(this.buf,Math.floor(t*(1/4294967296)),this.pos+4),this.pos+=8;},writeSFixed64:function(t){this.realloc(8),pu(this.buf,-1&t,this.pos),pu(this.buf,Math.floor(t*(1/4294967296)),this.pos+4),this.pos+=8;},writeVarint:function(t){(t=+t||0)>268435455||t<0?function(t,e){var r,n;if(t>=0?(r=t%4294967296|0,n=t/4294967296|0):(n=~(-t/4294967296),4294967295^(r=~(-t%4294967296))?r=r+1|0:(r=0,n=n+1|0)),t>=0x10000000000000000||t<-0x10000000000000000)throw new Error("Given varint doesn't fit into 10 bytes");e.realloc(10),function(t,e,r){r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,r.buf[r.pos]=127&(t>>>=7);}(r,0,e),function(t,e){var r=(7&t)<<4;e.buf[e.pos++]|=r|((t>>>=3)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t)))));}(n,e);}(t,this):(this.realloc(4),this.buf[this.pos++]=127&t|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=t>>>7&127))));},writeSVarint:function(t){this.writeVarint(t<0?2*-t-1:2*t);},writeBoolean:function(t){this.writeVarint(Boolean(t));},writeString:function(t){t=String(t),this.realloc(4*t.length),this.pos++;var e=this.pos;this.pos=function(t,e,r){for(var n,i,a=0;a<e.length;a++){if((n=e.charCodeAt(a))>55295&&n<57344){if(!i){n>56319||a+1===e.length?(t[r++]=239,t[r++]=191,t[r++]=189):i=n;continue}if(n<56320){t[r++]=239,t[r++]=191,t[r++]=189,i=n;continue}n=i-55296<<10|n-56320|65536,i=null;}else i&&(t[r++]=239,t[r++]=191,t[r++]=189,i=null);n<128?t[r++]=n:(n<2048?t[r++]=n>>6|192:(n<65536?t[r++]=n>>12|224:(t[r++]=n>>18|240,t[r++]=n>>12&63|128),t[r++]=n>>6&63|128),t[r++]=63&n|128);}return r}(this.buf,t,this.pos);var r=this.pos-e;r>=128&&Qs(e,r,this),this.pos=e-1,this.writeVarint(r),this.pos+=r;},writeFloat:function(t){this.realloc(4),Xs(this.buf,t,this.pos,!0,23,4),this.pos+=4;},writeDouble:function(t){this.realloc(8),Xs(this.buf,t,this.pos,!0,52,8),this.pos+=8;},writeBytes:function(t){var e=t.length;this.writeVarint(e),this.realloc(e);for(var r=0;r<e;r++)this.buf[this.pos++]=t[r];},writeRawMessage:function(t,e){this.pos++;var r=this.pos;t(e,this);var n=this.pos-r;n>=128&&Qs(r,n,this),this.pos=r-1,this.writeVarint(n),this.pos+=n;},writeMessage:function(t,e,r){this.writeTag(t,Hs.Bytes),this.writeRawMessage(e,r);},writePackedVarint:function(t,e){e.length&&this.writeMessage(t,tu,e);},writePackedSVarint:function(t,e){e.length&&this.writeMessage(t,eu,e);},writePackedBoolean:function(t,e){e.length&&this.writeMessage(t,iu,e);},writePackedFloat:function(t,e){e.length&&this.writeMessage(t,ru,e);},writePackedDouble:function(t,e){e.length&&this.writeMessage(t,nu,e);},writePackedFixed32:function(t,e){e.length&&this.writeMessage(t,au,e);},writePackedSFixed32:function(t,e){e.length&&this.writeMessage(t,ou,e);},writePackedFixed64:function(t,e){e.length&&this.writeMessage(t,su,e);},writePackedSFixed64:function(t,e){e.length&&this.writeMessage(t,uu,e);},writeBytesField:function(t,e){this.writeTag(t,Hs.Bytes),this.writeBytes(e);},writeFixed32Field:function(t,e){this.writeTag(t,Hs.Fixed32),this.writeFixed32(e);},writeSFixed32Field:function(t,e){this.writeTag(t,Hs.Fixed32),this.writeSFixed32(e);},writeFixed64Field:function(t,e){this.writeTag(t,Hs.Fixed64),this.writeFixed64(e);},writeSFixed64Field:function(t,e){this.writeTag(t,Hs.Fixed64),this.writeSFixed64(e);},writeVarintField:function(t,e){this.writeTag(t,Hs.Varint),this.writeVarint(e);},writeSVarintField:function(t,e){this.writeTag(t,Hs.Varint),this.writeSVarint(e);},writeStringField:function(t,e){this.writeTag(t,Hs.Bytes),this.writeString(e);},writeFloatField:function(t,e){this.writeTag(t,Hs.Fixed32),this.writeFloat(e);},writeDoubleField:function(t,e){this.writeTag(t,Hs.Fixed64),this.writeDouble(e);},writeBooleanField:function(t,e){this.writeVarintField(t,Boolean(e));}};var mu=function(t,e){var r=e.pixelRatio,n=e.version,i=e.stretchX,a=e.stretchY,o=e.content;this.paddedRect=t,this.pixelRatio=r,this.stretchX=i,this.stretchY=a,this.content=o,this.version=n;},vu={tl:{configurable:!0},br:{configurable:!0},tlbr:{configurable:!0},displaySize:{configurable:!0}};vu.tl.get=function(){return [this.paddedRect.x+1,this.paddedRect.y+1]},vu.br.get=function(){return [this.paddedRect.x+this.paddedRect.w-1,this.paddedRect.y+this.paddedRect.h-1]},vu.tlbr.get=function(){return this.tl.concat(this.br)},vu.displaySize.get=function(){return [(this.paddedRect.w-2)/this.pixelRatio,(this.paddedRect.h-2)/this.pixelRatio]},Object.defineProperties(mu.prototype,vu);var gu=function(t,e){var r={},n={};this.haveRenderCallbacks=[];var i=[];this.addImages(t,r,i),this.addImages(e,n,i);var a=du(i),o=new vo({width:a.w||1,height:a.h||1});for(var s in t){var u=t[s],l=r[s].paddedRect;vo.copy(u.data,o,{x:0,y:0},{x:l.x+1,y:l.y+1},u.data);}for(var p in e){var c=e[p],h=n[p].paddedRect,f=h.x+1,y=h.y+1,d=c.data.width,m=c.data.height;vo.copy(c.data,o,{x:0,y:0},{x:f,y:y},c.data),vo.copy(c.data,o,{x:0,y:m-1},{x:f,y:y-1},{width:d,height:1}),vo.copy(c.data,o,{x:0,y:0},{x:f,y:y+m},{width:d,height:1}),vo.copy(c.data,o,{x:d-1,y:0},{x:f-1,y:y},{width:1,height:m}),vo.copy(c.data,o,{x:0,y:0},{x:f+d,y:y},{width:1,height:m});}this.image=o,this.iconPositions=r,this.patternPositions=n;};gu.prototype.addImages=function(t,e,r){for(var n in t){var i=t[n],a={x:0,y:0,w:i.data.width+2,h:i.data.height+2};r.push(a),e[n]=new mu(a,i),i.hasRenderCallback&&this.haveRenderCallbacks.push(n);}},gu.prototype.patchUpdatedImages=function(t,e){for(var r in t.dispatchRenderCallbacks(this.haveRenderCallbacks),t.updatedImages)this.patchUpdatedImage(this.iconPositions[r],t.getImage(r),e),this.patchUpdatedImage(this.patternPositions[r],t.getImage(r),e);},gu.prototype.patchUpdatedImage=function(t,e,r){if(t&&e&&t.version!==e.version){t.version=e.version;var n=t.tl;r.update(e.data,void 0,{x:n[0],y:n[1]});}},Ln("ImagePosition",mu),Ln("ImageAtlas",gu);var xu={horizontal:1,vertical:2,horizontalOnly:3},bu=function(){this.scale=1,this.fontStack="",this.imageName=null;};bu.forText=function(t,e){var r=new bu;return r.scale=t||1,r.fontStack=e,r},bu.forImage=function(t){var e=new bu;return e.imageName=t,e};var wu=function(){this.text="",this.sectionIndex=[],this.sections=[],this.imageSectionID=null;};function _u(t,e,r,n,i,a,o,s,u,l,p,c,h,f,y,d){var m,v=wu.fromFeature(t,i);c===xu.vertical&&v.verticalizePunctuation();var g=ai.processBidirectionalText,x=ai.processStyledBidirectionalText;if(g&&1===v.sections.length){m=[];for(var b=0,w=g(v.toString(),Eu(v,l,a,e,n,f,y));b<w.length;b+=1){var _=w[b],A=new wu;A.text=_,A.sections=v.sections;for(var S=0;S<_.length;S++)A.sectionIndex.push(0);m.push(A);}}else if(x){m=[];for(var k=0,I=x(v.text,v.sectionIndex,Eu(v,l,a,e,n,f,y));k<I.length;k+=1){var z=I[k],C=new wu;C.text=z[0],C.sectionIndex=z[1],C.sections=v.sections,m.push(C);}}else m=function(t,e){for(var r=[],n=t.text,i=0,a=0,o=e;a<o.length;a+=1){var s=o[a];r.push(t.substring(i,s)),i=s;}return i<n.length&&r.push(t.substring(i,n.length)),r}(v,Eu(v,l,a,e,n,f,y));var E=[],P={positionedLines:E,text:v.toString(),top:p[1],bottom:p[1],left:p[0],right:p[0],writingMode:c,iconsInText:!1,verticalizable:!1};return function(t,e,r,n,i,a,o,s,u,l,p,c){for(var h=0,f=-17,y=0,d=0,m="right"===s?1:"left"===s?0:.5,v=0,g=0,x=i;g<x.length;g+=1){var b=x[g];b.trim();var w=b.getMaxScale(),_=24*(w-1),A={positionedGlyphs:[],lineOffset:0};t.positionedLines[v]=A;var S=A.positionedGlyphs,k=0;if(b.length()){for(var I=0;I<b.length();I++){var z=b.getSection(I),C=b.getSectionIndex(I),E=b.getCharCode(I),P=0,M=null,B=null,T=null,V=24,F=!(u===xu.horizontal||!p&&!Zn(E)||p&&(Au[E]||(K=E,Kn.Arabic(K)||Kn["Arabic Supplement"](K)||Kn["Arabic Extended-A"](K)||Kn["Arabic Presentation Forms-A"](K)||Kn["Arabic Presentation Forms-B"](K))));if(z.imageName){var D=n[z.imageName];if(!D)continue;T=z.imageName,t.iconsInText=t.iconsInText||!0,B=D.paddedRect;var L=D.displaySize;z.scale=24*z.scale/c,P=_+(24-L[1]*z.scale),V=(M={width:L[0],height:L[1],left:1,top:-3,advance:F?L[1]:L[0]}).advance;var R=F?L[0]*z.scale-24*w:L[1]*z.scale-24*w;R>0&&R>k&&(k=R);}else {var O=r[z.fontStack],U=O&&O[E];if(U&&U.rect)B=U.rect,M=U.metrics;else {var j=e[z.fontStack],q=j&&j[E];if(!q)continue;M=q.metrics;}P=24*(w-z.scale);}F?(t.verticalizable=!0,S.push({glyph:E,imageName:T,x:h,y:f+P,vertical:F,scale:z.scale,fontStack:z.fontStack,sectionIndex:C,metrics:M,rect:B}),h+=V*z.scale+l):(S.push({glyph:E,imageName:T,x:h,y:f+P,vertical:F,scale:z.scale,fontStack:z.fontStack,sectionIndex:C,metrics:M,rect:B}),h+=M.advance*z.scale+l);}0!==S.length&&(y=Math.max(h-l,y),Mu(S,0,S.length-1,m,k)),h=0;var N=a*w+k;A.lineOffset=Math.max(k,_),f+=N,d=Math.max(N,d),++v;}else f+=a,++v;}var K,G=f- -17,Z=Pu(o),X=Z.horizontalAlign,J=Z.verticalAlign;(function(t,e,r,n,i,a,o,s,u){var l,p=(e-r)*i;l=a!==o?-s*n- -17:(-n*u+.5)*o;for(var c=0,h=t;c<h.length;c+=1)for(var f=0,y=h[c].positionedGlyphs;f<y.length;f+=1){var d=y[f];d.x+=p,d.y+=l;}})(t.positionedLines,m,X,J,y,d,a,G,i.length),t.top+=-J*G,t.bottom=t.top+G,t.left+=-X*y,t.right=t.left+y;}(P,e,r,n,m,o,s,u,c,l,h,d),!function(t){for(var e=0,r=t;e<r.length;e+=1)if(0!==r[e].positionedGlyphs.length)return !1;return !0}(E)&&P}wu.fromFeature=function(t,e){for(var r=new wu,n=0;n<t.sections.length;n++){var i=t.sections[n];i.image?r.addImageSection(i):r.addTextSection(i,e);}return r},wu.prototype.length=function(){return this.text.length},wu.prototype.getSection=function(t){return this.sections[this.sectionIndex[t]]},wu.prototype.getSectionIndex=function(t){return this.sectionIndex[t]},wu.prototype.getCharCode=function(t){return this.text.charCodeAt(t)},wu.prototype.verticalizePunctuation=function(){this.text=function(t){for(var e="",r=0;r<t.length;r++){var n=t.charCodeAt(r+1)||null,i=t.charCodeAt(r-1)||null;e+=n&&Xn(n)&&!Gs[t[r+1]]||i&&Xn(i)&&!Gs[t[r-1]]||!Gs[t[r]]?t[r]:Gs[t[r]];}return e}(this.text);},wu.prototype.trim=function(){for(var t=0,e=0;e<this.text.length&&Au[this.text.charCodeAt(e)];e++)t++;for(var r=this.text.length,n=this.text.length-1;n>=0&&n>=t&&Au[this.text.charCodeAt(n)];n--)r--;this.text=this.text.substring(t,r),this.sectionIndex=this.sectionIndex.slice(t,r);},wu.prototype.substring=function(t,e){var r=new wu;return r.text=this.text.substring(t,e),r.sectionIndex=this.sectionIndex.slice(t,e),r.sections=this.sections,r},wu.prototype.toString=function(){return this.text},wu.prototype.getMaxScale=function(){var t=this;return this.sectionIndex.reduce((function(e,r){return Math.max(e,t.sections[r].scale)}),0)},wu.prototype.addTextSection=function(t,e){this.text+=t.text,this.sections.push(bu.forText(t.scale,t.fontStack||e));for(var r=this.sections.length-1,n=0;n<t.text.length;++n)this.sectionIndex.push(r);},wu.prototype.addImageSection=function(t){var e=t.image?t.image.name:"";if(0!==e.length){var r=this.getNextImageSectionCharCode();r?(this.text+=String.fromCharCode(r),this.sections.push(bu.forImage(e)),this.sectionIndex.push(this.sections.length-1)):A("Reached maximum number of images 6401");}else A("Can't add FormattedSection with an empty image.");},wu.prototype.getNextImageSectionCharCode=function(){return this.imageSectionID?this.imageSectionID>=63743?null:++this.imageSectionID:(this.imageSectionID=57344,this.imageSectionID)};var Au={9:!0,10:!0,11:!0,12:!0,13:!0,32:!0},Su={};function ku(t,e,r,n,i,a){if(e.imageName){var o=n[e.imageName];return o?o.displaySize[0]*e.scale*24/a+i:0}var s=r[e.fontStack],u=s&&s[t];return u?u.metrics.advance*e.scale+i:0}function Iu(t,e,r,n){var i=Math.pow(t-e,2);return n?t<e?i/2:2*i:i+Math.abs(r)*r}function zu(t,e,r){var n=0;return 10===t&&(n-=1e4),r&&(n+=150),40!==t&&65288!==t||(n+=50),41!==e&&65289!==e||(n+=50),n}function Cu(t,e,r,n,i,a){for(var o=null,s=Iu(e,r,i,a),u=0,l=n;u<l.length;u+=1){var p=l[u],c=Iu(e-p.x,r,i,a)+p.badness;c<=s&&(o=p,s=c);}return {index:t,x:e,priorBreak:o,badness:s}}function Eu(t,e,r,n,i,a,o){if("point"!==a)return [];if(!t)return [];for(var s,u=[],l=function(t,e,r,n,i,a){for(var o=0,s=0;s<t.length();s++){var u=t.getSection(s);o+=ku(t.getCharCode(s),u,n,i,e,a);}return o/Math.max(1,Math.ceil(o/r))}(t,e,r,n,i,o),p=t.text.indexOf("​")>=0,c=0,h=0;h<t.length();h++){var f=t.getSection(h),y=t.getCharCode(h);if(Au[y]||(c+=ku(y,f,n,i,e,o)),h<t.length()-1){var d=!((s=y)<11904||!(Kn["Bopomofo Extended"](s)||Kn.Bopomofo(s)||Kn["CJK Compatibility Forms"](s)||Kn["CJK Compatibility Ideographs"](s)||Kn["CJK Compatibility"](s)||Kn["CJK Radicals Supplement"](s)||Kn["CJK Strokes"](s)||Kn["CJK Symbols and Punctuation"](s)||Kn["CJK Unified Ideographs Extension A"](s)||Kn["CJK Unified Ideographs"](s)||Kn["Enclosed CJK Letters and Months"](s)||Kn["Halfwidth and Fullwidth Forms"](s)||Kn.Hiragana(s)||Kn["Ideographic Description Characters"](s)||Kn["Kangxi Radicals"](s)||Kn["Katakana Phonetic Extensions"](s)||Kn.Katakana(s)||Kn["Vertical Forms"](s)||Kn["Yi Radicals"](s)||Kn["Yi Syllables"](s)));(Su[y]||d||f.imageName)&&u.push(Cu(h+1,c,l,u,zu(y,t.getCharCode(h+1),d&&p),!1));}}return function t(e){return e?t(e.priorBreak).concat(e.index):[]}(Cu(t.length(),c,l,u,0,!0))}function Pu(t){var e=.5,r=.5;switch(t){case"right":case"top-right":case"bottom-right":e=1;break;case"left":case"top-left":case"bottom-left":e=0;}switch(t){case"bottom":case"bottom-right":case"bottom-left":r=1;break;case"top":case"top-right":case"top-left":r=0;}return {horizontalAlign:e,verticalAlign:r}}function Mu(t,e,r,n,i){if(n||i)for(var a=t[r],o=(t[r].x+a.metrics.advance*a.scale)*n,s=e;s<=r;s++)t[s].x-=o,t[s].y+=i;}function Bu(t,e,r,n,i,a){var o,s=t.image;if(s.content){var u=s.content,l=s.pixelRatio||1;o=[u[0]/l,u[1]/l,s.displaySize[0]-u[2]/l,s.displaySize[1]-u[3]/l];}var p,c,h,f,y=e.left*a,d=e.right*a;"width"===r||"both"===r?(f=i[0]+y-n[3],c=i[0]+d+n[1]):c=(f=i[0]+(y+d-s.displaySize[0])/2)+s.displaySize[0];var m=e.top*a,v=e.bottom*a;return "height"===r||"both"===r?(p=i[1]+m-n[0],h=i[1]+v+n[2]):h=(p=i[1]+(m+v-s.displaySize[1])/2)+s.displaySize[1],{image:s,top:p,right:c,bottom:h,left:f,collisionPadding:o}}Su[10]=!0,Su[32]=!0,Su[38]=!0,Su[40]=!0,Su[41]=!0,Su[43]=!0,Su[45]=!0,Su[47]=!0,Su[173]=!0,Su[183]=!0,Su[8203]=!0,Su[8208]=!0,Su[8211]=!0,Su[8231]=!0;var Tu=function(t){function e(e,r,n,i){t.call(this,e,r),this.angle=n,void 0!==i&&(this.segment=i);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.clone=function(){return new e(this.x,this.y,this.angle,this.segment)},e}(i);function Vu(t,e){var r=e.expression;if("constant"===r.kind)return {kind:"constant",layoutSize:r.evaluate(new oi(t+1))};if("source"===r.kind)return {kind:"source"};for(var n=r.zoomStops,i=r.interpolationType,a=0;a<n.length&&n[a]<=t;)a++;for(var o=a=Math.max(0,a-1);o<n.length&&n[o]<t+1;)o++;o=Math.min(n.length-1,o);var s=n[a],u=n[o];return "composite"===r.kind?{kind:"composite",minZoom:s,maxZoom:u,interpolationType:i}:{kind:"camera",minZoom:s,maxZoom:u,minSize:r.evaluate(new oi(s)),maxSize:r.evaluate(new oi(u)),interpolationType:i}}function Fu(t,e,r){var n=e.uSize,i=r.lowerSize;return "source"===t.kind?i/128:"composite"===t.kind?Ne(i/128,r.upperSize/128,e.uSizeT):n}function Du(t,e){var r=0,n=0;if("constant"===t.kind)n=t.layoutSize;else if("source"!==t.kind){var i=t.interpolationType,a=i?p(ir.interpolationFactor(i,e,t.minZoom,t.maxZoom),0,1):0;"camera"===t.kind?n=Ne(t.minSize,t.maxSize,a):r=a;}return {uSizeT:r,uSize:n}}Ln("Anchor",Tu);var Lu=Object.freeze({__proto__:null,getSizeData:Vu,evaluateSizeForFeature:Fu,evaluateSizeForZoom:Du,SIZE_PACK_FACTOR:128});function Ru(t,e,r,n,i){if(void 0===e.segment)return !0;for(var a=e,o=e.segment+1,s=0;s>-r/2;){if(--o<0)return !1;s-=t[o].dist(a),a=t[o];}s+=t[o].dist(t[o+1]),o++;for(var u=[],l=0;s<r/2;){var p=t[o],c=t[o+1];if(!c)return !1;var h=t[o-1].angleTo(p)-p.angleTo(c);for(h=Math.abs((h+3*Math.PI)%(2*Math.PI)-Math.PI),u.push({distance:s,angleDelta:h}),l+=h;s-u[0].distance>n;)l-=u.shift().angleDelta;if(l>i)return !1;o++,s+=p.dist(c);}return !0}function Ou(t){for(var e=0,r=0;r<t.length-1;r++)e+=t[r].dist(t[r+1]);return e}function Uu(t,e,r){return t?.6*e*r:0}function ju(t,e){return Math.max(t?t.right-t.left:0,e?e.right-e.left:0)}function qu(t,e,r,n,i,a){for(var o=Uu(r,i,a),s=ju(r,n)*a,u=0,l=Ou(t)/2,p=0;p<t.length-1;p++){var c=t[p],h=t[p+1],f=c.dist(h);if(u+f>l){var y=(l-u)/f,d=Ne(c.x,h.x,y),m=Ne(c.y,h.y,y),v=new Tu(d,m,h.angleTo(c),p);return v._round(),!o||Ru(t,v,s,o,e)?v:void 0}u+=f;}}function Nu(t,e,r,n,i,a,o,s,u){var l=Uu(n,a,o),p=ju(n,i),c=p*o,h=0===t[0].x||t[0].x===u||0===t[0].y||t[0].y===u;return e-c<e/4&&(e=c+e/4),function t(e,r,n,i,a,o,s,u,l){for(var p=o/2,c=Ou(e),h=0,f=r-n,y=[],d=0;d<e.length-1;d++){for(var m=e[d],v=e[d+1],g=m.dist(v),x=v.angleTo(m);f+n<h+g;){var b=((f+=n)-h)/g,w=Ne(m.x,v.x,b),_=Ne(m.y,v.y,b);if(w>=0&&w<l&&_>=0&&_<l&&f-p>=0&&f+p<=c){var A=new Tu(w,_,x,d);A._round(),i&&!Ru(e,A,o,i,a)||y.push(A);}}h+=g;}return u||y.length||s||(y=t(e,h/2,n,i,a,o,s,!0,l)),y}(t,h?e/2*s%e:(p/2+2*a)*o*s%e,e,l,r,c,h,!1,u)}function Ku(t,e,r,n,a){for(var o=[],s=0;s<t.length;s++)for(var u=t[s],l=void 0,p=0;p<u.length-1;p++){var c=u[p],h=u[p+1];c.x<e&&h.x<e||(c.x<e?c=new i(e,c.y+(e-c.x)/(h.x-c.x)*(h.y-c.y))._round():h.x<e&&(h=new i(e,c.y+(e-c.x)/(h.x-c.x)*(h.y-c.y))._round()),c.y<r&&h.y<r||(c.y<r?c=new i(c.x+(r-c.y)/(h.y-c.y)*(h.x-c.x),r)._round():h.y<r&&(h=new i(c.x+(r-c.y)/(h.y-c.y)*(h.x-c.x),r)._round()),c.x>=n&&h.x>=n||(c.x>=n?c=new i(n,c.y+(n-c.x)/(h.x-c.x)*(h.y-c.y))._round():h.x>=n&&(h=new i(n,c.y+(n-c.x)/(h.x-c.x)*(h.y-c.y))._round()),c.y>=a&&h.y>=a||(c.y>=a?c=new i(c.x+(a-c.y)/(h.y-c.y)*(h.x-c.x),a)._round():h.y>=a&&(h=new i(c.x+(a-c.y)/(h.y-c.y)*(h.x-c.x),a)._round()),l&&c.equals(l[l.length-1])||o.push(l=[c]),l.push(h)))));}return o}function Gu(t,e,r,n){var a=[],o=t.image,s=o.pixelRatio,u=o.paddedRect.w-2,l=o.paddedRect.h-2,p=t.right-t.left,c=t.bottom-t.top,h=o.stretchX||[[0,u]],f=o.stretchY||[[0,l]],y=function(t,e){return t+e[1]-e[0]},d=h.reduce(y,0),m=f.reduce(y,0),v=u-d,g=l-m,x=0,b=d,w=0,_=m,A=0,S=v,k=0,I=g;if(o.content&&n){var z=o.content;x=Zu(h,0,z[0]),w=Zu(f,0,z[1]),b=Zu(h,z[0],z[2]),_=Zu(f,z[1],z[3]),A=z[0]-x,k=z[1]-w,S=z[2]-z[0]-b,I=z[3]-z[1]-_;}var C=function(n,a,u,l){var h=Ju(n.stretch-x,b,p,t.left),f=Hu(n.fixed-A,S,n.stretch,d),y=Ju(a.stretch-w,_,c,t.top),v=Hu(a.fixed-k,I,a.stretch,m),g=Ju(u.stretch-x,b,p,t.left),z=Hu(u.fixed-A,S,u.stretch,d),C=Ju(l.stretch-w,_,c,t.top),E=Hu(l.fixed-k,I,l.stretch,m),P=new i(h,y),M=new i(g,y),B=new i(g,C),T=new i(h,C),V=new i(f/s,v/s),F=new i(z/s,E/s),D=e*Math.PI/180;if(D){var L=Math.sin(D),R=Math.cos(D),O=[R,-L,L,R];P._matMult(O),M._matMult(O),T._matMult(O),B._matMult(O);}var U=n.stretch+n.fixed,j=a.stretch+a.fixed;return {tl:P,tr:M,bl:T,br:B,tex:{x:o.paddedRect.x+1+U,y:o.paddedRect.y+1+j,w:u.stretch+u.fixed-U,h:l.stretch+l.fixed-j},writingMode:void 0,glyphOffset:[0,0],sectionIndex:0,pixelOffsetTL:V,pixelOffsetBR:F,minFontScaleX:S/s/p,minFontScaleY:I/s/c,isSDF:r}};if(n&&(o.stretchX||o.stretchY))for(var E=Xu(h,v,d),P=Xu(f,g,m),M=0;M<E.length-1;M++)for(var B=E[M],T=E[M+1],V=0;V<P.length-1;V++)a.push(C(B,P[V],T,P[V+1]));else a.push(C({fixed:0,stretch:-1},{fixed:0,stretch:-1},{fixed:0,stretch:u+1},{fixed:0,stretch:l+1}));return a}function Zu(t,e,r){for(var n=0,i=0,a=t;i<a.length;i+=1){var o=a[i];n+=Math.max(e,Math.min(r,o[1]))-Math.max(e,Math.min(r,o[0]));}return n}function Xu(t,e,r){for(var n=[{fixed:-1,stretch:0}],i=0,a=t;i<a.length;i+=1){var o=a[i],s=o[0],u=o[1],l=n[n.length-1];n.push({fixed:s-l.stretch,stretch:l.stretch}),n.push({fixed:s-l.stretch,stretch:l.stretch+(u-s)});}return n.push({fixed:e+1,stretch:r}),n}function Ju(t,e,r,n){return t/e*r+n}function Hu(t,e,r,n){return t-e*r/n}var Yu=function(t,e,r,n,a,o,s,u,l,p){if(this.boxStartIndex=t.length,l){var c=o.top,h=o.bottom,f=o.collisionPadding;f&&(c-=f[1],h+=f[3]);var y=h-c;y>0&&(y=Math.max(10,y),this.circleDiameter=y);}else {var d=o.top*s-u,m=o.bottom*s+u,v=o.left*s-u,g=o.right*s+u,x=o.collisionPadding;if(x&&(v-=x[0]*s,d-=x[1]*s,g+=x[2]*s,m+=x[3]*s),p){var b=new i(v,d),w=new i(g,d),_=new i(v,m),A=new i(g,m),S=p*Math.PI/180;b._rotate(S),w._rotate(S),_._rotate(S),A._rotate(S),v=Math.min(b.x,w.x,_.x,A.x),g=Math.max(b.x,w.x,_.x,A.x),d=Math.min(b.y,w.y,_.y,A.y),m=Math.max(b.y,w.y,_.y,A.y);}t.emplaceBack(e.x,e.y,v,d,g,m,r,n,a);}this.boxEndIndex=t.length;},$u=function(t,e){if(void 0===t&&(t=[]),void 0===e&&(e=Wu),this.data=t,this.length=this.data.length,this.compare=e,this.length>0)for(var r=(this.length>>1)-1;r>=0;r--)this._down(r);};function Wu(t,e){return t<e?-1:t>e?1:0}function Qu(t,e,r){void 0===e&&(e=1),void 0===r&&(r=!1);for(var n=1/0,a=1/0,o=-1/0,s=-1/0,u=t[0],l=0;l<u.length;l++){var p=u[l];(!l||p.x<n)&&(n=p.x),(!l||p.y<a)&&(a=p.y),(!l||p.x>o)&&(o=p.x),(!l||p.y>s)&&(s=p.y);}var c=Math.min(o-n,s-a),h=c/2,f=new $u([],tl);if(0===c)return new i(n,a);for(var y=n;y<o;y+=c)for(var d=a;d<s;d+=c)f.push(new el(y+h,d+h,h,t));for(var m=function(t){for(var e=0,r=0,n=0,i=t[0],a=0,o=i.length,s=o-1;a<o;s=a++){var u=i[a],l=i[s],p=u.x*l.y-l.x*u.y;r+=(u.x+l.x)*p,n+=(u.y+l.y)*p,e+=3*p;}return new el(r/e,n/e,0,t)}(t),v=f.length;f.length;){var g=f.pop();(g.d>m.d||!m.d)&&(m=g,r&&console.log("found best %d after %d probes",Math.round(1e4*g.d)/1e4,v)),g.max-m.d<=e||(f.push(new el(g.p.x-(h=g.h/2),g.p.y-h,h,t)),f.push(new el(g.p.x+h,g.p.y-h,h,t)),f.push(new el(g.p.x-h,g.p.y+h,h,t)),f.push(new el(g.p.x+h,g.p.y+h,h,t)),v+=4);}return r&&(console.log("num probes: "+v),console.log("best distance: "+m.d)),m.p}function tl(t,e){return e.max-t.max}function el(t,e,r,n){this.p=new i(t,e),this.h=r,this.d=function(t,e){for(var r=!1,n=1/0,i=0;i<e.length;i++)for(var a=e[i],o=0,s=a.length,u=s-1;o<s;u=o++){var l=a[o],p=a[u];l.y>t.y!=p.y>t.y&&t.x<(p.x-l.x)*(t.y-l.y)/(p.y-l.y)+l.x&&(r=!r),n=Math.min(n,Ja(t,l,p));}return (r?1:-1)*Math.sqrt(n)}(this.p,n),this.max=this.d+this.h*Math.SQRT2;}$u.prototype.push=function(t){this.data.push(t),this.length++,this._up(this.length-1);},$u.prototype.pop=function(){if(0!==this.length){var t=this.data[0],e=this.data.pop();return this.length--,this.length>0&&(this.data[0]=e,this._down(0)),t}},$u.prototype.peek=function(){return this.data[0]},$u.prototype._up=function(t){for(var e=this.data,r=this.compare,n=e[t];t>0;){var i=t-1>>1,a=e[i];if(r(n,a)>=0)break;e[t]=a,t=i;}e[t]=n;},$u.prototype._down=function(t){for(var e=this.data,r=this.compare,n=this.length>>1,i=e[t];t<n;){var a=1+(t<<1),o=e[a],s=a+1;if(s<this.length&&r(e[s],o)<0&&(a=s,o=e[s]),r(o,i)>=0)break;e[t]=o,t=a;}e[t]=i;};var rl=Number.POSITIVE_INFINITY;function nl(t,e){return e[1]!==rl?function(t,e,r){var n=0,i=0;switch(e=Math.abs(e),r=Math.abs(r),t){case"top-right":case"top-left":case"top":i=r-7;break;case"bottom-right":case"bottom-left":case"bottom":i=7-r;}switch(t){case"top-right":case"bottom-right":case"right":n=-e;break;case"top-left":case"bottom-left":case"left":n=e;}return [n,i]}(t,e[0],e[1]):function(t,e){var r=0,n=0;e<0&&(e=0);var i=e/Math.sqrt(2);switch(t){case"top-right":case"top-left":n=i-7;break;case"bottom-right":case"bottom-left":n=7-i;break;case"bottom":n=7-e;break;case"top":n=e-7;}switch(t){case"top-right":case"bottom-right":r=-i;break;case"top-left":case"bottom-left":r=i;break;case"left":r=e;break;case"right":r=-e;}return [r,n]}(t,e[0])}function il(t){switch(t){case"right":case"top-right":case"bottom-right":return "right";case"left":case"top-left":case"bottom-left":return "left"}return "center"}function al(t,e,r,n,a,o,s,u,l,p,c,h,f,y,d){var m=function(t,e,r,n,a,o,s,u){for(var l=n.layout.get("text-rotate").evaluate(o,{})*Math.PI/180,p=[],c=0,h=e.positionedLines;c<h.length;c+=1)for(var f=h[c],y=0,d=f.positionedGlyphs;y<d.length;y+=1){var m=d[y];if(m.rect){var v=m.rect||{},g=4,x=!0,b=1,w=0,_=(a||u)&&m.vertical,A=m.metrics.advance*m.scale/2;if(u&&e.verticalizable&&(w=f.lineOffset/2-(m.imageName?-(24-m.metrics.width*m.scale)/2:24*(m.scale-1))),m.imageName){var S=s[m.imageName];x=S.sdf,g=1/(b=S.pixelRatio);}var k=a?[m.x+A,m.y]:[0,0],I=a?[0,0]:[m.x+A+r[0],m.y+r[1]-w],z=[0,0];_&&(z=I,I=[0,0]);var C=(m.metrics.left-g)*m.scale-A+I[0],E=(-m.metrics.top-g)*m.scale+I[1],P=C+v.w*m.scale/b,M=E+v.h*m.scale/b,B=new i(C,E),T=new i(P,E),V=new i(C,M),F=new i(P,M);if(_){var D=new i(-A,A- -17),L=-Math.PI/2,R=12-A,O=new i(22-R,-(m.imageName?R:0)),U=new(Function.prototype.bind.apply(i,[null].concat(z)));B._rotateAround(L,D)._add(O)._add(U),T._rotateAround(L,D)._add(O)._add(U),V._rotateAround(L,D)._add(O)._add(U),F._rotateAround(L,D)._add(O)._add(U);}if(l){var j=Math.sin(l),q=Math.cos(l),N=[q,-j,j,q];B._matMult(N),T._matMult(N),V._matMult(N),F._matMult(N);}var K=new i(0,0),G=new i(0,0);p.push({tl:B,tr:T,bl:V,br:F,tex:v,writingMode:e.writingMode,glyphOffset:k,sectionIndex:m.sectionIndex,isSDF:x,pixelOffsetTL:K,pixelOffsetBR:G,minFontScaleX:0,minFontScaleY:0});}}return p}(0,r,u,a,o,s,n,t.allowVerticalPlacement),v=t.textSizeData,g=null;"source"===v.kind?(g=[128*a.layout.get("text-size").evaluate(s,{})])[0]>32640&&A(t.layerIds[0]+': Value for "text-size" is >= 255. Reduce your "text-size".'):"composite"===v.kind&&((g=[128*y.compositeTextSizes[0].evaluate(s,{},d),128*y.compositeTextSizes[1].evaluate(s,{},d)])[0]>32640||g[1]>32640)&&A(t.layerIds[0]+': Value for "text-size" is >= 255. Reduce your "text-size".'),t.addSymbols(t.text,m,g,u,o,s,p,e,l.lineStartIndex,l.lineLength,f,d);for(var x=0,b=c;x<b.length;x+=1)h[b[x]]=t.text.placedSymbolArray.length-1;return 4*m.length}function ol(t){for(var e in t)return t[e];return null}function sl(t,e,r,n){var i=t.compareText;if(e in i){for(var a=i[e],o=a.length-1;o>=0;o--)if(n.dist(a[o])<r)return !0}else i[e]=[];return i[e].push(n),!1}var ul=gs.VectorTileFeature.types,ll=[{name:"a_fade_opacity",components:1,type:"Uint8",offset:0}];function pl(t,e,r,n,i,a,o,s,u,l,p,c,h){var f=s?Math.min(32640,Math.round(s[0])):0,y=s?Math.min(32640,Math.round(s[1])):0;t.emplaceBack(e,r,Math.round(32*n),Math.round(32*i),a,o,(f<<1)+(u?1:0),y,16*l,16*p,256*c,256*h);}function cl(t,e,r){t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r);}function hl(t){for(var e=0,r=t.sections;e<r.length;e+=1)if(Yn(r[e].text))return !0;return !1}var fl=function(t){this.layoutVertexArray=new Ti,this.indexArray=new Ui,this.programConfigurations=t,this.segments=new oa,this.dynamicLayoutVertexArray=new Vi,this.opacityVertexArray=new Fi,this.placedSymbolArray=new Wi;};fl.prototype.isEmpty=function(){return 0===this.layoutVertexArray.length&&0===this.indexArray.length&&0===this.dynamicLayoutVertexArray.length&&0===this.opacityVertexArray.length},fl.prototype.upload=function(t,e,r,n){this.isEmpty()||(r&&(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,Os.members),this.indexBuffer=t.createIndexBuffer(this.indexArray,e),this.dynamicLayoutVertexBuffer=t.createVertexBuffer(this.dynamicLayoutVertexArray,Us.members,!0),this.opacityVertexBuffer=t.createVertexBuffer(this.opacityVertexArray,ll,!0),this.opacityVertexBuffer.itemSize=1),(r||n)&&this.programConfigurations.upload(t));},fl.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy(),this.dynamicLayoutVertexBuffer.destroy(),this.opacityVertexBuffer.destroy());},Ln("SymbolBuffers",fl);var yl=function(t,e,r){this.layoutVertexArray=new t,this.layoutAttributes=e,this.indexArray=new r,this.segments=new oa,this.collisionVertexArray=new Oi;};yl.prototype.upload=function(t){this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,this.layoutAttributes),this.indexBuffer=t.createIndexBuffer(this.indexArray),this.collisionVertexBuffer=t.createVertexBuffer(this.collisionVertexArray,js.members,!0);},yl.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.segments.destroy(),this.collisionVertexBuffer.destroy());},Ln("CollisionBuffers",yl);var dl=function(t){this.collisionBoxArray=t.collisionBoxArray,this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map((function(t){return t.id})),this.index=t.index,this.pixelRatio=t.pixelRatio,this.sourceLayerIndex=t.sourceLayerIndex,this.hasPattern=!1,this.hasRTLText=!1,this.sortKeyRanges=[],this.collisionCircleArray=[],this.placementInvProjMatrix=io([]),this.placementViewportMatrix=io([]);var e=this.layers[0]._unevaluatedLayout._values;this.textSizeData=Vu(this.zoom,e["text-size"]),this.iconSizeData=Vu(this.zoom,e["icon-size"]);var r=this.layers[0].layout,n=r.get("symbol-sort-key"),i=r.get("symbol-z-order");this.sortFeaturesByKey="viewport-y"!==i&&void 0!==n.constantOr(1),this.sortFeaturesByY=("viewport-y"===i||"auto"===i&&!this.sortFeaturesByKey)&&(r.get("text-allow-overlap")||r.get("icon-allow-overlap")||r.get("text-ignore-placement")||r.get("icon-ignore-placement")),"point"===r.get("symbol-placement")&&(this.writingModes=r.get("text-writing-mode").map((function(t){return xu[t]}))),this.stateDependentLayerIds=this.layers.filter((function(t){return t.isStateDependent()})).map((function(t){return t.id})),this.sourceID=t.sourceID;};dl.prototype.createArrays=function(){this.text=new fl(new Ta(this.layers,this.zoom,(function(t){return /^text/.test(t)}))),this.icon=new fl(new Ta(this.layers,this.zoom,(function(t){return /^icon/.test(t)}))),this.glyphOffsetArray=new ea,this.lineVertexArray=new ra,this.symbolInstances=new ta;},dl.prototype.calculateGlyphDependencies=function(t,e,r,n,i){for(var a=0;a<t.length;a++)if(e[t.charCodeAt(a)]=!0,(r||n)&&i){var o=Gs[t.charAt(a)];o&&(e[o.charCodeAt(0)]=!0);}},dl.prototype.populate=function(t,e,r){var n=this.layers[0],i=n.layout,a=i.get("text-font"),o=i.get("text-field"),s=i.get("icon-image"),u=("constant"!==o.value.kind||o.value.value instanceof re&&!o.value.value.isEmpty()||o.value.value.toString().length>0)&&("constant"!==a.value.kind||a.value.value.length>0),l="constant"!==s.value.kind||!!s.value.value||Object.keys(s.parameters).length>0,p=i.get("symbol-sort-key");if(this.features=[],u||l){for(var c=e.iconDependencies,h=e.glyphDependencies,f=e.availableImages,y=new oi(this.zoom),d=0,m=t;d<m.length;d+=1){var v=m[d],g=v.feature,x=v.id,b=v.index,w=v.sourceLayerIndex,_=n._featureFilter.needGeometry,A={type:g.type,id:x,properties:g.properties,geometry:_?Ra(g):[]};if(n._featureFilter.filter(y,A,r)){_||(A.geometry=Ra(g));var S=void 0;if(u){var k=n.getValueAndResolveTokens("text-field",A,r,f),I=re.factory(k);hl(I)&&(this.hasRTLText=!0),(!this.hasRTLText||"unavailable"===ni()||this.hasRTLText&&ai.isParsed())&&(S=Ks(I,n,A));}var z=void 0;if(l){var C=n.getValueAndResolveTokens("icon-image",A,r,f);z=C instanceof ne?C:ne.fromString(C);}if(S||z){var E=this.sortFeaturesByKey?p.evaluate(A,{},r):void 0,P={id:x,text:S,icon:z,index:b,sourceLayerIndex:w,geometry:Ra(g),properties:g.properties,type:ul[g.type],sortKey:E};if(this.features.push(P),z&&(c[z.name]=!0),S){var M=a.evaluate(A,{},r).join(","),B="map"===i.get("text-rotation-alignment")&&"point"!==i.get("symbol-placement");this.allowVerticalPlacement=this.writingModes&&this.writingModes.indexOf(xu.vertical)>=0;for(var T=0,V=S.sections;T<V.length;T+=1){var F=V[T];if(F.image)c[F.image.name]=!0;else {var D=Gn(S.toString()),L=F.fontStack||M,R=h[L]=h[L]||{};this.calculateGlyphDependencies(F.text,R,B,this.allowVerticalPlacement,D);}}}}}}"line"===i.get("symbol-placement")&&(this.features=function(t){var e={},r={},n=[],i=0;function a(e){n.push(t[e]),i++;}function o(t,e,i){var a=r[t];return delete r[t],r[e]=a,n[a].geometry[0].pop(),n[a].geometry[0]=n[a].geometry[0].concat(i[0]),a}function s(t,r,i){var a=e[r];return delete e[r],e[t]=a,n[a].geometry[0].shift(),n[a].geometry[0]=i[0].concat(n[a].geometry[0]),a}function u(t,e,r){var n=r?e[0][e[0].length-1]:e[0][0];return t+":"+n.x+":"+n.y}for(var l=0;l<t.length;l++){var p=t[l],c=p.geometry,h=p.text?p.text.toString():null;if(h){var f=u(h,c),y=u(h,c,!0);if(f in r&&y in e&&r[f]!==e[y]){var d=s(f,y,c),m=o(f,y,n[d].geometry);delete e[f],delete r[y],r[u(h,n[m].geometry,!0)]=m,n[d].geometry=null;}else f in r?o(f,y,c):y in e?s(f,y,c):(a(l),e[f]=i-1,r[y]=i-1);}else a(l);}return n.filter((function(t){return t.geometry}))}(this.features)),this.sortFeaturesByKey&&this.features.sort((function(t,e){return t.sortKey-e.sortKey}));}},dl.prototype.update=function(t,e,r){this.stateDependentLayers.length&&(this.text.programConfigurations.updatePaintArrays(t,e,this.layers,r),this.icon.programConfigurations.updatePaintArrays(t,e,this.layers,r));},dl.prototype.isEmpty=function(){return 0===this.symbolInstances.length&&!this.hasRTLText},dl.prototype.uploadPending=function(){return !this.uploaded||this.text.programConfigurations.needsUpload||this.icon.programConfigurations.needsUpload},dl.prototype.upload=function(t){!this.uploaded&&this.hasDebugData()&&(this.textCollisionBox.upload(t),this.iconCollisionBox.upload(t)),this.text.upload(t,this.sortFeaturesByY,!this.uploaded,this.text.programConfigurations.needsUpload),this.icon.upload(t,this.sortFeaturesByY,!this.uploaded,this.icon.programConfigurations.needsUpload),this.uploaded=!0;},dl.prototype.destroyDebugData=function(){this.textCollisionBox.destroy(),this.iconCollisionBox.destroy();},dl.prototype.destroy=function(){this.text.destroy(),this.icon.destroy(),this.hasDebugData()&&this.destroyDebugData();},dl.prototype.addToLineVertexArray=function(t,e){var r=this.lineVertexArray.length;if(void 0!==t.segment){for(var n=t.dist(e[t.segment+1]),i=t.dist(e[t.segment]),a={},o=t.segment+1;o<e.length;o++)a[o]={x:e[o].x,y:e[o].y,tileUnitDistanceFromAnchor:n},o<e.length-1&&(n+=e[o+1].dist(e[o]));for(var s=t.segment||0;s>=0;s--)a[s]={x:e[s].x,y:e[s].y,tileUnitDistanceFromAnchor:i},s>0&&(i+=e[s-1].dist(e[s]));for(var u=0;u<e.length;u++){var l=a[u];this.lineVertexArray.emplaceBack(l.x,l.y,l.tileUnitDistanceFromAnchor);}}return {lineStartIndex:r,lineLength:this.lineVertexArray.length-r}},dl.prototype.addSymbols=function(t,e,r,n,i,a,o,s,u,l,p,c){for(var h=t.indexArray,f=t.layoutVertexArray,y=t.segments.prepareSegment(4*e.length,f,h,a.sortKey),d=this.glyphOffsetArray.length,m=y.vertexLength,v=this.allowVerticalPlacement&&o===xu.vertical?Math.PI/2:0,g=a.text&&a.text.sections,x=0;x<e.length;x++){var b=e[x],w=b.tl,_=b.tr,A=b.bl,S=b.br,k=b.tex,I=b.pixelOffsetTL,z=b.pixelOffsetBR,C=b.minFontScaleX,E=b.minFontScaleY,P=b.glyphOffset,M=b.isSDF,B=b.sectionIndex,T=y.vertexLength,V=P[1];pl(f,s.x,s.y,w.x,V+w.y,k.x,k.y,r,M,I.x,I.y,C,E),pl(f,s.x,s.y,_.x,V+_.y,k.x+k.w,k.y,r,M,z.x,I.y,C,E),pl(f,s.x,s.y,A.x,V+A.y,k.x,k.y+k.h,r,M,I.x,z.y,C,E),pl(f,s.x,s.y,S.x,V+S.y,k.x+k.w,k.y+k.h,r,M,z.x,z.y,C,E),cl(t.dynamicLayoutVertexArray,s,v),h.emplaceBack(T,T+1,T+2),h.emplaceBack(T+1,T+2,T+3),y.vertexLength+=4,y.primitiveLength+=2,this.glyphOffsetArray.emplaceBack(P[0]),x!==e.length-1&&B===e[x+1].sectionIndex||t.programConfigurations.populatePaintArrays(f.length,a,a.index,{},c,g&&g[B]);}t.placedSymbolArray.emplaceBack(s.x,s.y,d,this.glyphOffsetArray.length-d,m,u,l,s.segment,r?r[0]:0,r?r[1]:0,n[0],n[1],o,0,!1,0,p);},dl.prototype._addCollisionDebugVertex=function(t,e,r,n,i,a){return e.emplaceBack(0,0),t.emplaceBack(r.x,r.y,n,i,Math.round(a.x),Math.round(a.y))},dl.prototype.addCollisionDebugVertices=function(t,e,r,n,a,o,s){var u=a.segments.prepareSegment(4,a.layoutVertexArray,a.indexArray),l=u.vertexLength,p=a.layoutVertexArray,c=a.collisionVertexArray,h=s.anchorX,f=s.anchorY;this._addCollisionDebugVertex(p,c,o,h,f,new i(t,e)),this._addCollisionDebugVertex(p,c,o,h,f,new i(r,e)),this._addCollisionDebugVertex(p,c,o,h,f,new i(r,n)),this._addCollisionDebugVertex(p,c,o,h,f,new i(t,n)),u.vertexLength+=4;var y=a.indexArray;y.emplaceBack(l,l+1),y.emplaceBack(l+1,l+2),y.emplaceBack(l+2,l+3),y.emplaceBack(l+3,l),u.primitiveLength+=4;},dl.prototype.addDebugCollisionBoxes=function(t,e,r,n){for(var i=t;i<e;i++){var a=this.collisionBoxArray.get(i);this.addCollisionDebugVertices(a.x1,a.y1,a.x2,a.y2,n?this.textCollisionBox:this.iconCollisionBox,a.anchorPoint,r);}},dl.prototype.generateCollisionDebugBuffers=function(){this.hasDebugData()&&this.destroyDebugData(),this.textCollisionBox=new yl(Li,qs.members,Zi),this.iconCollisionBox=new yl(Li,qs.members,Zi);for(var t=0;t<this.symbolInstances.length;t++){var e=this.symbolInstances.get(t);this.addDebugCollisionBoxes(e.textBoxStartIndex,e.textBoxEndIndex,e,!0),this.addDebugCollisionBoxes(e.verticalTextBoxStartIndex,e.verticalTextBoxEndIndex,e,!0),this.addDebugCollisionBoxes(e.iconBoxStartIndex,e.iconBoxEndIndex,e,!1),this.addDebugCollisionBoxes(e.verticalIconBoxStartIndex,e.verticalIconBoxEndIndex,e,!1);}},dl.prototype._deserializeCollisionBoxesForSymbol=function(t,e,r,n,i,a,o,s,u){for(var l={},p=e;p<r;p++){var c=t.get(p);l.textBox={x1:c.x1,y1:c.y1,x2:c.x2,y2:c.y2,anchorPointX:c.anchorPointX,anchorPointY:c.anchorPointY},l.textFeatureIndex=c.featureIndex;break}for(var h=n;h<i;h++){var f=t.get(h);l.verticalTextBox={x1:f.x1,y1:f.y1,x2:f.x2,y2:f.y2,anchorPointX:f.anchorPointX,anchorPointY:f.anchorPointY},l.verticalTextFeatureIndex=f.featureIndex;break}for(var y=a;y<o;y++){var d=t.get(y);l.iconBox={x1:d.x1,y1:d.y1,x2:d.x2,y2:d.y2,anchorPointX:d.anchorPointX,anchorPointY:d.anchorPointY},l.iconFeatureIndex=d.featureIndex;break}for(var m=s;m<u;m++){var v=t.get(m);l.verticalIconBox={x1:v.x1,y1:v.y1,x2:v.x2,y2:v.y2,anchorPointX:v.anchorPointX,anchorPointY:v.anchorPointY},l.verticalIconFeatureIndex=v.featureIndex;break}return l},dl.prototype.deserializeCollisionBoxes=function(t){this.collisionArrays=[];for(var e=0;e<this.symbolInstances.length;e++){var r=this.symbolInstances.get(e);this.collisionArrays.push(this._deserializeCollisionBoxesForSymbol(t,r.textBoxStartIndex,r.textBoxEndIndex,r.verticalTextBoxStartIndex,r.verticalTextBoxEndIndex,r.iconBoxStartIndex,r.iconBoxEndIndex,r.verticalIconBoxStartIndex,r.verticalIconBoxEndIndex));}},dl.prototype.hasTextData=function(){return this.text.segments.get().length>0},dl.prototype.hasIconData=function(){return this.icon.segments.get().length>0},dl.prototype.hasDebugData=function(){return this.textCollisionBox&&this.iconCollisionBox},dl.prototype.hasTextCollisionBoxData=function(){return this.hasDebugData()&&this.textCollisionBox.segments.get().length>0},dl.prototype.hasIconCollisionBoxData=function(){return this.hasDebugData()&&this.iconCollisionBox.segments.get().length>0},dl.prototype.addIndicesForPlacedSymbol=function(t,e){for(var r=t.placedSymbolArray.get(e),n=r.vertexStartIndex+4*r.numGlyphs,i=r.vertexStartIndex;i<n;i+=4)t.indexArray.emplaceBack(i,i+1,i+2),t.indexArray.emplaceBack(i+1,i+2,i+3);},dl.prototype.getSortedSymbolIndexes=function(t){if(this.sortedAngle===t&&void 0!==this.symbolInstanceIndexes)return this.symbolInstanceIndexes;for(var e=Math.sin(t),r=Math.cos(t),n=[],i=[],a=[],o=0;o<this.symbolInstances.length;++o){a.push(o);var s=this.symbolInstances.get(o);n.push(0|Math.round(e*s.anchorX+r*s.anchorY)),i.push(s.featureIndex);}return a.sort((function(t,e){return n[t]-n[e]||i[e]-i[t]})),a},dl.prototype.addToSortKeyRanges=function(t,e){var r=this.sortKeyRanges[this.sortKeyRanges.length-1];r&&r.sortKey===e?r.symbolInstanceEnd=t+1:this.sortKeyRanges.push({sortKey:e,symbolInstanceStart:t,symbolInstanceEnd:t+1});},dl.prototype.sortFeatures=function(t){var e=this;if(this.sortFeaturesByY&&this.sortedAngle!==t&&!(this.text.segments.get().length>1||this.icon.segments.get().length>1)){this.symbolInstanceIndexes=this.getSortedSymbolIndexes(t),this.sortedAngle=t,this.text.indexArray.clear(),this.icon.indexArray.clear(),this.featureSortOrder=[];for(var r=0,n=this.symbolInstanceIndexes;r<n.length;r+=1){var i=this.symbolInstances.get(n[r]);this.featureSortOrder.push(i.featureIndex),[i.rightJustifiedTextSymbolIndex,i.centerJustifiedTextSymbolIndex,i.leftJustifiedTextSymbolIndex].forEach((function(t,r,n){t>=0&&n.indexOf(t)===r&&e.addIndicesForPlacedSymbol(e.text,t);})),i.verticalPlacedTextSymbolIndex>=0&&this.addIndicesForPlacedSymbol(this.text,i.verticalPlacedTextSymbolIndex),i.placedIconSymbolIndex>=0&&this.addIndicesForPlacedSymbol(this.icon,i.placedIconSymbolIndex),i.verticalPlacedIconSymbolIndex>=0&&this.addIndicesForPlacedSymbol(this.icon,i.verticalPlacedIconSymbolIndex);}this.text.indexBuffer&&this.text.indexBuffer.updateData(this.text.indexArray),this.icon.indexBuffer&&this.icon.indexBuffer.updateData(this.icon.indexArray);}},Ln("SymbolBucket",dl,{omit:["layers","collisionBoxArray","features","compareText"]}),dl.MAX_GLYPHS=65535,dl.addDynamicAttributes=cl;var ml=new bi({"symbol-placement":new di(Ct.layout_symbol["symbol-placement"]),"symbol-spacing":new di(Ct.layout_symbol["symbol-spacing"]),"symbol-avoid-edges":new di(Ct.layout_symbol["symbol-avoid-edges"]),"symbol-sort-key":new mi(Ct.layout_symbol["symbol-sort-key"]),"symbol-z-order":new di(Ct.layout_symbol["symbol-z-order"]),"icon-allow-overlap":new di(Ct.layout_symbol["icon-allow-overlap"]),"icon-ignore-placement":new di(Ct.layout_symbol["icon-ignore-placement"]),"icon-optional":new di(Ct.layout_symbol["icon-optional"]),"icon-rotation-alignment":new di(Ct.layout_symbol["icon-rotation-alignment"]),"icon-size":new mi(Ct.layout_symbol["icon-size"]),"icon-text-fit":new di(Ct.layout_symbol["icon-text-fit"]),"icon-text-fit-padding":new di(Ct.layout_symbol["icon-text-fit-padding"]),"icon-image":new mi(Ct.layout_symbol["icon-image"]),"icon-rotate":new mi(Ct.layout_symbol["icon-rotate"]),"icon-padding":new di(Ct.layout_symbol["icon-padding"]),"icon-keep-upright":new di(Ct.layout_symbol["icon-keep-upright"]),"icon-offset":new mi(Ct.layout_symbol["icon-offset"]),"icon-anchor":new mi(Ct.layout_symbol["icon-anchor"]),"icon-pitch-alignment":new di(Ct.layout_symbol["icon-pitch-alignment"]),"text-pitch-alignment":new di(Ct.layout_symbol["text-pitch-alignment"]),"text-rotation-alignment":new di(Ct.layout_symbol["text-rotation-alignment"]),"text-field":new mi(Ct.layout_symbol["text-field"]),"text-font":new mi(Ct.layout_symbol["text-font"]),"text-size":new mi(Ct.layout_symbol["text-size"]),"text-max-width":new mi(Ct.layout_symbol["text-max-width"]),"text-line-height":new di(Ct.layout_symbol["text-line-height"]),"text-letter-spacing":new mi(Ct.layout_symbol["text-letter-spacing"]),"text-justify":new mi(Ct.layout_symbol["text-justify"]),"text-radial-offset":new mi(Ct.layout_symbol["text-radial-offset"]),"text-variable-anchor":new di(Ct.layout_symbol["text-variable-anchor"]),"text-anchor":new mi(Ct.layout_symbol["text-anchor"]),"text-max-angle":new di(Ct.layout_symbol["text-max-angle"]),"text-writing-mode":new di(Ct.layout_symbol["text-writing-mode"]),"text-rotate":new mi(Ct.layout_symbol["text-rotate"]),"text-padding":new di(Ct.layout_symbol["text-padding"]),"text-keep-upright":new di(Ct.layout_symbol["text-keep-upright"]),"text-transform":new mi(Ct.layout_symbol["text-transform"]),"text-offset":new mi(Ct.layout_symbol["text-offset"]),"text-allow-overlap":new di(Ct.layout_symbol["text-allow-overlap"]),"text-ignore-placement":new di(Ct.layout_symbol["text-ignore-placement"]),"text-optional":new di(Ct.layout_symbol["text-optional"])}),vl={paint:new bi({"icon-opacity":new mi(Ct.paint_symbol["icon-opacity"]),"icon-color":new mi(Ct.paint_symbol["icon-color"]),"icon-halo-color":new mi(Ct.paint_symbol["icon-halo-color"]),"icon-halo-width":new mi(Ct.paint_symbol["icon-halo-width"]),"icon-halo-blur":new mi(Ct.paint_symbol["icon-halo-blur"]),"icon-translate":new di(Ct.paint_symbol["icon-translate"]),"icon-translate-anchor":new di(Ct.paint_symbol["icon-translate-anchor"]),"text-opacity":new mi(Ct.paint_symbol["text-opacity"]),"text-color":new mi(Ct.paint_symbol["text-color"],{runtimeType:Ut,getOverride:function(t){return t.textColor},hasOverride:function(t){return !!t.textColor}}),"text-halo-color":new mi(Ct.paint_symbol["text-halo-color"]),"text-halo-width":new mi(Ct.paint_symbol["text-halo-width"]),"text-halo-blur":new mi(Ct.paint_symbol["text-halo-blur"]),"text-translate":new di(Ct.paint_symbol["text-translate"]),"text-translate-anchor":new di(Ct.paint_symbol["text-translate-anchor"])}),layout:ml},gl=function(t){this.type=t.property.overrides?t.property.overrides.runtimeType:Dt,this.defaultValue=t;};gl.prototype.evaluate=function(t){if(t.formattedSection){var e=this.defaultValue.property.overrides;if(e&&e.hasOverride(t.formattedSection))return e.getOverride(t.formattedSection)}return t.feature&&t.featureState?this.defaultValue.evaluate(t.feature,t.featureState):this.defaultValue.property.specification.default},gl.prototype.eachChild=function(t){this.defaultValue.isConstant()||t(this.defaultValue.value._styleExpression.expression);},gl.prototype.outputDefined=function(){return !1},gl.prototype.serialize=function(){return null},Ln("FormatSectionOverride",gl,{omit:["defaultValue"]});var xl=function(t){function e(e){t.call(this,e,vl);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.recalculate=function(e,r){if(t.prototype.recalculate.call(this,e,r),"auto"===this.layout.get("icon-rotation-alignment")&&(this.layout._values["icon-rotation-alignment"]="point"!==this.layout.get("symbol-placement")?"map":"viewport"),"auto"===this.layout.get("text-rotation-alignment")&&(this.layout._values["text-rotation-alignment"]="point"!==this.layout.get("symbol-placement")?"map":"viewport"),"auto"===this.layout.get("text-pitch-alignment")&&(this.layout._values["text-pitch-alignment"]=this.layout.get("text-rotation-alignment")),"auto"===this.layout.get("icon-pitch-alignment")&&(this.layout._values["icon-pitch-alignment"]=this.layout.get("icon-rotation-alignment")),"point"===this.layout.get("symbol-placement")){var n=this.layout.get("text-writing-mode");if(n){for(var i=[],a=0,o=n;a<o.length;a+=1){var s=o[a];i.indexOf(s)<0&&i.push(s);}this.layout._values["text-writing-mode"]=i;}else this.layout._values["text-writing-mode"]=["horizontal"];}this._setPaintOverrides();},e.prototype.getValueAndResolveTokens=function(t,e,r,n){var i=this.layout.get(t).evaluate(e,{},r,n),a=this._unevaluatedLayout._values[t];return a.isDataDriven()||Kr(a.value)||!i?i:function(t,e){return e.replace(/{([^{}]+)}/g,(function(e,r){return r in t?String(t[r]):""}))}(e.properties,i)},e.prototype.createBucket=function(t){return new dl(t)},e.prototype.queryRadius=function(){return 0},e.prototype.queryIntersectsFeature=function(){return !1},e.prototype._setPaintOverrides=function(){for(var t=0,r=vl.paint.overridableProperties;t<r.length;t+=1){var n=r[t];if(e.hasPaintOverride(this.layout,n)){var i,a=this.paint.get(n),o=new gl(a),s=new Nr(o,a.property.specification);i="constant"===a.value.kind||"source"===a.value.kind?new Zr("source",s):new Xr("composite",s,a.value.zoomStops,a.value._interpolationType),this.paint._values[n]=new fi(a.property,i,a.parameters);}}},e.prototype._handleOverridablePaintPropertyUpdate=function(t,r,n){return !(!this.layout||r.isDataDriven()||n.isDataDriven())&&e.hasPaintOverride(this.layout,t)},e.hasPaintOverride=function(t,e){var r=t.get("text-field"),n=vl.paint.properties[e],i=!1,a=function(t){for(var e=0,r=t;e<r.length;e+=1)if(n.overrides&&n.overrides.hasOverride(r[e]))return void(i=!0)};if("constant"===r.value.kind&&r.value.value instanceof re)a(r.value.value.sections);else if("source"===r.value.kind){var o=function(t){i||(t instanceof ue&&oe(t.value)===Kt?a(t.value.sections):t instanceof he?a(t.sections):t.eachChild(o));},s=r.value;s._styleExpression&&o(s._styleExpression.expression);}return i},e}(wi),bl={paint:new bi({"background-color":new di(Ct.paint_background["background-color"]),"background-pattern":new gi(Ct.paint_background["background-pattern"]),"background-opacity":new di(Ct.paint_background["background-opacity"])})},wl=function(t){function e(e){t.call(this,e,bl);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(wi),_l={paint:new bi({"raster-opacity":new di(Ct.paint_raster["raster-opacity"]),"raster-hue-rotate":new di(Ct.paint_raster["raster-hue-rotate"]),"raster-brightness-min":new di(Ct.paint_raster["raster-brightness-min"]),"raster-brightness-max":new di(Ct.paint_raster["raster-brightness-max"]),"raster-saturation":new di(Ct.paint_raster["raster-saturation"]),"raster-contrast":new di(Ct.paint_raster["raster-contrast"]),"raster-resampling":new di(Ct.paint_raster["raster-resampling"]),"raster-fade-duration":new di(Ct.paint_raster["raster-fade-duration"])})},Al=function(t){function e(e){t.call(this,e,_l);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(wi),Sl=function(t){function e(e){t.call(this,e,{}),this.implementation=e;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.is3D=function(){return "3d"===this.implementation.renderingMode},e.prototype.hasOffscreenPass=function(){return void 0!==this.implementation.prerender},e.prototype.recalculate=function(){},e.prototype.updateTransitions=function(){},e.prototype.hasTransition=function(){},e.prototype.serialize=function(){},e.prototype.onAdd=function(t){this.implementation.onAdd&&this.implementation.onAdd(t,t.painter.context.gl);},e.prototype.onRemove=function(t){this.implementation.onRemove&&this.implementation.onRemove(t,t.painter.context.gl);},e}(wi),kl={circle:lo,heatmap:bo,hillshade:_o,fill:us,"fill-extrusion":ks,line:Ls,symbol:xl,background:wl,raster:Al},Il=o.HTMLImageElement,zl=o.HTMLCanvasElement,Cl=o.HTMLVideoElement,El=o.ImageData,Pl=o.ImageBitmap,Ml=function(t,e,r,n){this.context=t,this.format=r,this.texture=t.gl.createTexture(),this.update(e,n);};Ml.prototype.update=function(t,e,r){var n=t.width,i=t.height,a=!(this.size&&this.size[0]===n&&this.size[1]===i||r),o=this.context,s=o.gl;if(this.useMipmap=Boolean(e&&e.useMipmap),s.bindTexture(s.TEXTURE_2D,this.texture),o.pixelStoreUnpackFlipY.set(!1),o.pixelStoreUnpack.set(1),o.pixelStoreUnpackPremultiplyAlpha.set(this.format===s.RGBA&&(!e||!1!==e.premultiply)),a)this.size=[n,i],t instanceof Il||t instanceof zl||t instanceof Cl||t instanceof El||Pl&&t instanceof Pl?s.texImage2D(s.TEXTURE_2D,0,this.format,this.format,s.UNSIGNED_BYTE,t):s.texImage2D(s.TEXTURE_2D,0,this.format,n,i,0,this.format,s.UNSIGNED_BYTE,t.data);else {var u=r||{x:0,y:0},l=u.x,p=u.y;t instanceof Il||t instanceof zl||t instanceof Cl||t instanceof El||Pl&&t instanceof Pl?s.texSubImage2D(s.TEXTURE_2D,0,l,p,s.RGBA,s.UNSIGNED_BYTE,t):s.texSubImage2D(s.TEXTURE_2D,0,l,p,n,i,s.RGBA,s.UNSIGNED_BYTE,t.data);}this.useMipmap&&this.isSizePowerOfTwo()&&s.generateMipmap(s.TEXTURE_2D);},Ml.prototype.bind=function(t,e,r){var n=this.context.gl;n.bindTexture(n.TEXTURE_2D,this.texture),r!==n.LINEAR_MIPMAP_NEAREST||this.isSizePowerOfTwo()||(r=n.LINEAR),t!==this.filter&&(n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,r||t),this.filter=t),e!==this.wrap&&(n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,e),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,e),this.wrap=e);},Ml.prototype.isSizePowerOfTwo=function(){return this.size[0]===this.size[1]&&Math.log(this.size[0])/Math.LN2%1==0},Ml.prototype.destroy=function(){this.context.gl.deleteTexture(this.texture),this.texture=null;};var Bl=function(t){var e=this;this._callback=t,this._triggered=!1,"undefined"!=typeof MessageChannel&&(this._channel=new MessageChannel,this._channel.port2.onmessage=function(){e._triggered=!1,e._callback();});};Bl.prototype.trigger=function(){var t=this;this._triggered||(this._triggered=!0,this._channel?this._channel.port1.postMessage(!0):setTimeout((function(){t._triggered=!1,t._callback();}),0));},Bl.prototype.remove=function(){delete this._channel,this._callback=function(){};};var Tl=function(t,e,r){this.target=t,this.parent=e,this.mapId=r,this.callbacks={},this.tasks={},this.taskQueue=[],this.cancelCallbacks={},v(["receive","process"],this),this.invoker=new Bl(this.process),this.target.addEventListener("message",this.receive,!1),this.globalScope=I()?t:o;};function Vl(t,e,r){var n=2*Math.PI*6378137/256/Math.pow(2,r);return [t*n-2*Math.PI*6378137/2,e*n-2*Math.PI*6378137/2]}Tl.prototype.send=function(t,e,r,n,i){var a=this;void 0===i&&(i=!1);var o=Math.round(1e18*Math.random()).toString(36).substring(0,10);r&&(this.callbacks[o]=r);var s=E(this.globalScope)?void 0:[];return this.target.postMessage({id:o,type:t,hasCallback:!!r,targetMapId:n,mustQueue:i,sourceMapId:this.mapId,data:jn(e,s)},s),{cancel:function(){r&&delete a.callbacks[o],a.target.postMessage({id:o,type:"<cancel>",targetMapId:n,sourceMapId:a.mapId});}}},Tl.prototype.receive=function(t){var e=t.data,r=e.id;if(r&&(!e.targetMapId||this.mapId===e.targetMapId))if("<cancel>"===e.type){delete this.tasks[r];var n=this.cancelCallbacks[r];delete this.cancelCallbacks[r],n&&n();}else I()||e.mustQueue?(this.tasks[r]=e,this.taskQueue.push(r),this.invoker.trigger()):this.processTask(r,e);},Tl.prototype.process=function(){if(this.taskQueue.length){var t=this.taskQueue.shift(),e=this.tasks[t];delete this.tasks[t],this.taskQueue.length&&this.invoker.trigger(),e&&this.processTask(t,e);}},Tl.prototype.processTask=function(t,e){var r=this;if("<response>"===e.type){var n=this.callbacks[t];delete this.callbacks[t],n&&(e.error?n(qn(e.error)):n(null,qn(e.data)));}else {var i=!1,a=E(this.globalScope)?void 0:[],o=e.hasCallback?function(e,n){i=!0,delete r.cancelCallbacks[t],r.target.postMessage({id:t,type:"<response>",sourceMapId:r.mapId,error:e?jn(e):null,data:jn(n,a)},a);}:function(t){i=!0;},s=null,u=qn(e.data);if(this.parent[e.type])s=this.parent[e.type](e.sourceMapId,u,o);else if(this.parent.getWorkerSource){var l=e.type.split(".");s=this.parent.getWorkerSource(e.sourceMapId,l[0],u.source)[l[1]](u,o);}else o(new Error("Could not find function "+e.type));!i&&s&&s.cancel&&(this.cancelCallbacks[t]=s.cancel);}},Tl.prototype.remove=function(){this.invoker.remove(),this.target.removeEventListener("message",this.receive,!1);};var Fl=function(t,e){t&&(e?this.setSouthWest(t).setNorthEast(e):4===t.length?this.setSouthWest([t[0],t[1]]).setNorthEast([t[2],t[3]]):this.setSouthWest(t[0]).setNorthEast(t[1]));};Fl.prototype.setNorthEast=function(t){return this._ne=t instanceof Dl?new Dl(t.lng,t.lat):Dl.convert(t),this},Fl.prototype.setSouthWest=function(t){return this._sw=t instanceof Dl?new Dl(t.lng,t.lat):Dl.convert(t),this},Fl.prototype.extend=function(t){var e,r,n=this._sw,i=this._ne;if(t instanceof Dl)e=t,r=t;else {if(!(t instanceof Fl))return Array.isArray(t)?4===t.length||t.every(Array.isArray)?this.extend(Fl.convert(t)):this.extend(Dl.convert(t)):this;if(r=t._ne,!(e=t._sw)||!r)return this}return n||i?(n.lng=Math.min(e.lng,n.lng),n.lat=Math.min(e.lat,n.lat),i.lng=Math.max(r.lng,i.lng),i.lat=Math.max(r.lat,i.lat)):(this._sw=new Dl(e.lng,e.lat),this._ne=new Dl(r.lng,r.lat)),this},Fl.prototype.getCenter=function(){return new Dl((this._sw.lng+this._ne.lng)/2,(this._sw.lat+this._ne.lat)/2)},Fl.prototype.getSouthWest=function(){return this._sw},Fl.prototype.getNorthEast=function(){return this._ne},Fl.prototype.getNorthWest=function(){return new Dl(this.getWest(),this.getNorth())},Fl.prototype.getSouthEast=function(){return new Dl(this.getEast(),this.getSouth())},Fl.prototype.getWest=function(){return this._sw.lng},Fl.prototype.getSouth=function(){return this._sw.lat},Fl.prototype.getEast=function(){return this._ne.lng},Fl.prototype.getNorth=function(){return this._ne.lat},Fl.prototype.toArray=function(){return [this._sw.toArray(),this._ne.toArray()]},Fl.prototype.toString=function(){return "LngLatBounds("+this._sw.toString()+", "+this._ne.toString()+")"},Fl.prototype.isEmpty=function(){return !(this._sw&&this._ne)},Fl.prototype.contains=function(t){var e=Dl.convert(t),r=e.lng,n=e.lat,i=this._sw.lng<=r&&r<=this._ne.lng;return this._sw.lng>this._ne.lng&&(i=this._sw.lng>=r&&r>=this._ne.lng),this._sw.lat<=n&&n<=this._ne.lat&&i},Fl.convert=function(t){return !t||t instanceof Fl?t:new Fl(t)};var Dl=function(t,e){if(isNaN(t)||isNaN(e))throw new Error("Invalid LngLat object: ("+t+", "+e+")");if(this.lng=+t,this.lat=+e,this.lat>90||this.lat<-90)throw new Error("Invalid LngLat latitude value: must be between -90 and 90")};Dl.prototype.wrap=function(){return new Dl(c(this.lng,-180,180),this.lat)},Dl.prototype.toArray=function(){return [this.lng,this.lat]},Dl.prototype.toString=function(){return "LngLat("+this.lng+", "+this.lat+")"},Dl.prototype.distanceTo=function(t){var e=Math.PI/180,r=this.lat*e,n=t.lat*e,i=Math.sin(r)*Math.sin(n)+Math.cos(r)*Math.cos(n)*Math.cos((t.lng-this.lng)*e);return 6371008.8*Math.acos(Math.min(i,1))},Dl.prototype.toBounds=function(t){void 0===t&&(t=0);var e=360*t/40075017,r=e/Math.cos(Math.PI/180*this.lat);return new Fl(new Dl(this.lng-r,this.lat-e),new Dl(this.lng+r,this.lat+e))},Dl.convert=function(t){if(t instanceof Dl)return t;if(Array.isArray(t)&&(2===t.length||3===t.length))return new Dl(Number(t[0]),Number(t[1]));if(!Array.isArray(t)&&"object"==typeof t&&null!==t)return new Dl(Number("lng"in t?t.lng:t.lon),Number(t.lat));throw new Error("`LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]")};var Ll=2*Math.PI*6371008.8;function Rl(t){return Ll*Math.cos(t*Math.PI/180)}function Ol(t){return (180+t)/360}function Ul(t){return (180-180/Math.PI*Math.log(Math.tan(Math.PI/4+t*Math.PI/360)))/360}function jl(t,e){return t/Rl(e)}function ql(t){return 360/Math.PI*Math.atan(Math.exp((180-360*t)*Math.PI/180))-90}var Nl=function(t,e,r){void 0===r&&(r=0),this.x=+t,this.y=+e,this.z=+r;};Nl.fromLngLat=function(t,e){void 0===e&&(e=0);var r=Dl.convert(t);return new Nl(Ol(r.lng),Ul(r.lat),jl(e,r.lat))},Nl.prototype.toLngLat=function(){return new Dl(360*this.x-180,ql(this.y))},Nl.prototype.toAltitude=function(){return this.z*Rl(ql(this.y))},Nl.prototype.meterInMercatorCoordinateUnits=function(){return 1/Ll*(t=ql(this.y),1/Math.cos(t*Math.PI/180));var t;};var Kl=function(t,e,r){this.z=t,this.x=e,this.y=r,this.key=Xl(0,t,t,e,r);};Kl.prototype.equals=function(t){return this.z===t.z&&this.x===t.x&&this.y===t.y},Kl.prototype.url=function(t,e){var r,n,i,a,o,s=(n=this.y,i=this.z,a=Vl(256*(r=this.x),256*(n=Math.pow(2,i)-n-1),i),o=Vl(256*(r+1),256*(n+1),i),a[0]+","+a[1]+","+o[0]+","+o[1]),u=function(t,e,r){for(var n,i="",a=t;a>0;a--)i+=(e&(n=1<<a-1)?1:0)+(r&n?2:0);return i}(this.z,this.x,this.y);return t[(this.x+this.y)%t.length].replace("{prefix}",(this.x%16).toString(16)+(this.y%16).toString(16)).replace("{z}",String(this.z)).replace("{x}",String(this.x)).replace("{y}",String("tms"===e?Math.pow(2,this.z)-this.y-1:this.y)).replace("{quadkey}",u).replace("{bbox-epsg-3857}",s)},Kl.prototype.getTilePoint=function(t){var e=Math.pow(2,this.z);return new i(8192*(t.x*e-this.x),8192*(t.y*e-this.y))},Kl.prototype.toString=function(){return this.z+"/"+this.x+"/"+this.y};var Gl=function(t,e){this.wrap=t,this.canonical=e,this.key=Xl(t,e.z,e.z,e.x,e.y);},Zl=function(t,e,r,n,i){this.overscaledZ=t,this.wrap=e,this.canonical=new Kl(r,+n,+i),this.key=Xl(e,t,r,n,i);};function Xl(t,e,r,n,i){(t*=2)<0&&(t=-1*t-1);var a=1<<r;return (a*a*t+a*i+n).toString(36)+r.toString(36)+e.toString(36)}Zl.prototype.equals=function(t){return this.overscaledZ===t.overscaledZ&&this.wrap===t.wrap&&this.canonical.equals(t.canonical)},Zl.prototype.scaledTo=function(t){var e=this.canonical.z-t;return t>this.canonical.z?new Zl(t,this.wrap,this.canonical.z,this.canonical.x,this.canonical.y):new Zl(t,this.wrap,t,this.canonical.x>>e,this.canonical.y>>e)},Zl.prototype.calculateScaledKey=function(t,e){var r=this.canonical.z-t;return t>this.canonical.z?Xl(this.wrap*+e,t,this.canonical.z,this.canonical.x,this.canonical.y):Xl(this.wrap*+e,t,t,this.canonical.x>>r,this.canonical.y>>r)},Zl.prototype.isChildOf=function(t){if(t.wrap!==this.wrap)return !1;var e=this.canonical.z-t.canonical.z;return 0===t.overscaledZ||t.overscaledZ<this.overscaledZ&&t.canonical.x===this.canonical.x>>e&&t.canonical.y===this.canonical.y>>e},Zl.prototype.children=function(t){if(this.overscaledZ>=t)return [new Zl(this.overscaledZ+1,this.wrap,this.canonical.z,this.canonical.x,this.canonical.y)];var e=this.canonical.z+1,r=2*this.canonical.x,n=2*this.canonical.y;return [new Zl(e,this.wrap,e,r,n),new Zl(e,this.wrap,e,r+1,n),new Zl(e,this.wrap,e,r,n+1),new Zl(e,this.wrap,e,r+1,n+1)]},Zl.prototype.isLessThan=function(t){return this.wrap<t.wrap||!(this.wrap>t.wrap)&&(this.overscaledZ<t.overscaledZ||!(this.overscaledZ>t.overscaledZ)&&(this.canonical.x<t.canonical.x||!(this.canonical.x>t.canonical.x)&&this.canonical.y<t.canonical.y))},Zl.prototype.wrapped=function(){return new Zl(this.overscaledZ,0,this.canonical.z,this.canonical.x,this.canonical.y)},Zl.prototype.unwrapTo=function(t){return new Zl(this.overscaledZ,t,this.canonical.z,this.canonical.x,this.canonical.y)},Zl.prototype.overscaleFactor=function(){return Math.pow(2,this.overscaledZ-this.canonical.z)},Zl.prototype.toUnwrapped=function(){return new Gl(this.wrap,this.canonical)},Zl.prototype.toString=function(){return this.overscaledZ+"/"+this.canonical.x+"/"+this.canonical.y},Zl.prototype.getTilePoint=function(t){return this.canonical.getTilePoint(new Nl(t.x-this.wrap,t.y))},Ln("CanonicalTileID",Kl),Ln("OverscaledTileID",Zl,{omit:["posMatrix"]});var Jl=function(t,e,r){if(this.uid=t,e.height!==e.width)throw new RangeError("DEM tiles must be square");if(r&&"mapbox"!==r&&"terrarium"!==r)return A('"'+r+'" is not a valid encoding type. Valid types include "mapbox" and "terrarium".');this.stride=e.height;var n=this.dim=e.height-2;this.data=new Uint32Array(e.data.buffer),this.encoding=r||"mapbox";for(var i=0;i<n;i++)this.data[this._idx(-1,i)]=this.data[this._idx(0,i)],this.data[this._idx(n,i)]=this.data[this._idx(n-1,i)],this.data[this._idx(i,-1)]=this.data[this._idx(i,0)],this.data[this._idx(i,n)]=this.data[this._idx(i,n-1)];this.data[this._idx(-1,-1)]=this.data[this._idx(0,0)],this.data[this._idx(n,-1)]=this.data[this._idx(n-1,0)],this.data[this._idx(-1,n)]=this.data[this._idx(0,n-1)],this.data[this._idx(n,n)]=this.data[this._idx(n-1,n-1)];};Jl.prototype.get=function(t,e){var r=new Uint8Array(this.data.buffer),n=4*this._idx(t,e);return ("terrarium"===this.encoding?this._unpackTerrarium:this._unpackMapbox)(r[n],r[n+1],r[n+2])},Jl.prototype.getUnpackVector=function(){return "terrarium"===this.encoding?[256,1,1/256,32768]:[6553.6,25.6,.1,1e4]},Jl.prototype._idx=function(t,e){if(t<-1||t>=this.dim+1||e<-1||e>=this.dim+1)throw new RangeError("out of range source coordinates for DEM data");return (e+1)*this.stride+(t+1)},Jl.prototype._unpackMapbox=function(t,e,r){return (256*t*256+256*e+r)/10-1e4},Jl.prototype._unpackTerrarium=function(t,e,r){return 256*t+e+r/256-32768},Jl.prototype.getPixels=function(){return new vo({width:this.stride,height:this.stride},new Uint8Array(this.data.buffer))},Jl.prototype.backfillBorder=function(t,e,r){if(this.dim!==t.dim)throw new Error("dem dimension mismatch");var n=e*this.dim,i=e*this.dim+this.dim,a=r*this.dim,o=r*this.dim+this.dim;switch(e){case-1:n=i-1;break;case 1:i=n+1;}switch(r){case-1:a=o-1;break;case 1:o=a+1;}for(var s=-e*this.dim,u=-r*this.dim,l=a;l<o;l++)for(var p=n;p<i;p++)this.data[this._idx(p,l)]=t.data[this._idx(p+s,l+u)];},Ln("DEMData",Jl);var Hl=function(t){this._stringToNumber={},this._numberToString=[];for(var e=0;e<t.length;e++){var r=t[e];this._stringToNumber[r]=e,this._numberToString[e]=r;}};Hl.prototype.encode=function(t){return this._stringToNumber[t]},Hl.prototype.decode=function(t){return this._numberToString[t]};var Yl=function(t,e,r,n,i){this.type="Feature",this._vectorTileFeature=t,t._z=e,t._x=r,t._y=n,this.properties=t.properties,this.id=i;},$l={geometry:{configurable:!0}};$l.geometry.get=function(){return void 0===this._geometry&&(this._geometry=this._vectorTileFeature.toGeoJSON(this._vectorTileFeature._x,this._vectorTileFeature._y,this._vectorTileFeature._z).geometry),this._geometry},$l.geometry.set=function(t){this._geometry=t;},Yl.prototype.toJSON=function(){var t={geometry:this.geometry};for(var e in this)"_geometry"!==e&&"_vectorTileFeature"!==e&&(t[e]=this[e]);return t},Object.defineProperties(Yl.prototype,$l);var Wl=function(){this.state={},this.stateChanges={},this.deletedStates={};};Wl.prototype.updateState=function(t,e,r){var n=String(e);if(this.stateChanges[t]=this.stateChanges[t]||{},this.stateChanges[t][n]=this.stateChanges[t][n]||{},h(this.stateChanges[t][n],r),null===this.deletedStates[t])for(var i in this.deletedStates[t]={},this.state[t])i!==n&&(this.deletedStates[t][i]=null);else if(this.deletedStates[t]&&null===this.deletedStates[t][n])for(var a in this.deletedStates[t][n]={},this.state[t][n])r[a]||(this.deletedStates[t][n][a]=null);else for(var o in r)this.deletedStates[t]&&this.deletedStates[t][n]&&null===this.deletedStates[t][n][o]&&delete this.deletedStates[t][n][o];},Wl.prototype.removeFeatureState=function(t,e,r){if(null!==this.deletedStates[t]){var n=String(e);if(this.deletedStates[t]=this.deletedStates[t]||{},r&&void 0!==e)null!==this.deletedStates[t][n]&&(this.deletedStates[t][n]=this.deletedStates[t][n]||{},this.deletedStates[t][n][r]=null);else if(void 0!==e)if(this.stateChanges[t]&&this.stateChanges[t][n])for(r in this.deletedStates[t][n]={},this.stateChanges[t][n])this.deletedStates[t][n][r]=null;else this.deletedStates[t][n]=null;else this.deletedStates[t]=null;}},Wl.prototype.getState=function(t,e){var r=String(e),n=h({},(this.state[t]||{})[r],(this.stateChanges[t]||{})[r]);if(null===this.deletedStates[t])return {};if(this.deletedStates[t]){var i=this.deletedStates[t][e];if(null===i)return {};for(var a in i)delete n[a];}return n},Wl.prototype.initializeTileState=function(t,e){t.setFeatureState(this.state,e);},Wl.prototype.coalesceChanges=function(t,e){var r={};for(var n in this.stateChanges){this.state[n]=this.state[n]||{};var i={};for(var a in this.stateChanges[n])this.state[n][a]||(this.state[n][a]={}),h(this.state[n][a],this.stateChanges[n][a]),i[a]=this.state[n][a];r[n]=i;}for(var o in this.deletedStates){this.state[o]=this.state[o]||{};var s={};if(null===this.deletedStates[o])for(var u in this.state[o])s[u]={},this.state[o][u]={};else for(var l in this.deletedStates[o]){if(null===this.deletedStates[o][l])this.state[o][l]={};else for(var p=0,c=Object.keys(this.deletedStates[o][l]);p<c.length;p+=1)delete this.state[o][l][c[p]];s[l]=this.state[o][l];}r[o]=r[o]||{},h(r[o],s);}if(this.stateChanges={},this.deletedStates={},0!==Object.keys(r).length)for(var f in t)t[f].setFeatureState(r,e);};var Ql=function(t,e){this.tileID=t,this.x=t.canonical.x,this.y=t.canonical.y,this.z=t.canonical.z,this.grid=new Bn(8192,16,0),this.grid3D=new Bn(8192,16,0),this.featureIndexArray=new ia,this.promoteId=e;};function tp(t,e,r,n,i){return x(t,(function(t,a){var o=e instanceof yi?e.get(a):null;return o&&o.evaluate?o.evaluate(r,n,i):o}))}function ep(t){for(var e=1/0,r=1/0,n=-1/0,i=-1/0,a=0,o=t;a<o.length;a+=1){var s=o[a];e=Math.min(e,s.x),r=Math.min(r,s.y),n=Math.max(n,s.x),i=Math.max(i,s.y);}return {minX:e,minY:r,maxX:n,maxY:i}}function rp(t,e){return e-t}Ql.prototype.insert=function(t,e,r,n,i,a){var o=this.featureIndexArray.length;this.featureIndexArray.emplaceBack(r,n,i);for(var s=a?this.grid3D:this.grid,u=0;u<e.length;u++){for(var l=e[u],p=[1/0,1/0,-1/0,-1/0],c=0;c<l.length;c++){var h=l[c];p[0]=Math.min(p[0],h.x),p[1]=Math.min(p[1],h.y),p[2]=Math.max(p[2],h.x),p[3]=Math.max(p[3],h.y);}p[0]<8192&&p[1]<8192&&p[2]>=0&&p[3]>=0&&s.insert(o,p[0],p[1],p[2],p[3]);}},Ql.prototype.loadVTLayers=function(){return this.vtLayers||(this.vtLayers=new gs.VectorTile(new Js(this.rawTileData)).layers,this.sourceLayerCoder=new Hl(this.vtLayers?Object.keys(this.vtLayers).sort():["_geojsonTileLayer"])),this.vtLayers},Ql.prototype.query=function(t,e,r,n){var a=this;this.loadVTLayers();for(var o=t.params||{},s=8192/t.tileSize/t.scale,u=an(o.filter),l=t.queryGeometry,p=t.queryPadding*s,c=ep(l),h=this.grid.query(c.minX-p,c.minY-p,c.maxX+p,c.maxY+p),f=ep(t.cameraQueryGeometry),y=this.grid3D.query(f.minX-p,f.minY-p,f.maxX+p,f.maxY+p,(function(e,r,n,a){return function(t,e,r,n,a){for(var o=0,s=t;o<s.length;o+=1){var u=s[o];if(e<=u.x&&r<=u.y&&n>=u.x&&a>=u.y)return !0}var l=[new i(e,r),new i(e,a),new i(n,a),new i(n,r)];if(t.length>2)for(var p=0,c=l;p<c.length;p+=1)if(Ya(t,c[p]))return !0;for(var h=0;h<t.length-1;h++)if($a(t[h],t[h+1],l))return !0;return !1}(t.cameraQueryGeometry,e-p,r-p,n+p,a+p)})),d=0,m=y;d<m.length;d+=1)h.push(m[d]);h.sort(rp);for(var v,g={},x=function(i){var p=h[i];if(p!==v){v=p;var c=a.featureIndexArray.get(p),f=null;a.loadMatchingFeature(g,c.bucketIndex,c.sourceLayerIndex,c.featureIndex,u,o.layers,o.availableImages,e,r,n,(function(e,r,n){return f||(f=Ra(e)),r.queryIntersectsFeature(l,e,n,f,a.z,t.transform,s,t.pixelPosMatrix)}));}},b=0;b<h.length;b++)x(b);return g},Ql.prototype.loadMatchingFeature=function(t,e,r,n,i,a,o,s,u,l,p){var c=this.bucketLayerIDs[e];if(!a||function(t,e){for(var r=0;r<t.length;r++)if(e.indexOf(t[r])>=0)return !0;return !1}(a,c)){var h=this.sourceLayerCoder.decode(r),f=this.vtLayers[h].feature(n);if(i.filter(new oi(this.tileID.overscaledZ),f))for(var y=this.getId(f,h),d=0;d<c.length;d++){var m=c[d];if(!(a&&a.indexOf(m)<0)){var v=s[m];if(v){var g={};void 0!==y&&l&&(g=l.getState(v.sourceLayer||"_geojsonTileLayer",y));var x=u[m];x.paint=tp(x.paint,v.paint,f,g,o),x.layout=tp(x.layout,v.layout,f,g,o);var b=!p||p(f,v,g);if(b){var w=new Yl(f,this.z,this.x,this.y,y);w.layer=x;var _=t[m];void 0===_&&(_=t[m]=[]),_.push({featureIndex:n,feature:w,intersectionZ:b});}}}}}},Ql.prototype.lookupSymbolFeatures=function(t,e,r,n,i,a,o,s){var u={};this.loadVTLayers();for(var l=an(i),p=0,c=t;p<c.length;p+=1)this.loadMatchingFeature(u,r,n,c[p],l,a,o,s,e);return u},Ql.prototype.hasLayer=function(t){for(var e=0,r=this.bucketLayerIDs;e<r.length;e+=1)for(var n=0,i=r[e];n<i.length;n+=1)if(t===i[n])return !0;return !1},Ql.prototype.getId=function(t,e){var r=t.id;return this.promoteId&&"boolean"==typeof(r=t.properties["string"==typeof this.promoteId?this.promoteId:this.promoteId[e]])&&(r=Number(r)),r},Ln("FeatureIndex",Ql,{omit:["rawTileData","sourceLayerCoder"]});var np=function(t,e){this.tileID=t,this.uid=y(),this.uses=0,this.tileSize=e,this.buckets={},this.expirationTime=null,this.queryPadding=0,this.hasSymbolBuckets=!1,this.hasRTLText=!1,this.dependencies={},this.expiredRequestCount=0,this.state="loading";};np.prototype.registerFadeDuration=function(t){var e=t+this.timeAdded;e<R.now()||this.fadeEndTime&&e<this.fadeEndTime||(this.fadeEndTime=e);},np.prototype.wasRequested=function(){return "errored"===this.state||"loaded"===this.state||"reloading"===this.state},np.prototype.loadVectorData=function(t,e,r){if(this.hasData()&&this.unloadVectorData(),this.state="loaded",t){for(var n in t.featureIndex&&(this.latestFeatureIndex=t.featureIndex,t.rawTileData?(this.latestRawTileData=t.rawTileData,this.latestFeatureIndex.rawTileData=t.rawTileData):this.latestRawTileData&&(this.latestFeatureIndex.rawTileData=this.latestRawTileData)),this.collisionBoxArray=t.collisionBoxArray,this.buckets=function(t,e){var r={};if(!e)return r;for(var n=function(){var t=a[i],n=t.layerIds.map((function(t){return e.getLayer(t)})).filter(Boolean);if(0!==n.length){t.layers=n,t.stateDependentLayerIds&&(t.stateDependentLayers=t.stateDependentLayerIds.map((function(t){return n.filter((function(e){return e.id===t}))[0]})));for(var o=0,s=n;o<s.length;o+=1)r[s[o].id]=t;}},i=0,a=t;i<a.length;i+=1)n();return r}(t.buckets,e.style),this.hasSymbolBuckets=!1,this.buckets){var i=this.buckets[n];if(i instanceof dl){if(this.hasSymbolBuckets=!0,!r)break;i.justReloaded=!0;}}if(this.hasRTLText=!1,this.hasSymbolBuckets)for(var a in this.buckets){var o=this.buckets[a];if(o instanceof dl&&o.hasRTLText){this.hasRTLText=!0,ai.isLoading()||ai.isLoaded()||"deferred"!==ni()||ii();break}}for(var s in this.queryPadding=0,this.buckets){var u=this.buckets[s];this.queryPadding=Math.max(this.queryPadding,e.style.getLayer(s).queryRadius(u));}t.imageAtlas&&(this.imageAtlas=t.imageAtlas),t.glyphAtlasImage&&(this.glyphAtlasImage=t.glyphAtlasImage);}else this.collisionBoxArray=new Yi;},np.prototype.unloadVectorData=function(){for(var t in this.buckets)this.buckets[t].destroy();this.buckets={},this.imageAtlasTexture&&this.imageAtlasTexture.destroy(),this.imageAtlas&&(this.imageAtlas=null),this.glyphAtlasTexture&&this.glyphAtlasTexture.destroy(),this.latestFeatureIndex=null,this.state="unloaded";},np.prototype.getBucket=function(t){return this.buckets[t.id]},np.prototype.upload=function(t){for(var e in this.buckets){var r=this.buckets[e];r.uploadPending()&&r.upload(t);}var n=t.gl;this.imageAtlas&&!this.imageAtlas.uploaded&&(this.imageAtlasTexture=new Ml(t,this.imageAtlas.image,n.RGBA),this.imageAtlas.uploaded=!0),this.glyphAtlasImage&&(this.glyphAtlasTexture=new Ml(t,this.glyphAtlasImage,n.ALPHA),this.glyphAtlasImage=null);},np.prototype.prepare=function(t){this.imageAtlas&&this.imageAtlas.patchUpdatedImages(t,this.imageAtlasTexture);},np.prototype.queryRenderedFeatures=function(t,e,r,n,i,a,o,s,u,l){return this.latestFeatureIndex&&this.latestFeatureIndex.rawTileData?this.latestFeatureIndex.query({queryGeometry:n,cameraQueryGeometry:i,scale:a,tileSize:this.tileSize,pixelPosMatrix:l,transform:s,params:o,queryPadding:this.queryPadding*u},t,e,r):{}},np.prototype.querySourceFeatures=function(t,e){var r=this.latestFeatureIndex;if(r&&r.rawTileData){var n=r.loadVTLayers(),i=e?e.sourceLayer:"",a=n._geojsonTileLayer||n[i];if(a)for(var o=an(e&&e.filter),s=this.tileID.canonical,u=s.z,l=s.x,p=s.y,c={z:u,x:l,y:p},h=0;h<a.length;h++){var f=a.feature(h);if(o.filter(new oi(this.tileID.overscaledZ),f)){var y=r.getId(f,i),d=new Yl(f,u,l,p,y);d.tile=c,t.push(d);}}}},np.prototype.hasData=function(){return "loaded"===this.state||"reloading"===this.state||"expired"===this.state},np.prototype.patternsLoaded=function(){return this.imageAtlas&&!!Object.keys(this.imageAtlas.patternPositions).length},np.prototype.setExpiryData=function(t){var e=this.expirationTime;if(t.cacheControl){var r=z(t.cacheControl);r["max-age"]&&(this.expirationTime=Date.now()+1e3*r["max-age"]);}else t.expires&&(this.expirationTime=new Date(t.expires).getTime());if(this.expirationTime){var n=Date.now(),i=!1;if(this.expirationTime>n)i=!1;else if(e)if(this.expirationTime<e)i=!0;else {var a=this.expirationTime-e;a?this.expirationTime=n+Math.max(a,3e4):i=!0;}else i=!0;i?(this.expiredRequestCount++,this.state="expired"):this.expiredRequestCount=0;}},np.prototype.getExpiryTimeout=function(){if(this.expirationTime)return this.expiredRequestCount?1e3*(1<<Math.min(this.expiredRequestCount-1,31)):Math.min(this.expirationTime-(new Date).getTime(),Math.pow(2,31)-1)},np.prototype.setFeatureState=function(t,e){if(this.latestFeatureIndex&&this.latestFeatureIndex.rawTileData&&0!==Object.keys(t).length){var r=this.latestFeatureIndex.loadVTLayers();for(var n in this.buckets)if(e.style.hasLayer(n)){var i=this.buckets[n],a=i.layers[0].sourceLayer||"_geojsonTileLayer",o=r[a],s=t[a];if(o&&s&&0!==Object.keys(s).length){i.update(s,o,this.imageAtlas&&this.imageAtlas.patternPositions||{});var u=e&&e.style&&e.style.getLayer(n);u&&(this.queryPadding=Math.max(this.queryPadding,u.queryRadius(i)));}}}},np.prototype.holdingForFade=function(){return void 0!==this.symbolFadeHoldUntil},np.prototype.symbolFadeFinished=function(){return !this.symbolFadeHoldUntil||this.symbolFadeHoldUntil<R.now()},np.prototype.clearFadeHold=function(){this.symbolFadeHoldUntil=void 0;},np.prototype.setHoldDuration=function(t){this.symbolFadeHoldUntil=R.now()+t;},np.prototype.setDependencies=function(t,e){for(var r={},n=0,i=e;n<i.length;n+=1)r[i[n]]=!0;this.dependencies[t]=r;},np.prototype.hasDependency=function(t,e){for(var r=0,n=t;r<n.length;r+=1){var i=this.dependencies[n[r]];if(i)for(var a=0,o=e;a<o.length;a+=1)if(i[o[a]])return !0}return !1};var ip=o.performance,ap=function(t){this._marks={start:[t.url,"start"].join("#"),end:[t.url,"end"].join("#"),measure:t.url.toString()},ip.mark(this._marks.start);};ap.prototype.finish=function(){ip.mark(this._marks.end);var t=ip.getEntriesByName(this._marks.measure);return 0===t.length&&(ip.measure(this._marks.measure,this._marks.start,this._marks.end),t=ip.getEntriesByName(this._marks.measure),ip.clearMarks(this._marks.start),ip.clearMarks(this._marks.end),ip.clearMeasures(this._marks.measure)),t},t.Actor=Tl,t.AlphaImage=mo,t.CanonicalTileID=Kl,t.CollisionBoxArray=Yi,t.Color=Qt,t.DEMData=Jl,t.DataConstantProperty=di,t.DictionaryCoder=Hl,t.EXTENT=8192,t.ErrorEvent=It,t.EvaluationParameters=oi,t.Event=kt,t.Evented=zt,t.FeatureIndex=Ql,t.FillBucket=as,t.FillExtrusionBucket=_s,t.ImageAtlas=gu,t.ImagePosition=mu,t.LineBucket=Ts,t.LngLat=Dl,t.LngLatBounds=Fl,t.MercatorCoordinate=Nl,t.ONE_EM=24,t.OverscaledTileID=Zl,t.Point=i,t.Point$1=i,t.Properties=bi,t.Protobuf=Js,t.RGBAImage=vo,t.RequestManager=G,t.RequestPerformance=ap,t.ResourceType=yt,t.SegmentVector=oa,t.SourceFeatureState=Wl,t.StructArrayLayout1ui2=Xi,t.StructArrayLayout2f1f2i16=Ri,t.StructArrayLayout2i4=zi,t.StructArrayLayout3ui6=Ui,t.StructArrayLayout4i8=Ci,t.SymbolBucket=dl,t.Texture=Ml,t.Tile=np,t.Transitionable=li,t.Uniform1f=xa,t.Uniform1i=ga,t.Uniform2f=ba,t.Uniform3f=wa,t.Uniform4f=_a,t.UniformColor=Aa,t.UniformMatrix4f=ka,t.UnwrappedTileID=Gl,t.ValidationError=Et,t.WritingMode=xu,t.ZoomHistory=Nn,t.add=function(t,e,r){return t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t},t.addDynamicAttributes=cl,t.asyncAll=function(t,e,r){if(!t.length)return r(null,[]);var n=t.length,i=new Array(t.length),a=null;t.forEach((function(t,o){e(t,(function(t,e){t&&(a=t),i[o]=e,0==--n&&r(a,i);}));}));},t.bezier=u,t.bindAll=v,t.browser=R,t.cacheEntryPossiblyAdded=function(t){++ht>ut&&(t.getActor().send("enforceCacheSizeLimit",st),ht=0);},t.clamp=p,t.clearTileCache=function(t){var e=o.caches.delete("mapbox-tiles");t&&e.catch(t).then((function(){return t()}));},t.clipLine=Ku,t.clone=function(t){var e=new no(16);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e},t.clone$1=w,t.clone$2=function(t){var e=new no(3);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e},t.collisionCircleLayout=Ns,t.config=O,t.create=function(){var t=new no(16);return no!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t},t.create$1=function(){var t=new no(9);return no!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t},t.create$2=function(){var t=new no(4);return no!=Float32Array&&(t[1]=0,t[2]=0),t[0]=1,t[3]=1,t},t.createCommonjsModule=e,t.createExpression=Gr,t.createLayout=ki,t.createStyleLayer=function(t){return "custom"===t.type?new Sl(t):new kl[t.type](t)},t.cross=function(t,e,r){var n=e[0],i=e[1],a=e[2],o=r[0],s=r[1],u=r[2];return t[0]=i*u-a*s,t[1]=a*o-n*u,t[2]=n*s-i*o,t},t.deepEqual=function t(e,r){if(Array.isArray(e)){if(!Array.isArray(r)||e.length!==r.length)return !1;for(var n=0;n<e.length;n++)if(!t(e[n],r[n]))return !1;return !0}if("object"==typeof e&&null!==e&&null!==r){if("object"!=typeof r)return !1;if(Object.keys(e).length!==Object.keys(r).length)return !1;for(var i in e)if(!t(e[i],r[i]))return !1;return !0}return e===r},t.dot=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]},t.dot$1=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]},t.ease=l,t.emitValidationErrors=Mn,t.endsWith=g,t.enforceCacheSizeLimit=function(t){lt(),tt&&tt.then((function(e){e.keys().then((function(r){for(var n=0;n<r.length-t;n++)e.delete(r[n]);}));}));},t.evaluateSizeForFeature=Fu,t.evaluateSizeForZoom=Du,t.evaluateVariableOffset=nl,t.evented=ri,t.extend=h,t.featureFilter=an,t.filterObject=b,t.fromRotation=function(t,e){var r=Math.sin(e),n=Math.cos(e);return t[0]=n,t[1]=r,t[2]=0,t[3]=-r,t[4]=n,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},t.getAnchorAlignment=Pu,t.getAnchorJustification=il,t.getArrayBuffer=bt,t.getImage=_t,t.getJSON=function(t,e){return xt(h(t,{type:"json"}),e)},t.getRTLTextPluginStatus=ni,t.getReferrer=mt,t.getVideo=function(t,e){var r,n,i=o.document.createElement("video");i.muted=!0,i.onloadstart=function(){e(null,i);};for(var a=0;a<t.length;a++){var s=o.document.createElement("source");r=t[a],n=void 0,(n=o.document.createElement("a")).href=r,(n.protocol!==o.document.location.protocol||n.host!==o.document.location.host)&&(i.crossOrigin="Anonymous"),s.src=t[a],i.appendChild(s);}return {cancel:function(){}}},t.identity=io,t.invert=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],o=e[4],s=e[5],u=e[6],l=e[7],p=e[8],c=e[9],h=e[10],f=e[11],y=e[12],d=e[13],m=e[14],v=e[15],g=r*s-n*o,x=r*u-i*o,b=r*l-a*o,w=n*u-i*s,_=n*l-a*s,A=i*l-a*u,S=p*d-c*y,k=p*m-h*y,I=p*v-f*y,z=c*m-h*d,C=c*v-f*d,E=h*v-f*m,P=g*E-x*C+b*z+w*I-_*k+A*S;return P?(t[0]=(s*E-u*C+l*z)*(P=1/P),t[1]=(i*C-n*E-a*z)*P,t[2]=(d*A-m*_+v*w)*P,t[3]=(h*_-c*A-f*w)*P,t[4]=(u*I-o*E-l*k)*P,t[5]=(r*E-i*I+a*k)*P,t[6]=(m*b-y*A-v*x)*P,t[7]=(p*A-h*b+f*x)*P,t[8]=(o*C-s*I+l*S)*P,t[9]=(n*I-r*C-a*S)*P,t[10]=(y*_-d*b+v*g)*P,t[11]=(c*b-p*_-f*g)*P,t[12]=(s*k-o*z-u*S)*P,t[13]=(r*z-n*k+i*S)*P,t[14]=(d*x-y*w-m*g)*P,t[15]=(p*w-c*x+h*g)*P,t):null},t.isChar=Kn,t.isMapboxURL=Z,t.keysDifference=function(t,e){var r=[];for(var n in t)n in e||r.push(n);return r},t.makeRequest=xt,t.mapObject=x,t.mercatorXfromLng=Ol,t.mercatorYfromLat=Ul,t.mercatorZfromAltitude=jl,t.mul=so,t.multiply=ao,t.mvt=gs,t.nextPowerOfTwo=function(t){return t<=1?1:Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},t.normalize=function(t,e){var r=e[0],n=e[1],i=e[2],a=r*r+n*n+i*i;return a>0&&(a=1/Math.sqrt(a)),t[0]=e[0]*a,t[1]=e[1]*a,t[2]=e[2]*a,t},t.number=Ne,t.offscreenCanvasSupported=ft,t.ortho=function(t,e,r,n,i,a,o){var s=1/(e-r),u=1/(n-i),l=1/(a-o);return t[0]=-2*s,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*l,t[11]=0,t[12]=(e+r)*s,t[13]=(i+n)*u,t[14]=(o+a)*l,t[15]=1,t},t.parseGlyphPBF=function(t){return new Js(t).readFields(hu,[])},t.pbf=Js,t.performSymbolLayout=function(t,e,r,n,i,a,o){t.createArrays(),t.tilePixelRatio=8192/(512*t.overscaling),t.compareText={},t.iconsNeedLinear=!1;var s=t.layers[0].layout,u=t.layers[0]._unevaluatedLayout._values,l={};if("composite"===t.textSizeData.kind){var p=t.textSizeData,c=p.maxZoom;l.compositeTextSizes=[u["text-size"].possiblyEvaluate(new oi(p.minZoom),o),u["text-size"].possiblyEvaluate(new oi(c),o)];}if("composite"===t.iconSizeData.kind){var h=t.iconSizeData,f=h.maxZoom;l.compositeIconSizes=[u["icon-size"].possiblyEvaluate(new oi(h.minZoom),o),u["icon-size"].possiblyEvaluate(new oi(f),o)];}l.layoutTextSize=u["text-size"].possiblyEvaluate(new oi(t.zoom+1),o),l.layoutIconSize=u["icon-size"].possiblyEvaluate(new oi(t.zoom+1),o),l.textMaxSize=u["text-size"].possiblyEvaluate(new oi(18));for(var y=24*s.get("text-line-height"),d="map"===s.get("text-rotation-alignment")&&"point"!==s.get("symbol-placement"),m=s.get("text-keep-upright"),v=s.get("text-size"),g=function(){var a=b[x],u=s.get("text-font").evaluate(a,{},o).join(","),p=v.evaluate(a,{},o),c=l.layoutTextSize.evaluate(a,{},o),h=l.layoutIconSize.evaluate(a,{},o),f={horizontal:{},vertical:void 0},g=a.text,w=[0,0];if(g){var _=g.toString(),S=24*s.get("text-letter-spacing").evaluate(a,{},o),k=function(t){for(var e=0,r=t;e<r.length;e+=1)if(n=r[e].charCodeAt(0),Kn.Arabic(n)||Kn["Arabic Supplement"](n)||Kn["Arabic Extended-A"](n)||Kn["Arabic Presentation Forms-A"](n)||Kn["Arabic Presentation Forms-B"](n))return !1;var n;return !0}(_)?S:0,I=s.get("text-anchor").evaluate(a,{},o),z=s.get("text-variable-anchor");if(!z){var C=s.get("text-radial-offset").evaluate(a,{},o);w=C?nl(I,[24*C,rl]):s.get("text-offset").evaluate(a,{},o).map((function(t){return 24*t}));}var E=d?"center":s.get("text-justify").evaluate(a,{},o),P=s.get("symbol-placement"),M="point"===P?24*s.get("text-max-width").evaluate(a,{},o):0,B=function(){t.allowVerticalPlacement&&Gn(_)&&(f.vertical=_u(g,e,r,i,u,M,y,I,"left",k,w,xu.vertical,!0,P,c,p));};if(!d&&z){for(var T="auto"===E?z.map((function(t){return il(t)})):[E],V=!1,F=0;F<T.length;F++){var D=T[F];if(!f.horizontal[D])if(V)f.horizontal[D]=f.horizontal[0];else {var L=_u(g,e,r,i,u,M,y,"center",D,k,w,xu.horizontal,!1,P,c,p);L&&(f.horizontal[D]=L,V=1===L.positionedLines.length);}}B();}else {"auto"===E&&(E=il(I));var R=_u(g,e,r,i,u,M,y,I,E,k,w,xu.horizontal,!1,P,c,p);R&&(f.horizontal[E]=R),B(),Gn(_)&&d&&m&&(f.vertical=_u(g,e,r,i,u,M,y,I,E,k,w,xu.vertical,!1,P,c,p));}}var O=void 0,U=!1;if(a.icon&&a.icon.name){var j=n[a.icon.name];j&&(O=function(t,e,r){var n=Pu(r),i=e[0]-t.displaySize[0]*n.horizontalAlign,a=e[1]-t.displaySize[1]*n.verticalAlign;return {image:t,top:a,bottom:a+t.displaySize[1],left:i,right:i+t.displaySize[0]}}(i[a.icon.name],s.get("icon-offset").evaluate(a,{},o),s.get("icon-anchor").evaluate(a,{},o)),U=j.sdf,void 0===t.sdfIcons?t.sdfIcons=j.sdf:t.sdfIcons!==j.sdf&&A("Style sheet warning: Cannot mix SDF and non-SDF icons in one buffer"),(j.pixelRatio!==t.pixelRatio||0!==s.get("icon-rotate").constantOr(1))&&(t.iconsNeedLinear=!0));}var q=ol(f.horizontal)||f.vertical;t.iconsInText=!!q&&q.iconsInText,(q||O)&&function(t,e,r,n,i,a,o,s,u,l,p){var c=a.textMaxSize.evaluate(e,{});void 0===c&&(c=o);var h,f=t.layers[0].layout,y=f.get("icon-offset").evaluate(e,{},p),d=ol(r.horizontal),m=o/24,v=t.tilePixelRatio*m,g=t.tilePixelRatio*c/24,x=t.tilePixelRatio*s,b=t.tilePixelRatio*f.get("symbol-spacing"),w=f.get("text-padding")*t.tilePixelRatio,_=f.get("icon-padding")*t.tilePixelRatio,S=f.get("text-max-angle")/180*Math.PI,k="map"===f.get("text-rotation-alignment")&&"point"!==f.get("symbol-placement"),I="map"===f.get("icon-rotation-alignment")&&"point"!==f.get("symbol-placement"),z=f.get("symbol-placement"),C=b/2,E=f.get("icon-text-fit");n&&"none"!==E&&(t.allowVerticalPlacement&&r.vertical&&(h=Bu(n,r.vertical,E,f.get("icon-text-fit-padding"),y,m)),d&&(n=Bu(n,d,E,f.get("icon-text-fit-padding"),y,m)));var P=function(s,c){c.x<0||c.x>=8192||c.y<0||c.y>=8192||function(t,e,r,n,i,a,o,s,u,l,p,c,h,f,y,d,m,v,g,x,b,w,_,S,k){var I,z,C,E,P,M=t.addToLineVertexArray(e,r),B=0,T=0,V=0,F=0,D=-1,L=-1,R={},O=ca(""),U=0,j=0;if(void 0===s._unevaluatedLayout.getValue("text-radial-offset")?(U=(I=s.layout.get("text-offset").evaluate(b,{},S).map((function(t){return 24*t})))[0],j=I[1]):(U=24*s.layout.get("text-radial-offset").evaluate(b,{},S),j=rl),t.allowVerticalPlacement&&n.vertical){var q=s.layout.get("text-rotate").evaluate(b,{},S)+90;E=new Yu(u,e,l,p,c,n.vertical,h,f,y,q),o&&(P=new Yu(u,e,l,p,c,o,m,v,y,q));}if(i){var N=s.layout.get("icon-rotate").evaluate(b,{}),K="none"!==s.layout.get("icon-text-fit"),G=Gu(i,N,_,K),Z=o?Gu(o,N,_,K):void 0;C=new Yu(u,e,l,p,c,i,m,v,!1,N),B=4*G.length;var X=t.iconSizeData,J=null;"source"===X.kind?(J=[128*s.layout.get("icon-size").evaluate(b,{})])[0]>32640&&A(t.layerIds[0]+': Value for "icon-size" is >= 255. Reduce your "icon-size".'):"composite"===X.kind&&((J=[128*w.compositeIconSizes[0].evaluate(b,{},S),128*w.compositeIconSizes[1].evaluate(b,{},S)])[0]>32640||J[1]>32640)&&A(t.layerIds[0]+': Value for "icon-size" is >= 255. Reduce your "icon-size".'),t.addSymbols(t.icon,G,J,x,g,b,!1,e,M.lineStartIndex,M.lineLength,-1,S),D=t.icon.placedSymbolArray.length-1,Z&&(T=4*Z.length,t.addSymbols(t.icon,Z,J,x,g,b,xu.vertical,e,M.lineStartIndex,M.lineLength,-1,S),L=t.icon.placedSymbolArray.length-1);}for(var H in n.horizontal){var Y=n.horizontal[H];if(!z){O=ca(Y.text);var $=s.layout.get("text-rotate").evaluate(b,{},S);z=new Yu(u,e,l,p,c,Y,h,f,y,$);}var W=1===Y.positionedLines.length;if(V+=al(t,e,Y,a,s,y,b,d,M,n.vertical?xu.horizontal:xu.horizontalOnly,W?Object.keys(n.horizontal):[H],R,D,w,S),W)break}n.vertical&&(F+=al(t,e,n.vertical,a,s,y,b,d,M,xu.vertical,["vertical"],R,L,w,S));var Q=z?z.boxStartIndex:t.collisionBoxArray.length,tt=z?z.boxEndIndex:t.collisionBoxArray.length,et=E?E.boxStartIndex:t.collisionBoxArray.length,rt=E?E.boxEndIndex:t.collisionBoxArray.length,nt=C?C.boxStartIndex:t.collisionBoxArray.length,it=C?C.boxEndIndex:t.collisionBoxArray.length,at=P?P.boxStartIndex:t.collisionBoxArray.length,ot=P?P.boxEndIndex:t.collisionBoxArray.length,st=-1,ut=function(t,e){return t&&t.circleDiameter?Math.max(t.circleDiameter,e):e};st=ut(z,st),st=ut(E,st),st=ut(C,st);var lt=(st=ut(P,st))>-1?1:0;lt&&(st*=k/24),t.glyphOffsetArray.length>=dl.MAX_GLYPHS&&A("Too many glyphs being rendered in a tile. See https://github.com/mapbox/mapbox-gl-js/issues/2907"),void 0!==b.sortKey&&t.addToSortKeyRanges(t.symbolInstances.length,b.sortKey),t.symbolInstances.emplaceBack(e.x,e.y,R.right>=0?R.right:-1,R.center>=0?R.center:-1,R.left>=0?R.left:-1,R.vertical||-1,D,L,O,Q,tt,et,rt,nt,it,at,ot,l,V,F,B,T,lt,0,h,U,j,st);}(t,c,s,r,n,i,h,t.layers[0],t.collisionBoxArray,e.index,e.sourceLayerIndex,t.index,v,w,k,u,x,_,I,y,e,a,l,p,o);};if("line"===z)for(var M=0,B=Ku(e.geometry,0,0,8192,8192);M<B.length;M+=1)for(var T=B[M],V=0,F=Nu(T,b,S,r.vertical||d,n,24,g,t.overscaling,8192);V<F.length;V+=1){var D=F[V];d&&sl(t,d.text,C,D)||P(T,D);}else if("line-center"===z)for(var L=0,R=e.geometry;L<R.length;L+=1){var O=R[L];if(O.length>1){var U=qu(O,S,r.vertical||d,n,24,g);U&&P(O,U);}}else if("Polygon"===e.type)for(var j=0,q=es(e.geometry,0);j<q.length;j+=1){var N=q[j],K=Qu(N,16);P(N[0],new Tu(K.x,K.y,0));}else if("LineString"===e.type)for(var G=0,Z=e.geometry;G<Z.length;G+=1){var X=Z[G];P(X,new Tu(X[0].x,X[0].y,0));}else if("Point"===e.type)for(var J=0,H=e.geometry;J<H.length;J+=1)for(var Y=0,$=H[J];Y<$.length;Y+=1){var W=$[Y];P([W],new Tu(W.x,W.y,0));}}(t,a,f,O,n,l,c,h,w,U,o);},x=0,b=t.features;x<b.length;x+=1)g();a&&t.generateCollisionDebugBuffers();},t.perspective=function(t,e,r,n,i){var a,o=1/Math.tan(e/2);return t[0]=o/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=i&&i!==1/0?(t[10]=(i+n)*(a=1/(n-i)),t[14]=2*i*n*a):(t[10]=-1,t[14]=-2*n),t},t.pick=function(t,e){for(var r={},n=0;n<e.length;n++){var i=e[n];i in t&&(r[i]=t[i]);}return r},t.plugin=ai,t.polygonIntersectsPolygon=ja,t.postMapLoadEvent=ot,t.postTurnstileEvent=it,t.potpack=du,t.refProperties=["type","source","source-layer","minzoom","maxzoom","filter","layout"],t.register=Ln,t.registerForPluginStateChange=function(t){return t({pluginStatus:Wn,pluginURL:Qn}),ri.on("pluginStateChange",t),t},t.renderColorRamp=xo,t.rotate=function(t,e,r){var n=e[0],i=e[1],a=e[2],o=e[3],s=Math.sin(r),u=Math.cos(r);return t[0]=n*u+a*s,t[1]=i*u+o*s,t[2]=n*-s+a*u,t[3]=i*-s+o*u,t},t.rotateX=function(t,e,r){var n=Math.sin(r),i=Math.cos(r),a=e[4],o=e[5],s=e[6],u=e[7],l=e[8],p=e[9],c=e[10],h=e[11];return e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[4]=a*i+l*n,t[5]=o*i+p*n,t[6]=s*i+c*n,t[7]=u*i+h*n,t[8]=l*i-a*n,t[9]=p*i-o*n,t[10]=c*i-s*n,t[11]=h*i-u*n,t},t.rotateZ=function(t,e,r){var n=Math.sin(r),i=Math.cos(r),a=e[0],o=e[1],s=e[2],u=e[3],l=e[4],p=e[5],c=e[6],h=e[7];return e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=a*i+l*n,t[1]=o*i+p*n,t[2]=s*i+c*n,t[3]=u*i+h*n,t[4]=l*i-a*n,t[5]=p*i-o*n,t[6]=c*i-s*n,t[7]=h*i-u*n,t},t.scale=function(t,e,r){var n=r[0],i=r[1],a=r[2];return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*i,t[5]=e[5]*i,t[6]=e[6]*i,t[7]=e[7]*i,t[8]=e[8]*a,t[9]=e[9]*a,t[10]=e[10]*a,t[11]=e[11]*a,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t},t.scale$1=function(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t[3]=e[3]*r,t},t.scale$2=function(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t},t.setCacheLimits=function(t,e){st=t,ut=e;},t.setRTLTextPlugin=function(t,e,r){if(void 0===r&&(r=!1),"deferred"===Wn||"loading"===Wn||"loaded"===Wn)throw new Error("setRTLTextPlugin cannot be called multiple times.");Qn=R.resolveURL(t),Wn="deferred",$n=e,ei(),r||ii();},t.sphericalToCartesian=function(t){var e=t[0],r=t[1],n=t[2];return r+=90,r*=Math.PI/180,n*=Math.PI/180,{x:e*Math.cos(r)*Math.sin(n),y:e*Math.sin(r)*Math.sin(n),z:e*Math.cos(n)}},t.sqrLen=function(t){var e=t[0],r=t[1];return e*e+r*r},t.styleSpec=Ct,t.sub=function(t,e,r){return t[0]=e[0]-r[0],t[1]=e[1]-r[1],t[2]=e[2]-r[2],t},t.symbolSize=Lu,t.transformMat3=function(t,e,r){var n=e[0],i=e[1],a=e[2];return t[0]=n*r[0]+i*r[3]+a*r[6],t[1]=n*r[1]+i*r[4]+a*r[7],t[2]=n*r[2]+i*r[5]+a*r[8],t},t.transformMat4=uo,t.translate=function(t,e,r){var n,i,a,o,s,u,l,p,c,h,f,y,d=r[0],m=r[1],v=r[2];return e===t?(t[12]=e[0]*d+e[4]*m+e[8]*v+e[12],t[13]=e[1]*d+e[5]*m+e[9]*v+e[13],t[14]=e[2]*d+e[6]*m+e[10]*v+e[14],t[15]=e[3]*d+e[7]*m+e[11]*v+e[15]):(i=e[1],a=e[2],o=e[3],s=e[4],u=e[5],l=e[6],p=e[7],c=e[8],h=e[9],f=e[10],y=e[11],t[0]=n=e[0],t[1]=i,t[2]=a,t[3]=o,t[4]=s,t[5]=u,t[6]=l,t[7]=p,t[8]=c,t[9]=h,t[10]=f,t[11]=y,t[12]=n*d+s*m+c*v+e[12],t[13]=i*d+u*m+h*v+e[13],t[14]=a*d+l*m+f*v+e[14],t[15]=o*d+p*m+y*v+e[15]),t},t.triggerPluginCompletionEvent=ti,t.uniqueId=y,t.validateCustomStyleLayer=function(t){var e=[],r=t.id;return void 0===r&&e.push({message:"layers."+r+': missing required property "id"'}),void 0===t.render&&e.push({message:"layers."+r+': missing required method "render"'}),t.renderingMode&&"2d"!==t.renderingMode&&"3d"!==t.renderingMode&&e.push({message:"layers."+r+': property "renderingMode" must be either "2d" or "3d"'}),e},t.validateLight=Cn,t.validateStyle=zn,t.values=function(t){var e=[];for(var r in t)e.push(t[r]);return e},t.vectorTile=gs,t.version="1.12.0",t.warnOnce=A,t.webpSupported=U,t.window=o,t.wrap=c;}));

  define(["./shared"],(function(e){function t(e){var r=typeof e;if("number"===r||"boolean"===r||"string"===r||null==e)return JSON.stringify(e);if(Array.isArray(e)){for(var i="[",o=0,n=e;o<n.length;o+=1)i+=t(n[o])+",";return i+"]"}for(var s=Object.keys(e).sort(),a="{",l=0;l<s.length;l++)a+=JSON.stringify(s[l])+":"+t(e[s[l]])+",";return a+"}"}function r(r){for(var i="",o=0,n=e.refProperties;o<n.length;o+=1)i+="/"+t(r[n[o]]);return i}var i=function(e){this.keyCache={},e&&this.replace(e);};i.prototype.replace=function(e){this._layerConfigs={},this._layers={},this.update(e,[]);},i.prototype.update=function(t,i){for(var o=this,n=0,s=t;n<s.length;n+=1){var a=s[n];this._layerConfigs[a.id]=a;var l=this._layers[a.id]=e.createStyleLayer(a);l._featureFilter=e.featureFilter(l.filter),this.keyCache[a.id]&&delete this.keyCache[a.id];}for(var u=0,h=i;u<h.length;u+=1){var c=h[u];delete this.keyCache[c],delete this._layerConfigs[c],delete this._layers[c];}this.familiesBySource={};for(var p=0,f=function(e,t){for(var i={},o=0;o<e.length;o++){var n=t&&t[e[o].id]||r(e[o]);t&&(t[e[o].id]=n);var s=i[n];s||(s=i[n]=[]),s.push(e[o]);}var a=[];for(var l in i)a.push(i[l]);return a}(e.values(this._layerConfigs),this.keyCache);p<f.length;p+=1){var d=f[p].map((function(e){return o._layers[e.id]})),g=d[0];if("none"!==g.visibility){var v=g.source||"",m=this.familiesBySource[v];m||(m=this.familiesBySource[v]={});var y=g.sourceLayer||"_geojsonTileLayer",x=m[y];x||(x=m[y]=[]),x.push(d);}}};var o=function(t){var r={},i=[];for(var o in t){var n=t[o],s=r[o]={};for(var a in n){var l=n[+a];if(l&&0!==l.bitmap.width&&0!==l.bitmap.height){var u={x:0,y:0,w:l.bitmap.width+2,h:l.bitmap.height+2};i.push(u),s[a]={rect:u,metrics:l.metrics};}}}var h=e.potpack(i),c=new e.AlphaImage({width:h.w||1,height:h.h||1});for(var p in t){var f=t[p];for(var d in f){var g=f[+d];if(g&&0!==g.bitmap.width&&0!==g.bitmap.height){var v=r[p][d].rect;e.AlphaImage.copy(g.bitmap,c,{x:0,y:0},{x:v.x+1,y:v.y+1},g.bitmap);}}}this.image=c,this.positions=r;};e.register("GlyphAtlas",o);var n=function(t){this.tileID=new e.OverscaledTileID(t.tileID.overscaledZ,t.tileID.wrap,t.tileID.canonical.z,t.tileID.canonical.x,t.tileID.canonical.y),this.uid=t.uid,this.zoom=t.zoom,this.pixelRatio=t.pixelRatio,this.tileSize=t.tileSize,this.source=t.source,this.overscaling=this.tileID.overscaleFactor(),this.showCollisionBoxes=t.showCollisionBoxes,this.collectResourceTiming=!!t.collectResourceTiming,this.returnDependencies=!!t.returnDependencies,this.promoteId=t.promoteId;};function s(t,r,i){for(var o=new e.EvaluationParameters(r),n=0,s=t;n<s.length;n+=1)s[n].recalculate(o,i);}function a(t,r){var i=e.getArrayBuffer(t.request,(function(t,i,o,n){t?r(t):i&&r(null,{vectorTile:new e.vectorTile.VectorTile(new e.pbf(i)),rawData:i,cacheControl:o,expires:n});}));return function(){i.cancel(),r();}}n.prototype.parse=function(t,r,i,n,a){var l=this;this.status="parsing",this.data=t,this.collisionBoxArray=new e.CollisionBoxArray;var u=new e.DictionaryCoder(Object.keys(t.layers).sort()),h=new e.FeatureIndex(this.tileID,this.promoteId);h.bucketLayerIDs=[];var c,p,f,d,g={},v={featureIndex:h,iconDependencies:{},patternDependencies:{},glyphDependencies:{},availableImages:i},m=r.familiesBySource[this.source];for(var y in m){var x=t.layers[y];if(x){1===x.version&&e.warnOnce('Vector tile source "'+this.source+'" layer "'+y+'" does not use vector tile spec v2 and therefore may have some rendering errors.');for(var w=u.encode(y),S=[],I=0;I<x.length;I++){var M=x.feature(I),b=h.getId(M,y);S.push({feature:M,id:b,index:I,sourceLayerIndex:w});}for(var _=0,k=m[y];_<k.length;_+=1){var P=k[_],T=P[0];T.minzoom&&this.zoom<Math.floor(T.minzoom)||T.maxzoom&&this.zoom>=T.maxzoom||"none"!==T.visibility&&(s(P,this.zoom,i),(g[T.id]=T.createBucket({index:h.bucketLayerIDs.length,layers:P,zoom:this.zoom,pixelRatio:this.pixelRatio,overscaling:this.overscaling,collisionBoxArray:this.collisionBoxArray,sourceLayerIndex:w,sourceID:this.source})).populate(S,v,this.tileID.canonical),h.bucketLayerIDs.push(P.map((function(e){return e.id}))));}}}var C=e.mapObject(v.glyphDependencies,(function(e){return Object.keys(e).map(Number)}));Object.keys(C).length?n.send("getGlyphs",{uid:this.uid,stacks:C},(function(e,t){c||(c=e,p=t,z.call(l));})):p={};var D=Object.keys(v.iconDependencies);D.length?n.send("getImages",{icons:D,source:this.source,tileID:this.tileID,type:"icons"},(function(e,t){c||(c=e,f=t,z.call(l));})):f={};var L=Object.keys(v.patternDependencies);function z(){if(c)return a(c);if(p&&f&&d){var t=new o(p),r=new e.ImageAtlas(f,d);for(var n in g){var l=g[n];l instanceof e.SymbolBucket?(s(l.layers,this.zoom,i),e.performSymbolLayout(l,p,t.positions,f,r.iconPositions,this.showCollisionBoxes,this.tileID.canonical)):l.hasPattern&&(l instanceof e.LineBucket||l instanceof e.FillBucket||l instanceof e.FillExtrusionBucket)&&(s(l.layers,this.zoom,i),l.addFeatures(v,this.tileID.canonical,r.patternPositions));}this.status="done",a(null,{buckets:e.values(g).filter((function(e){return !e.isEmpty()})),featureIndex:h,collisionBoxArray:this.collisionBoxArray,glyphAtlasImage:t.image,imageAtlas:r,glyphMap:this.returnDependencies?p:null,iconMap:this.returnDependencies?f:null,glyphPositions:this.returnDependencies?t.positions:null});}}L.length?n.send("getImages",{icons:L,source:this.source,tileID:this.tileID,type:"patterns"},(function(e,t){c||(c=e,d=t,z.call(l));})):d={},z.call(this);};var l=function(e,t,r,i){this.actor=e,this.layerIndex=t,this.availableImages=r,this.loadVectorData=i||a,this.loading={},this.loaded={};};l.prototype.loadTile=function(t,r){var i=this,o=t.uid;this.loading||(this.loading={});var s=!!(t&&t.request&&t.request.collectResourceTiming)&&new e.RequestPerformance(t.request),a=this.loading[o]=new n(t);a.abort=this.loadVectorData(t,(function(t,n){if(delete i.loading[o],t||!n)return a.status="done",i.loaded[o]=a,r(t);var l=n.rawData,u={};n.expires&&(u.expires=n.expires),n.cacheControl&&(u.cacheControl=n.cacheControl);var h={};if(s){var c=s.finish();c&&(h.resourceTiming=JSON.parse(JSON.stringify(c)));}a.vectorTile=n.vectorTile,a.parse(n.vectorTile,i.layerIndex,i.availableImages,i.actor,(function(t,i){if(t||!i)return r(t);r(null,e.extend({rawTileData:l.slice(0)},i,u,h));})),i.loaded=i.loaded||{},i.loaded[o]=a;}));},l.prototype.reloadTile=function(e,t){var r=this,i=this.loaded,o=e.uid,n=this;if(i&&i[o]){var s=i[o];s.showCollisionBoxes=e.showCollisionBoxes;var a=function(e,i){var o=s.reloadCallback;o&&(delete s.reloadCallback,s.parse(s.vectorTile,n.layerIndex,r.availableImages,n.actor,o)),t(e,i);};"parsing"===s.status?s.reloadCallback=a:"done"===s.status&&(s.vectorTile?s.parse(s.vectorTile,this.layerIndex,this.availableImages,this.actor,a):a());}},l.prototype.abortTile=function(e,t){var r=this.loading,i=e.uid;r&&r[i]&&r[i].abort&&(r[i].abort(),delete r[i]),t();},l.prototype.removeTile=function(e,t){var r=this.loaded,i=e.uid;r&&r[i]&&delete r[i],t();};var u=e.window.ImageBitmap,h=function(){this.loaded={};};function c(e,t){if(0!==e.length){p(e[0],t);for(var r=1;r<e.length;r++)p(e[r],!t);}}function p(e,t){for(var r=0,i=0,o=e.length,n=o-1;i<o;n=i++)r+=(e[i][0]-e[n][0])*(e[n][1]+e[i][1]);r>=0!=!!t&&e.reverse();}h.prototype.loadTile=function(t,r){var i=t.uid,o=t.encoding,n=t.rawImageData,s=u&&n instanceof u?this.getImageData(n):n,a=new e.DEMData(i,s,o);this.loaded=this.loaded||{},this.loaded[i]=a,r(null,a);},h.prototype.getImageData=function(t){this.offscreenCanvas&&this.offscreenCanvasContext||(this.offscreenCanvas=new OffscreenCanvas(t.width,t.height),this.offscreenCanvasContext=this.offscreenCanvas.getContext("2d")),this.offscreenCanvas.width=t.width,this.offscreenCanvas.height=t.height,this.offscreenCanvasContext.drawImage(t,0,0,t.width,t.height);var r=this.offscreenCanvasContext.getImageData(-1,-1,t.width+2,t.height+2);return this.offscreenCanvasContext.clearRect(0,0,this.offscreenCanvas.width,this.offscreenCanvas.height),new e.RGBAImage({width:r.width,height:r.height},r.data)},h.prototype.removeTile=function(e){var t=this.loaded,r=e.uid;t&&t[r]&&delete t[r];};var f=e.vectorTile.VectorTileFeature.prototype.toGeoJSON,d=function(t){this._feature=t,this.extent=e.EXTENT,this.type=t.type,this.properties=t.tags,"id"in t&&!isNaN(t.id)&&(this.id=parseInt(t.id,10));};d.prototype.loadGeometry=function(){if(1===this._feature.type){for(var t=[],r=0,i=this._feature.geometry;r<i.length;r+=1){var o=i[r];t.push([new e.Point$1(o[0],o[1])]);}return t}for(var n=[],s=0,a=this._feature.geometry;s<a.length;s+=1){for(var l=[],u=0,h=a[s];u<h.length;u+=1){var c=h[u];l.push(new e.Point$1(c[0],c[1]));}n.push(l);}return n},d.prototype.toGeoJSON=function(e,t,r){return f.call(this,e,t,r)};var g=function(t){this.layers={_geojsonTileLayer:this},this.name="_geojsonTileLayer",this.extent=e.EXTENT,this.length=t.length,this._features=t;};g.prototype.feature=function(e){return new d(this._features[e])};var v=e.vectorTile.VectorTileFeature,m=y;function y(e,t){this.options=t||{},this.features=e,this.length=e.length;}function x(e,t){this.id="number"==typeof e.id?e.id:void 0,this.type=e.type,this.rawGeometry=1===e.type?[e.geometry]:e.geometry,this.properties=e.tags,this.extent=t||4096;}y.prototype.feature=function(e){return new x(this.features[e],this.options.extent)},x.prototype.loadGeometry=function(){var t=this.rawGeometry;this.geometry=[];for(var r=0;r<t.length;r++){for(var i=t[r],o=[],n=0;n<i.length;n++)o.push(new e.Point$1(i[n][0],i[n][1]));this.geometry.push(o);}return this.geometry},x.prototype.bbox=function(){this.geometry||this.loadGeometry();for(var e=this.geometry,t=1/0,r=-1/0,i=1/0,o=-1/0,n=0;n<e.length;n++)for(var s=e[n],a=0;a<s.length;a++){var l=s[a];t=Math.min(t,l.x),r=Math.max(r,l.x),i=Math.min(i,l.y),o=Math.max(o,l.y);}return [t,i,r,o]},x.prototype.toGeoJSON=v.prototype.toGeoJSON;var w=I,S=m;function I(t){var r=new e.pbf;return function(e,t){for(var r in e.layers)t.writeMessage(3,M,e.layers[r]);}(t,r),r.finish()}function M(e,t){var r;t.writeVarintField(15,e.version||1),t.writeStringField(1,e.name||""),t.writeVarintField(5,e.extent||4096);var i={keys:[],values:[],keycache:{},valuecache:{}};for(r=0;r<e.length;r++)i.feature=e.feature(r),t.writeMessage(2,b,i);var o=i.keys;for(r=0;r<o.length;r++)t.writeStringField(3,o[r]);var n=i.values;for(r=0;r<n.length;r++)t.writeMessage(4,C,n[r]);}function b(e,t){var r=e.feature;void 0!==r.id&&t.writeVarintField(1,r.id),t.writeMessage(2,_,e),t.writeVarintField(3,r.type),t.writeMessage(4,T,r);}function _(e,t){var r=e.feature,i=e.keys,o=e.values,n=e.keycache,s=e.valuecache;for(var a in r.properties){var l=n[a];void 0===l&&(i.push(a),n[a]=l=i.length-1),t.writeVarint(l);var u=r.properties[a],h=typeof u;"string"!==h&&"boolean"!==h&&"number"!==h&&(u=JSON.stringify(u));var c=h+":"+u,p=s[c];void 0===p&&(o.push(u),s[c]=p=o.length-1),t.writeVarint(p);}}function k(e,t){return (t<<3)+(7&e)}function P(e){return e<<1^e>>31}function T(e,t){for(var r=e.loadGeometry(),i=e.type,o=0,n=0,s=r.length,a=0;a<s;a++){var l=r[a],u=1;1===i&&(u=l.length),t.writeVarint(k(1,u));for(var h=3===i?l.length-1:l.length,c=0;c<h;c++){1===c&&1!==i&&t.writeVarint(k(2,h-1));var p=l[c].x-o,f=l[c].y-n;t.writeVarint(P(p)),t.writeVarint(P(f)),o+=p,n+=f;}3===i&&t.writeVarint(k(7,1));}}function C(e,t){var r=typeof e;"string"===r?t.writeStringField(1,e):"boolean"===r?t.writeBooleanField(7,e):"number"===r&&(e%1!=0?t.writeDoubleField(3,e):e<0?t.writeSVarintField(6,e):t.writeVarintField(5,e));}function D(e,t,r,i){L(e,r,i),L(t,2*r,2*i),L(t,2*r+1,2*i+1);}function L(e,t,r){var i=e[t];e[t]=e[r],e[r]=i;}function z(e,t,r,i){var o=e-r,n=t-i;return o*o+n*n}w.fromVectorTileJs=I,w.fromGeojsonVt=function(e,t){t=t||{};var r={};for(var i in e)r[i]=new m(e[i].features,t),r[i].name=i,r[i].version=t.version,r[i].extent=t.extent;return I({layers:r})},w.GeoJSONWrapper=S;var O=function(e){return e[0]},E=function(e){return e[1]},F=function(e,t,r,i,o){void 0===t&&(t=O),void 0===r&&(r=E),void 0===i&&(i=64),void 0===o&&(o=Float64Array),this.nodeSize=i,this.points=e;for(var n=e.length<65536?Uint16Array:Uint32Array,s=this.ids=new n(e.length),a=this.coords=new o(2*e.length),l=0;l<e.length;l++)s[l]=l,a[2*l]=t(e[l]),a[2*l+1]=r(e[l]);!function e(t,r,i,o,n,s){if(!(n-o<=i)){var a=o+n>>1;!function e(t,r,i,o,n,s){for(;n>o;){if(n-o>600){var a=n-o+1,l=i-o+1,u=Math.log(a),h=.5*Math.exp(2*u/3),c=.5*Math.sqrt(u*h*(a-h)/a)*(l-a/2<0?-1:1);e(t,r,i,Math.max(o,Math.floor(i-l*h/a+c)),Math.min(n,Math.floor(i+(a-l)*h/a+c)),s);}var p=r[2*i+s],f=o,d=n;for(D(t,r,o,i),r[2*n+s]>p&&D(t,r,o,n);f<d;){for(D(t,r,f,d),f++,d--;r[2*f+s]<p;)f++;for(;r[2*d+s]>p;)d--;}r[2*o+s]===p?D(t,r,o,d):D(t,r,++d,n),d<=i&&(o=d+1),i<=d&&(n=d-1);}}(t,r,a,o,n,s%2),e(t,r,i,o,a-1,s+1),e(t,r,i,a+1,n,s+1);}}(s,a,i,0,s.length-1,0);};F.prototype.range=function(e,t,r,i){return function(e,t,r,i,o,n,s){for(var a,l,u=[0,e.length-1,0],h=[];u.length;){var c=u.pop(),p=u.pop(),f=u.pop();if(p-f<=s)for(var d=f;d<=p;d++)l=t[2*d+1],(a=t[2*d])>=r&&a<=o&&l>=i&&l<=n&&h.push(e[d]);else {var g=Math.floor((f+p)/2);l=t[2*g+1],(a=t[2*g])>=r&&a<=o&&l>=i&&l<=n&&h.push(e[g]);var v=(c+1)%2;(0===c?r<=a:i<=l)&&(u.push(f),u.push(g-1),u.push(v)),(0===c?o>=a:n>=l)&&(u.push(g+1),u.push(p),u.push(v));}}return h}(this.ids,this.coords,e,t,r,i,this.nodeSize)},F.prototype.within=function(e,t,r){return function(e,t,r,i,o,n){for(var s=[0,e.length-1,0],a=[],l=o*o;s.length;){var u=s.pop(),h=s.pop(),c=s.pop();if(h-c<=n)for(var p=c;p<=h;p++)z(t[2*p],t[2*p+1],r,i)<=l&&a.push(e[p]);else {var f=Math.floor((c+h)/2),d=t[2*f],g=t[2*f+1];z(d,g,r,i)<=l&&a.push(e[f]);var v=(u+1)%2;(0===u?r-o<=d:i-o<=g)&&(s.push(c),s.push(f-1),s.push(v)),(0===u?r+o>=d:i+o>=g)&&(s.push(f+1),s.push(h),s.push(v));}}return a}(this.ids,this.coords,e,t,r,this.nodeSize)};var N={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:function(e){return e}},J=function(e){this.options=V(Object.create(N),e),this.trees=new Array(this.options.maxZoom+1);};function Z(e,t,r,i,o){return {x:e,y:t,zoom:1/0,id:r,parentId:-1,numPoints:i,properties:o}}function A(e,t){var r=e.geometry.coordinates,i=r[1];return {x:Y(r[0]),y:j(i),zoom:1/0,index:t,parentId:-1}}function B(e){return {type:"Feature",id:e.id,properties:G(e),geometry:{type:"Point",coordinates:[(i=e.x,360*(i-.5)),(t=e.y,r=(180-360*t)*Math.PI/180,360*Math.atan(Math.exp(r))/Math.PI-90)]}};var t,r,i;}function G(e){var t=e.numPoints,r=t>=1e4?Math.round(t/1e3)+"k":t>=1e3?Math.round(t/100)/10+"k":t;return V(V({},e.properties),{cluster:!0,cluster_id:e.id,point_count:t,point_count_abbreviated:r})}function Y(e){return e/360+.5}function j(e){var t=Math.sin(e*Math.PI/180),r=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return r<0?0:r>1?1:r}function V(e,t){for(var r in t)e[r]=t[r];return e}function X(e){return e.x}function W(e){return e.y}function R(e,t,r,i,o,n){var s=o-r,a=n-i;if(0!==s||0!==a){var l=((e-r)*s+(t-i)*a)/(s*s+a*a);l>1?(r=o,i=n):l>0&&(r+=s*l,i+=a*l);}return (s=e-r)*s+(a=t-i)*a}function q(e,t,r,i){var o={id:void 0===e?null:e,type:t,geometry:r,tags:i,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};return function(e){var t=e.geometry,r=e.type;if("Point"===r||"MultiPoint"===r||"LineString"===r)U(e,t);else if("Polygon"===r||"MultiLineString"===r)for(var i=0;i<t.length;i++)U(e,t[i]);else if("MultiPolygon"===r)for(i=0;i<t.length;i++)for(var o=0;o<t[i].length;o++)U(e,t[i][o]);}(o),o}function U(e,t){for(var r=0;r<t.length;r+=3)e.minX=Math.min(e.minX,t[r]),e.minY=Math.min(e.minY,t[r+1]),e.maxX=Math.max(e.maxX,t[r]),e.maxY=Math.max(e.maxY,t[r+1]);}function $(e,t,r,i){if(t.geometry){var o=t.geometry.coordinates,n=t.geometry.type,s=Math.pow(r.tolerance/((1<<r.maxZoom)*r.extent),2),a=[],l=t.id;if(r.promoteId?l=t.properties[r.promoteId]:r.generateId&&(l=i||0),"Point"===n)H(o,a);else if("MultiPoint"===n)for(var u=0;u<o.length;u++)H(o[u],a);else if("LineString"===n)K(o,a,s,!1);else if("MultiLineString"===n){if(r.lineMetrics){for(u=0;u<o.length;u++)K(o[u],a=[],s,!1),e.push(q(l,"LineString",a,t.properties));return}Q(o,a,s,!1);}else if("Polygon"===n)Q(o,a,s,!0);else {if("MultiPolygon"!==n){if("GeometryCollection"===n){for(u=0;u<t.geometry.geometries.length;u++)$(e,{id:l,geometry:t.geometry.geometries[u],properties:t.properties},r,i);return}throw new Error("Input data is not a valid GeoJSON object.")}for(u=0;u<o.length;u++){var h=[];Q(o[u],h,s,!0),a.push(h);}}e.push(q(l,n,a,t.properties));}}function H(e,t){t.push(ee(e[0])),t.push(te(e[1])),t.push(0);}function K(e,t,r,i){for(var o,n,s=0,a=0;a<e.length;a++){var l=ee(e[a][0]),u=te(e[a][1]);t.push(l),t.push(u),t.push(0),a>0&&(s+=i?(o*u-l*n)/2:Math.sqrt(Math.pow(l-o,2)+Math.pow(u-n,2))),o=l,n=u;}var h=t.length-3;t[2]=1,function e(t,r,i,o){for(var n,s=o,a=i-r>>1,l=i-r,u=t[r],h=t[r+1],c=t[i],p=t[i+1],f=r+3;f<i;f+=3){var d=R(t[f],t[f+1],u,h,c,p);if(d>s)n=f,s=d;else if(d===s){var g=Math.abs(f-a);g<l&&(n=f,l=g);}}s>o&&(n-r>3&&e(t,r,n,o),t[n+2]=s,i-n>3&&e(t,n,i,o));}(t,0,h,r),t[h+2]=1,t.size=Math.abs(s),t.start=0,t.end=t.size;}function Q(e,t,r,i){for(var o=0;o<e.length;o++){var n=[];K(e[o],n,r,i),t.push(n);}}function ee(e){return e/360+.5}function te(e){var t=Math.sin(e*Math.PI/180),r=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return r<0?0:r>1?1:r}function re(e,t,r,i,o,n,s,a){if(i/=t,n>=(r/=t)&&s<i)return e;if(s<r||n>=i)return null;for(var l=[],u=0;u<e.length;u++){var h=e[u],c=h.geometry,p=h.type,f=0===o?h.minX:h.minY,d=0===o?h.maxX:h.maxY;if(f>=r&&d<i)l.push(h);else if(!(d<r||f>=i)){var g=[];if("Point"===p||"MultiPoint"===p)ie(c,g,r,i,o);else if("LineString"===p)oe(c,g,r,i,o,!1,a.lineMetrics);else if("MultiLineString"===p)se(c,g,r,i,o,!1);else if("Polygon"===p)se(c,g,r,i,o,!0);else if("MultiPolygon"===p)for(var v=0;v<c.length;v++){var m=[];se(c[v],m,r,i,o,!0),m.length&&g.push(m);}if(g.length){if(a.lineMetrics&&"LineString"===p){for(v=0;v<g.length;v++)l.push(q(h.id,p,g[v],h.tags));continue}"LineString"!==p&&"MultiLineString"!==p||(1===g.length?(p="LineString",g=g[0]):p="MultiLineString"),"Point"!==p&&"MultiPoint"!==p||(p=3===g.length?"Point":"MultiPoint"),l.push(q(h.id,p,g,h.tags));}}}return l.length?l:null}function ie(e,t,r,i,o){for(var n=0;n<e.length;n+=3){var s=e[n+o];s>=r&&s<=i&&(t.push(e[n]),t.push(e[n+1]),t.push(e[n+2]));}}function oe(e,t,r,i,o,n,s){for(var a,l,u=ne(e),h=0===o?le:ue,c=e.start,p=0;p<e.length-3;p+=3){var f=e[p],d=e[p+1],g=e[p+2],v=e[p+3],m=e[p+4],y=0===o?f:d,x=0===o?v:m,w=!1;s&&(a=Math.sqrt(Math.pow(f-v,2)+Math.pow(d-m,2))),y<r?x>r&&(l=h(u,f,d,v,m,r),s&&(u.start=c+a*l)):y>i?x<i&&(l=h(u,f,d,v,m,i),s&&(u.start=c+a*l)):ae(u,f,d,g),x<r&&y>=r&&(l=h(u,f,d,v,m,r),w=!0),x>i&&y<=i&&(l=h(u,f,d,v,m,i),w=!0),!n&&w&&(s&&(u.end=c+a*l),t.push(u),u=ne(e)),s&&(c+=a);}var S=e.length-3;f=e[S],d=e[S+1],g=e[S+2],(y=0===o?f:d)>=r&&y<=i&&ae(u,f,d,g),S=u.length-3,n&&S>=3&&(u[S]!==u[0]||u[S+1]!==u[1])&&ae(u,u[0],u[1],u[2]),u.length&&t.push(u);}function ne(e){var t=[];return t.size=e.size,t.start=e.start,t.end=e.end,t}function se(e,t,r,i,o,n){for(var s=0;s<e.length;s++)oe(e[s],t,r,i,o,n,!1);}function ae(e,t,r,i){e.push(t),e.push(r),e.push(i);}function le(e,t,r,i,o,n){var s=(n-t)/(i-t);return e.push(n),e.push(r+(o-r)*s),e.push(1),s}function ue(e,t,r,i,o,n){var s=(n-r)/(o-r);return e.push(t+(i-t)*s),e.push(n),e.push(1),s}function he(e,t){for(var r=[],i=0;i<e.length;i++){var o,n=e[i],s=n.type;if("Point"===s||"MultiPoint"===s||"LineString"===s)o=ce(n.geometry,t);else if("MultiLineString"===s||"Polygon"===s){o=[];for(var a=0;a<n.geometry.length;a++)o.push(ce(n.geometry[a],t));}else if("MultiPolygon"===s)for(o=[],a=0;a<n.geometry.length;a++){for(var l=[],u=0;u<n.geometry[a].length;u++)l.push(ce(n.geometry[a][u],t));o.push(l);}r.push(q(n.id,s,o,n.tags));}return r}function ce(e,t){var r=[];r.size=e.size,void 0!==e.start&&(r.start=e.start,r.end=e.end);for(var i=0;i<e.length;i+=3)r.push(e[i]+t,e[i+1],e[i+2]);return r}function pe(e,t){if(e.transformed)return e;var r,i,o,n=1<<e.z,s=e.x,a=e.y;for(r=0;r<e.features.length;r++){var l=e.features[r],u=l.geometry,h=l.type;if(l.geometry=[],1===h)for(i=0;i<u.length;i+=2)l.geometry.push(fe(u[i],u[i+1],t,n,s,a));else for(i=0;i<u.length;i++){var c=[];for(o=0;o<u[i].length;o+=2)c.push(fe(u[i][o],u[i][o+1],t,n,s,a));l.geometry.push(c);}}return e.transformed=!0,e}function fe(e,t,r,i,o,n){return [Math.round(r*(e*i-o)),Math.round(r*(t*i-n))]}function de(e,t,r,i,o){for(var n=t===o.maxZoom?0:o.tolerance/((1<<t)*o.extent),s={features:[],numPoints:0,numSimplified:0,numFeatures:0,source:null,x:r,y:i,z:t,transformed:!1,minX:2,minY:1,maxX:-1,maxY:0},a=0;a<e.length;a++){s.numFeatures++,ge(s,e[a],n,o);var l=e[a].minX,u=e[a].minY,h=e[a].maxX,c=e[a].maxY;l<s.minX&&(s.minX=l),u<s.minY&&(s.minY=u),h>s.maxX&&(s.maxX=h),c>s.maxY&&(s.maxY=c);}return s}function ge(e,t,r,i){var o=t.geometry,n=t.type,s=[];if("Point"===n||"MultiPoint"===n)for(var a=0;a<o.length;a+=3)s.push(o[a]),s.push(o[a+1]),e.numPoints++,e.numSimplified++;else if("LineString"===n)ve(s,o,e,r,!1,!1);else if("MultiLineString"===n||"Polygon"===n)for(a=0;a<o.length;a++)ve(s,o[a],e,r,"Polygon"===n,0===a);else if("MultiPolygon"===n)for(var l=0;l<o.length;l++){var u=o[l];for(a=0;a<u.length;a++)ve(s,u[a],e,r,!0,0===a);}if(s.length){var h=t.tags||null;if("LineString"===n&&i.lineMetrics){for(var c in h={},t.tags)h[c]=t.tags[c];h.mapbox_clip_start=o.start/o.size,h.mapbox_clip_end=o.end/o.size;}var p={geometry:s,type:"Polygon"===n||"MultiPolygon"===n?3:"LineString"===n||"MultiLineString"===n?2:1,tags:h};null!==t.id&&(p.id=t.id),e.features.push(p);}}function ve(e,t,r,i,o,n){var s=i*i;if(i>0&&t.size<(o?s:i))r.numPoints+=t.length/3;else {for(var a=[],l=0;l<t.length;l+=3)(0===i||t[l+2]>s)&&(r.numSimplified++,a.push(t[l]),a.push(t[l+1])),r.numPoints++;o&&function(e,t){for(var r=0,i=0,o=e.length,n=o-2;i<o;n=i,i+=2)r+=(e[i]-e[n])*(e[i+1]+e[n+1]);if(r>0===t)for(i=0,o=e.length;i<o/2;i+=2){var s=e[i],a=e[i+1];e[i]=e[o-2-i],e[i+1]=e[o-1-i],e[o-2-i]=s,e[o-1-i]=a;}}(a,n),e.push(a);}}function me(e,t){var r=(t=this.options=function(e,t){for(var r in t)e[r]=t[r];return e}(Object.create(this.options),t)).debug;if(r&&console.time("preprocess data"),t.maxZoom<0||t.maxZoom>24)throw new Error("maxZoom should be in the 0-24 range");if(t.promoteId&&t.generateId)throw new Error("promoteId and generateId cannot be used together.");var i=function(e,t){var r=[];if("FeatureCollection"===e.type)for(var i=0;i<e.features.length;i++)$(r,e.features[i],t,i);else $(r,"Feature"===e.type?e:{geometry:e},t);return r}(e,t);this.tiles={},this.tileCoords=[],r&&(console.timeEnd("preprocess data"),console.log("index: maxZoom: %d, maxPoints: %d",t.indexMaxZoom,t.indexMaxPoints),console.time("generate tiles"),this.stats={},this.total=0),(i=function(e,t){var r=t.buffer/t.extent,i=e,o=re(e,1,-1-r,r,0,-1,2,t),n=re(e,1,1-r,2+r,0,-1,2,t);return (o||n)&&(i=re(e,1,-r,1+r,0,-1,2,t)||[],o&&(i=he(o,1).concat(i)),n&&(i=i.concat(he(n,-1)))),i}(i,t)).length&&this.splitTile(i,0,0,0),r&&(i.length&&console.log("features: %d, points: %d",this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),console.log("tiles generated:",this.total,JSON.stringify(this.stats)));}function ye(e,t,r){return 32*((1<<e)*r+t)+e}function xe(e,t){var r=e.tileID.canonical;if(!this._geoJSONIndex)return t(null,null);var i=this._geoJSONIndex.getTile(r.z,r.x,r.y);if(!i)return t(null,null);var o=new g(i.features),n=w(o);0===n.byteOffset&&n.byteLength===n.buffer.byteLength||(n=new Uint8Array(n)),t(null,{vectorTile:o,rawData:n.buffer});}J.prototype.load=function(e){var t=this.options,r=t.log,i=t.minZoom,o=t.maxZoom,n=t.nodeSize;r&&console.time("total time");var s="prepare "+e.length+" points";r&&console.time(s),this.points=e;for(var a=[],l=0;l<e.length;l++)e[l].geometry&&a.push(A(e[l],l));this.trees[o+1]=new F(a,X,W,n,Float32Array),r&&console.timeEnd(s);for(var u=o;u>=i;u--){var h=+Date.now();a=this._cluster(a,u),this.trees[u]=new F(a,X,W,n,Float32Array),r&&console.log("z%d: %d clusters in %dms",u,a.length,+Date.now()-h);}return r&&console.timeEnd("total time"),this},J.prototype.getClusters=function(e,t){var r=((e[0]+180)%360+360)%360-180,i=Math.max(-90,Math.min(90,e[1])),o=180===e[2]?180:((e[2]+180)%360+360)%360-180,n=Math.max(-90,Math.min(90,e[3]));if(e[2]-e[0]>=360)r=-180,o=180;else if(r>o){var s=this.getClusters([r,i,180,n],t),a=this.getClusters([-180,i,o,n],t);return s.concat(a)}for(var l=this.trees[this._limitZoom(t)],u=[],h=0,c=l.range(Y(r),j(n),Y(o),j(i));h<c.length;h+=1){var p=l.points[c[h]];u.push(p.numPoints?B(p):this.points[p.index]);}return u},J.prototype.getChildren=function(e){var t=this._getOriginId(e),r=this._getOriginZoom(e),i="No cluster with the specified id.",o=this.trees[r];if(!o)throw new Error(i);var n=o.points[t];if(!n)throw new Error(i);for(var s=this.options.radius/(this.options.extent*Math.pow(2,r-1)),a=[],l=0,u=o.within(n.x,n.y,s);l<u.length;l+=1){var h=o.points[u[l]];h.parentId===e&&a.push(h.numPoints?B(h):this.points[h.index]);}if(0===a.length)throw new Error(i);return a},J.prototype.getLeaves=function(e,t,r){var i=[];return this._appendLeaves(i,e,t=t||10,r=r||0,0),i},J.prototype.getTile=function(e,t,r){var i=this.trees[this._limitZoom(e)],o=Math.pow(2,e),n=this.options,s=n.radius/n.extent,a=(r-s)/o,l=(r+1+s)/o,u={features:[]};return this._addTileFeatures(i.range((t-s)/o,a,(t+1+s)/o,l),i.points,t,r,o,u),0===t&&this._addTileFeatures(i.range(1-s/o,a,1,l),i.points,o,r,o,u),t===o-1&&this._addTileFeatures(i.range(0,a,s/o,l),i.points,-1,r,o,u),u.features.length?u:null},J.prototype.getClusterExpansionZoom=function(e){for(var t=this._getOriginZoom(e)-1;t<=this.options.maxZoom;){var r=this.getChildren(e);if(t++,1!==r.length)break;e=r[0].properties.cluster_id;}return t},J.prototype._appendLeaves=function(e,t,r,i,o){for(var n=0,s=this.getChildren(t);n<s.length;n+=1){var a=s[n],l=a.properties;if(l&&l.cluster?o+l.point_count<=i?o+=l.point_count:o=this._appendLeaves(e,l.cluster_id,r,i,o):o<i?o++:e.push(a),e.length===r)break}return o},J.prototype._addTileFeatures=function(e,t,r,i,o,n){for(var s=0,a=e;s<a.length;s+=1){var l=t[a[s]],u=l.numPoints,h={type:1,geometry:[[Math.round(this.options.extent*(l.x*o-r)),Math.round(this.options.extent*(l.y*o-i))]],tags:u?G(l):this.points[l.index].properties},c=void 0;u?c=l.id:this.options.generateId?c=l.index:this.points[l.index].id&&(c=this.points[l.index].id),void 0!==c&&(h.id=c),n.features.push(h);}},J.prototype._limitZoom=function(e){return Math.max(this.options.minZoom,Math.min(+e,this.options.maxZoom+1))},J.prototype._cluster=function(e,t){for(var r=[],i=this.options,o=i.reduce,n=i.minPoints,s=i.radius/(i.extent*Math.pow(2,t)),a=0;a<e.length;a++){var l=e[a];if(!(l.zoom<=t)){l.zoom=t;for(var u=this.trees[t+1],h=u.within(l.x,l.y,s),c=l.numPoints||1,p=c,f=0,d=h;f<d.length;f+=1){var g=u.points[d[f]];g.zoom>t&&(p+=g.numPoints||1);}if(p>=n){for(var v=l.x*c,m=l.y*c,y=o&&c>1?this._map(l,!0):null,x=(a<<5)+(t+1)+this.points.length,w=0,S=h;w<S.length;w+=1){var I=u.points[S[w]];if(!(I.zoom<=t)){I.zoom=t;var M=I.numPoints||1;v+=I.x*M,m+=I.y*M,I.parentId=x,o&&(y||(y=this._map(l,!0)),o(y,this._map(I)));}}l.parentId=x,r.push(Z(v/p,m/p,x,p,y));}else if(r.push(l),p>1)for(var b=0,_=h;b<_.length;b+=1){var k=u.points[_[b]];k.zoom<=t||(k.zoom=t,r.push(k));}}}return r},J.prototype._getOriginId=function(e){return e-this.points.length>>5},J.prototype._getOriginZoom=function(e){return (e-this.points.length)%32},J.prototype._map=function(e,t){if(e.numPoints)return t?V({},e.properties):e.properties;var r=this.points[e.index].properties,i=this.options.map(r);return t&&i===r?V({},i):i},me.prototype.options={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,tolerance:3,extent:4096,buffer:64,lineMetrics:!1,promoteId:null,generateId:!1,debug:0},me.prototype.splitTile=function(e,t,r,i,o,n,s){for(var a=[e,t,r,i],l=this.options,u=l.debug;a.length;){i=a.pop(),r=a.pop(),t=a.pop(),e=a.pop();var h=1<<t,c=ye(t,r,i),p=this.tiles[c];if(!p&&(u>1&&console.time("creation"),p=this.tiles[c]=de(e,t,r,i,l),this.tileCoords.push({z:t,x:r,y:i}),u)){u>1&&(console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",t,r,i,p.numFeatures,p.numPoints,p.numSimplified),console.timeEnd("creation"));var f="z"+t;this.stats[f]=(this.stats[f]||0)+1,this.total++;}if(p.source=e,o){if(t===l.maxZoom||t===o)continue;var d=1<<o-t;if(r!==Math.floor(n/d)||i!==Math.floor(s/d))continue}else if(t===l.indexMaxZoom||p.numPoints<=l.indexMaxPoints)continue;if(p.source=null,0!==e.length){u>1&&console.time("clipping");var g,v,m,y,x,w,S=.5*l.buffer/l.extent,I=.5-S,M=.5+S,b=1+S;g=v=m=y=null,x=re(e,h,r-S,r+M,0,p.minX,p.maxX,l),w=re(e,h,r+I,r+b,0,p.minX,p.maxX,l),e=null,x&&(g=re(x,h,i-S,i+M,1,p.minY,p.maxY,l),v=re(x,h,i+I,i+b,1,p.minY,p.maxY,l),x=null),w&&(m=re(w,h,i-S,i+M,1,p.minY,p.maxY,l),y=re(w,h,i+I,i+b,1,p.minY,p.maxY,l),w=null),u>1&&console.timeEnd("clipping"),a.push(g||[],t+1,2*r,2*i),a.push(v||[],t+1,2*r,2*i+1),a.push(m||[],t+1,2*r+1,2*i),a.push(y||[],t+1,2*r+1,2*i+1);}}},me.prototype.getTile=function(e,t,r){var i=this.options,o=i.extent,n=i.debug;if(e<0||e>24)return null;var s=1<<e,a=ye(e,t=(t%s+s)%s,r);if(this.tiles[a])return pe(this.tiles[a],o);n>1&&console.log("drilling down to z%d-%d-%d",e,t,r);for(var l,u=e,h=t,c=r;!l&&u>0;)u--,h=Math.floor(h/2),c=Math.floor(c/2),l=this.tiles[ye(u,h,c)];return l&&l.source?(n>1&&console.log("found parent tile z%d-%d-%d",u,h,c),n>1&&console.time("drilling down"),this.splitTile(l.source,u,h,c,e,t,r),n>1&&console.timeEnd("drilling down"),this.tiles[a]?pe(this.tiles[a],o):null):null};var we=function(t){function r(e,r,i,o){t.call(this,e,r,i,xe),o&&(this.loadGeoJSON=o);}return t&&(r.__proto__=t),(r.prototype=Object.create(t&&t.prototype)).constructor=r,r.prototype.loadData=function(e,t){this._pendingCallback&&this._pendingCallback(null,{abandoned:!0}),this._pendingCallback=t,this._pendingLoadDataParams=e,this._state&&"Idle"!==this._state?this._state="NeedsLoadData":(this._state="Coalescing",this._loadData());},r.prototype._loadData=function(){var t=this;if(this._pendingCallback&&this._pendingLoadDataParams){var r=this._pendingCallback,i=this._pendingLoadDataParams;delete this._pendingCallback,delete this._pendingLoadDataParams;var o=!!(i&&i.request&&i.request.collectResourceTiming)&&new e.RequestPerformance(i.request);this.loadGeoJSON(i,(function(n,s){if(n||!s)return r(n);if("object"!=typeof s)return r(new Error("Input data given to '"+i.source+"' is not a valid GeoJSON object."));!function e(t,r){var i,o=t&&t.type;if("FeatureCollection"===o)for(i=0;i<t.features.length;i++)e(t.features[i],r);else if("GeometryCollection"===o)for(i=0;i<t.geometries.length;i++)e(t.geometries[i],r);else if("Feature"===o)e(t.geometry,r);else if("Polygon"===o)c(t.coordinates,r);else if("MultiPolygon"===o)for(i=0;i<t.coordinates.length;i++)c(t.coordinates[i],r);return t}(s,!0);try{if(i.filter){var a=e.createExpression(i.filter,{type:"boolean","property-type":"data-driven",overridable:!1,transition:!1});if("error"===a.result)throw new Error(a.value.map((function(e){return e.key+": "+e.message})).join(", "));var l=s.features.filter((function(e){return a.value.evaluate({zoom:0},e)}));s={type:"FeatureCollection",features:l};}t._geoJSONIndex=i.cluster?new J(function(t){var r=t.superclusterOptions,i=t.clusterProperties;if(!i||!r)return r;for(var o={},n={},s={accumulated:null,zoom:0},a={properties:null},l=Object.keys(i),u=0,h=l;u<h.length;u+=1){var c=h[u],p=i[c],f=p[0],d=e.createExpression(p[1]),g=e.createExpression("string"==typeof f?[f,["accumulated"],["get",c]]:f);o[c]=d.value,n[c]=g.value;}return r.map=function(e){a.properties=e;for(var t={},r=0,i=l;r<i.length;r+=1){var n=i[r];t[n]=o[n].evaluate(s,a);}return t},r.reduce=function(e,t){a.properties=t;for(var r=0,i=l;r<i.length;r+=1){var o=i[r];s.accumulated=e[o],e[o]=n[o].evaluate(s,a);}},r}(i)).load(s.features):function(e,t){return new me(e,t)}(s,i.geojsonVtOptions);}catch(n){return r(n)}t.loaded={};var u={};if(o){var h=o.finish();h&&(u.resourceTiming={},u.resourceTiming[i.source]=JSON.parse(JSON.stringify(h)));}r(null,u);}));}},r.prototype.coalesce=function(){"Coalescing"===this._state?this._state="Idle":"NeedsLoadData"===this._state&&(this._state="Coalescing",this._loadData());},r.prototype.reloadTile=function(e,r){var i=this.loaded;return i&&i[e.uid]?t.prototype.reloadTile.call(this,e,r):this.loadTile(e,r)},r.prototype.loadGeoJSON=function(t,r){if(t.request)e.getJSON(t.request,r);else {if("string"!=typeof t.data)return r(new Error("Input data given to '"+t.source+"' is not a valid GeoJSON object."));try{return r(null,JSON.parse(t.data))}catch(e){return r(new Error("Input data given to '"+t.source+"' is not a valid GeoJSON object."))}}},r.prototype.removeSource=function(e,t){this._pendingCallback&&this._pendingCallback(null,{abandoned:!0}),t();},r.prototype.getClusterExpansionZoom=function(e,t){try{t(null,this._geoJSONIndex.getClusterExpansionZoom(e.clusterId));}catch(e){t(e);}},r.prototype.getClusterChildren=function(e,t){try{t(null,this._geoJSONIndex.getChildren(e.clusterId));}catch(e){t(e);}},r.prototype.getClusterLeaves=function(e,t){try{t(null,this._geoJSONIndex.getLeaves(e.clusterId,e.limit,e.offset));}catch(e){t(e);}},r}(l),Se=function(t){var r=this;this.self=t,this.actor=new e.Actor(t,this),this.layerIndexes={},this.availableImages={},this.workerSourceTypes={vector:l,geojson:we},this.workerSources={},this.demWorkerSources={},this.self.registerWorkerSource=function(e,t){if(r.workerSourceTypes[e])throw new Error('Worker source with name "'+e+'" already registered.');r.workerSourceTypes[e]=t;},this.self.registerRTLTextPlugin=function(t){if(e.plugin.isParsed())throw new Error("RTL text plugin already registered.");e.plugin.applyArabicShaping=t.applyArabicShaping,e.plugin.processBidirectionalText=t.processBidirectionalText,e.plugin.processStyledBidirectionalText=t.processStyledBidirectionalText;};};return Se.prototype.setReferrer=function(e,t){this.referrer=t;},Se.prototype.setImages=function(e,t,r){for(var i in this.availableImages[e]=t,this.workerSources[e]){var o=this.workerSources[e][i];for(var n in o)o[n].availableImages=t;}r();},Se.prototype.setLayers=function(e,t,r){this.getLayerIndex(e).replace(t),r();},Se.prototype.updateLayers=function(e,t,r){this.getLayerIndex(e).update(t.layers,t.removedIds),r();},Se.prototype.loadTile=function(e,t,r){this.getWorkerSource(e,t.type,t.source).loadTile(t,r);},Se.prototype.loadDEMTile=function(e,t,r){this.getDEMWorkerSource(e,t.source).loadTile(t,r);},Se.prototype.reloadTile=function(e,t,r){this.getWorkerSource(e,t.type,t.source).reloadTile(t,r);},Se.prototype.abortTile=function(e,t,r){this.getWorkerSource(e,t.type,t.source).abortTile(t,r);},Se.prototype.removeTile=function(e,t,r){this.getWorkerSource(e,t.type,t.source).removeTile(t,r);},Se.prototype.removeDEMTile=function(e,t){this.getDEMWorkerSource(e,t.source).removeTile(t);},Se.prototype.removeSource=function(e,t,r){if(this.workerSources[e]&&this.workerSources[e][t.type]&&this.workerSources[e][t.type][t.source]){var i=this.workerSources[e][t.type][t.source];delete this.workerSources[e][t.type][t.source],void 0!==i.removeSource?i.removeSource(t,r):r();}},Se.prototype.loadWorkerSource=function(e,t,r){try{this.self.importScripts(t.url),r();}catch(e){r(e.toString());}},Se.prototype.syncRTLPluginState=function(t,r,i){try{e.plugin.setState(r);var o=e.plugin.getPluginURL();if(e.plugin.isLoaded()&&!e.plugin.isParsed()&&null!=o){this.self.importScripts(o);var n=e.plugin.isParsed();i(n?void 0:new Error("RTL Text Plugin failed to import scripts from "+o),n);}}catch(e){i(e.toString());}},Se.prototype.getAvailableImages=function(e){var t=this.availableImages[e];return t||(t=[]),t},Se.prototype.getLayerIndex=function(e){var t=this.layerIndexes[e];return t||(t=this.layerIndexes[e]=new i),t},Se.prototype.getWorkerSource=function(e,t,r){var i=this;return this.workerSources[e]||(this.workerSources[e]={}),this.workerSources[e][t]||(this.workerSources[e][t]={}),this.workerSources[e][t][r]||(this.workerSources[e][t][r]=new this.workerSourceTypes[t]({send:function(t,r,o){i.actor.send(t,r,o,e);}},this.getLayerIndex(e),this.getAvailableImages(e))),this.workerSources[e][t][r]},Se.prototype.getDEMWorkerSource=function(e,t){return this.demWorkerSources[e]||(this.demWorkerSources[e]={}),this.demWorkerSources[e][t]||(this.demWorkerSources[e][t]=new h),this.demWorkerSources[e][t]},Se.prototype.enforceCacheSizeLimit=function(t,r){e.enforceCacheSizeLimit(r);},"undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope&&(self.worker=new Se(self)),Se}));

  define(["./shared"],(function(t){var e=t.createCommonjsModule((function(t){function e(t){return !i(t)}function i(t){return "undefined"==typeof window||"undefined"==typeof document?"not a browser":Array.prototype&&Array.prototype.every&&Array.prototype.filter&&Array.prototype.forEach&&Array.prototype.indexOf&&Array.prototype.lastIndexOf&&Array.prototype.map&&Array.prototype.some&&Array.prototype.reduce&&Array.prototype.reduceRight&&Array.isArray?Function.prototype&&Function.prototype.bind?Object.keys&&Object.create&&Object.getPrototypeOf&&Object.getOwnPropertyNames&&Object.isSealed&&Object.isFrozen&&Object.isExtensible&&Object.getOwnPropertyDescriptor&&Object.defineProperty&&Object.defineProperties&&Object.seal&&Object.freeze&&Object.preventExtensions?"JSON"in window&&"parse"in JSON&&"stringify"in JSON?function(){if(!("Worker"in window&&"Blob"in window&&"URL"in window))return !1;var t,e,i=new Blob([""],{type:"text/javascript"}),o=URL.createObjectURL(i);try{e=new Worker(o),t=!0;}catch(e){t=!1;}return e&&e.terminate(),URL.revokeObjectURL(o),t}()?"Uint8ClampedArray"in window?ArrayBuffer.isView?function(){var t=document.createElement("canvas");t.width=t.height=1;var e=t.getContext("2d");if(!e)return !1;var i=e.getImageData(0,0,1,1);return i&&i.width===t.width}()?(void 0===o[i=t&&t.failIfMajorPerformanceCaveat]&&(o[i]=function(t){var i=function(t){var i=document.createElement("canvas"),o=Object.create(e.webGLContextAttributes);return o.failIfMajorPerformanceCaveat=t,i.probablySupportsContext?i.probablySupportsContext("webgl",o)||i.probablySupportsContext("experimental-webgl",o):i.supportsContext?i.supportsContext("webgl",o)||i.supportsContext("experimental-webgl",o):i.getContext("webgl",o)||i.getContext("experimental-webgl",o)}(t);if(!i)return !1;var o=i.createShader(i.VERTEX_SHADER);return !(!o||i.isContextLost())&&(i.shaderSource(o,"void main() {}"),i.compileShader(o),!0===i.getShaderParameter(o,i.COMPILE_STATUS))}(i)),o[i]?void 0:"insufficient WebGL support"):"insufficient Canvas/getImageData support":"insufficient ArrayBuffer support":"insufficient Uint8ClampedArray support":"insufficient worker support":"insufficient JSON support":"insufficient Object support":"insufficient Function support":"insufficent Array support";var i;}t.exports?t.exports=e:window&&(window.mapboxgl=window.mapboxgl||{},window.mapboxgl.supported=e,window.mapboxgl.notSupportedReason=i);var o={};e.webGLContextAttributes={antialias:!1,alpha:!0,stencil:!0,depth:!0};})),i={create:function(e,i,o){var r=t.window.document.createElement(e);return void 0!==i&&(r.className=i),o&&o.appendChild(r),r},createNS:function(e,i){return t.window.document.createElementNS(e,i)}},o=t.window.document&&t.window.document.documentElement.style;function r(t){if(!o)return t[0];for(var e=0;e<t.length;e++)if(t[e]in o)return t[e];return t[0]}var a,n=r(["userSelect","MozUserSelect","WebkitUserSelect","msUserSelect"]);i.disableDrag=function(){o&&n&&(a=o[n],o[n]="none");},i.enableDrag=function(){o&&n&&(o[n]=a);};var s=r(["transform","WebkitTransform"]);i.setTransform=function(t,e){t.style[s]=e;};var l=!1;try{var c=Object.defineProperty({},"passive",{get:function(){l=!0;}});t.window.addEventListener("test",c,c),t.window.removeEventListener("test",c,c);}catch(t){l=!1;}i.addEventListener=function(t,e,i,o){void 0===o&&(o={}),t.addEventListener(e,i,"passive"in o&&l?o:o.capture);},i.removeEventListener=function(t,e,i,o){void 0===o&&(o={}),t.removeEventListener(e,i,"passive"in o&&l?o:o.capture);};var u=function(e){e.preventDefault(),e.stopPropagation(),t.window.removeEventListener("click",u,!0);};function h(t){var e=t.userImage;return !!(e&&e.render&&e.render())&&(t.data.replace(new Uint8Array(e.data.buffer)),!0)}i.suppressClick=function(){t.window.addEventListener("click",u,!0),t.window.setTimeout((function(){t.window.removeEventListener("click",u,!0);}),0);},i.mousePos=function(e,i){var o=e.getBoundingClientRect();return new t.Point(i.clientX-o.left-e.clientLeft,i.clientY-o.top-e.clientTop)},i.touchPos=function(e,i){for(var o=e.getBoundingClientRect(),r=[],a=0;a<i.length;a++)r.push(new t.Point(i[a].clientX-o.left-e.clientLeft,i[a].clientY-o.top-e.clientTop));return r},i.mouseButton=function(e){return void 0!==t.window.InstallTrigger&&2===e.button&&e.ctrlKey&&t.window.navigator.platform.toUpperCase().indexOf("MAC")>=0?0:e.button},i.remove=function(t){t.parentNode&&t.parentNode.removeChild(t);};var p=function(e){function i(){e.call(this),this.images={},this.updatedImages={},this.callbackDispatchedThisFrame={},this.loaded=!1,this.requestors=[],this.patterns={},this.atlasImage=new t.RGBAImage({width:1,height:1}),this.dirty=!0;}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.isLoaded=function(){return this.loaded},i.prototype.setLoaded=function(t){if(this.loaded!==t&&(this.loaded=t,t)){for(var e=0,i=this.requestors;e<i.length;e+=1){var o=i[e];this._notify(o.ids,o.callback);}this.requestors=[];}},i.prototype.getImage=function(t){return this.images[t]},i.prototype.addImage=function(t,e){this._validate(t,e)&&(this.images[t]=e);},i.prototype._validate=function(e,i){var o=!0;return this._validateStretch(i.stretchX,i.data&&i.data.width)||(this.fire(new t.ErrorEvent(new Error('Image "'+e+'" has invalid "stretchX" value'))),o=!1),this._validateStretch(i.stretchY,i.data&&i.data.height)||(this.fire(new t.ErrorEvent(new Error('Image "'+e+'" has invalid "stretchY" value'))),o=!1),this._validateContent(i.content,i)||(this.fire(new t.ErrorEvent(new Error('Image "'+e+'" has invalid "content" value'))),o=!1),o},i.prototype._validateStretch=function(t,e){if(!t)return !0;for(var i=0,o=0,r=t;o<r.length;o+=1){var a=r[o];if(a[0]<i||a[1]<a[0]||e<a[1])return !1;i=a[1];}return !0},i.prototype._validateContent=function(t,e){return !(t&&(4!==t.length||t[0]<0||e.data.width<t[0]||t[1]<0||e.data.height<t[1]||t[2]<0||e.data.width<t[2]||t[3]<0||e.data.height<t[3]||t[2]<t[0]||t[3]<t[1]))},i.prototype.updateImage=function(t,e){e.version=this.images[t].version+1,this.images[t]=e,this.updatedImages[t]=!0;},i.prototype.removeImage=function(t){var e=this.images[t];delete this.images[t],delete this.patterns[t],e.userImage&&e.userImage.onRemove&&e.userImage.onRemove();},i.prototype.listImages=function(){return Object.keys(this.images)},i.prototype.getImages=function(t,e){var i=!0;if(!this.isLoaded())for(var o=0,r=t;o<r.length;o+=1)this.images[r[o]]||(i=!1);this.isLoaded()||i?this._notify(t,e):this.requestors.push({ids:t,callback:e});},i.prototype._notify=function(e,i){for(var o={},r=0,a=e;r<a.length;r+=1){var n=a[r];this.images[n]||this.fire(new t.Event("styleimagemissing",{id:n}));var s=this.images[n];s?o[n]={data:s.data.clone(),pixelRatio:s.pixelRatio,sdf:s.sdf,version:s.version,stretchX:s.stretchX,stretchY:s.stretchY,content:s.content,hasRenderCallback:Boolean(s.userImage&&s.userImage.render)}:t.warnOnce('Image "'+n+'" could not be loaded. Please make sure you have added the image with map.addImage() or a "sprite" property in your style. You can provide missing images by listening for the "styleimagemissing" map event.');}i(null,o);},i.prototype.getPixelSize=function(){var t=this.atlasImage;return {width:t.width,height:t.height}},i.prototype.getPattern=function(e){var i=this.patterns[e],o=this.getImage(e);if(!o)return null;if(i&&i.position.version===o.version)return i.position;if(i)i.position.version=o.version;else {var r={w:o.data.width+2,h:o.data.height+2,x:0,y:0},a=new t.ImagePosition(r,o);this.patterns[e]={bin:r,position:a};}return this._updatePatternAtlas(),this.patterns[e].position},i.prototype.bind=function(e){var i=e.gl;this.atlasTexture?this.dirty&&(this.atlasTexture.update(this.atlasImage),this.dirty=!1):this.atlasTexture=new t.Texture(e,this.atlasImage,i.RGBA),this.atlasTexture.bind(i.LINEAR,i.CLAMP_TO_EDGE);},i.prototype._updatePatternAtlas=function(){var e=[];for(var i in this.patterns)e.push(this.patterns[i].bin);var o=t.potpack(e),r=o.w,a=o.h,n=this.atlasImage;for(var s in n.resize({width:r||1,height:a||1}),this.patterns){var l=this.patterns[s].bin,c=l.x+1,u=l.y+1,h=this.images[s].data,p=h.width,d=h.height;t.RGBAImage.copy(h,n,{x:0,y:0},{x:c,y:u},{width:p,height:d}),t.RGBAImage.copy(h,n,{x:0,y:d-1},{x:c,y:u-1},{width:p,height:1}),t.RGBAImage.copy(h,n,{x:0,y:0},{x:c,y:u+d},{width:p,height:1}),t.RGBAImage.copy(h,n,{x:p-1,y:0},{x:c-1,y:u},{width:1,height:d}),t.RGBAImage.copy(h,n,{x:0,y:0},{x:c+p,y:u},{width:1,height:d});}this.dirty=!0;},i.prototype.beginFrame=function(){this.callbackDispatchedThisFrame={};},i.prototype.dispatchRenderCallbacks=function(t){for(var e=0,i=t;e<i.length;e+=1){var o=i[e];if(!this.callbackDispatchedThisFrame[o]){this.callbackDispatchedThisFrame[o]=!0;var r=this.images[o];h(r)&&this.updateImage(o,r);}}},i}(t.Evented),d=m,_=m,f=1e20;function m(t,e,i,o,r,a){this.fontSize=t||24,this.buffer=void 0===e?3:e,this.cutoff=o||.25,this.fontFamily=r||"sans-serif",this.fontWeight=a||"normal",this.radius=i||8;var n=this.size=this.fontSize+2*this.buffer;this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=n,this.ctx=this.canvas.getContext("2d"),this.ctx.font=this.fontWeight+" "+this.fontSize+"px "+this.fontFamily,this.ctx.textBaseline="middle",this.ctx.fillStyle="black",this.gridOuter=new Float64Array(n*n),this.gridInner=new Float64Array(n*n),this.f=new Float64Array(n),this.d=new Float64Array(n),this.z=new Float64Array(n+1),this.v=new Int16Array(n),this.middle=Math.round(n/2*(navigator.userAgent.indexOf("Gecko/")>=0?1.2:1));}function g(t,e,i,o,r,a,n){for(var s=0;s<e;s++){for(var l=0;l<i;l++)o[l]=t[l*e+s];for(v(o,r,a,n,i),l=0;l<i;l++)t[l*e+s]=r[l];}for(l=0;l<i;l++){for(s=0;s<e;s++)o[s]=t[l*e+s];for(v(o,r,a,n,e),s=0;s<e;s++)t[l*e+s]=Math.sqrt(r[s]);}}function v(t,e,i,o,r){i[0]=0,o[0]=-f,o[1]=+f;for(var a=1,n=0;a<r;a++){for(var s=(t[a]+a*a-(t[i[n]]+i[n]*i[n]))/(2*a-2*i[n]);s<=o[n];)n--,s=(t[a]+a*a-(t[i[n]]+i[n]*i[n]))/(2*a-2*i[n]);i[++n]=a,o[n]=s,o[n+1]=+f;}for(a=0,n=0;a<r;a++){for(;o[n+1]<a;)n++;e[a]=(a-i[n])*(a-i[n])+t[i[n]];}}m.prototype.draw=function(t){this.ctx.clearRect(0,0,this.size,this.size),this.ctx.fillText(t,this.buffer,this.middle);for(var e=this.ctx.getImageData(0,0,this.size,this.size),i=new Uint8ClampedArray(this.size*this.size),o=0;o<this.size*this.size;o++){var r=e.data[4*o+3]/255;this.gridOuter[o]=1===r?0:0===r?f:Math.pow(Math.max(0,.5-r),2),this.gridInner[o]=1===r?f:0===r?0:Math.pow(Math.max(0,r-.5),2);}for(g(this.gridOuter,this.size,this.size,this.f,this.d,this.v,this.z),g(this.gridInner,this.size,this.size,this.f,this.d,this.v,this.z),o=0;o<this.size*this.size;o++)i[o]=Math.max(0,Math.min(255,Math.round(255-255*((this.gridOuter[o]-this.gridInner[o])/this.radius+this.cutoff))));return i},d.default=_;var y=function(t,e){this.requestManager=t,this.localIdeographFontFamily=e,this.entries={};};y.prototype.setURL=function(t){this.url=t;},y.prototype.getGlyphs=function(e,i){var o=this,r=[];for(var a in e)for(var n=0,s=e[a];n<s.length;n+=1)r.push({stack:a,id:s[n]});t.asyncAll(r,(function(t,e){var i=t.stack,r=t.id,a=o.entries[i];a||(a=o.entries[i]={glyphs:{},requests:{},ranges:{}});var n=a.glyphs[r];if(void 0===n){if(n=o._tinySDF(a,i,r))return a.glyphs[r]=n,void e(null,{stack:i,id:r,glyph:n});var s=Math.floor(r/256);if(256*s>65535)e(new Error("glyphs > 65535 not supported"));else if(a.ranges[s])e(null,{stack:i,id:r,glyph:n});else {var l=a.requests[s];l||(l=a.requests[s]=[],y.loadGlyphRange(i,s,o.url,o.requestManager,(function(t,e){if(e){for(var i in e)o._doesCharSupportLocalGlyph(+i)||(a.glyphs[+i]=e[+i]);a.ranges[s]=!0;}for(var r=0,n=l;r<n.length;r+=1)(0, n[r])(t,e);delete a.requests[s];}))),l.push((function(t,o){t?e(t):o&&e(null,{stack:i,id:r,glyph:o[r]||null});}));}}else e(null,{stack:i,id:r,glyph:n});}),(function(t,e){if(t)i(t);else if(e){for(var o={},r=0,a=e;r<a.length;r+=1){var n=a[r],s=n.stack,l=n.id,c=n.glyph;(o[s]||(o[s]={}))[l]=c&&{id:c.id,bitmap:c.bitmap.clone(),metrics:c.metrics};}i(null,o);}}));},y.prototype._doesCharSupportLocalGlyph=function(e){return !!this.localIdeographFontFamily&&(t.isChar["CJK Unified Ideographs"](e)||t.isChar["Hangul Syllables"](e)||t.isChar.Hiragana(e)||t.isChar.Katakana(e))},y.prototype._tinySDF=function(e,i,o){var r=this.localIdeographFontFamily;if(r&&this._doesCharSupportLocalGlyph(o)){var a=e.tinySDF;if(!a){var n="400";/bold/i.test(i)?n="900":/medium/i.test(i)?n="500":/light/i.test(i)&&(n="200"),a=e.tinySDF=new y.TinySDF(24,3,8,.25,r,n);}return {id:o,bitmap:new t.AlphaImage({width:30,height:30},a.draw(String.fromCharCode(o))),metrics:{width:24,height:24,left:0,top:-8,advance:24}}}},y.loadGlyphRange=function(e,i,o,r,a){var n=256*i,s=n+255,l=r.transformRequest(r.normalizeGlyphsURL(o).replace("{fontstack}",e).replace("{range}",n+"-"+s),t.ResourceType.Glyphs);t.getArrayBuffer(l,(function(e,i){if(e)a(e);else if(i){for(var o={},r=0,n=t.parseGlyphPBF(i);r<n.length;r+=1){var s=n[r];o[s.id]=s;}a(null,o);}}));},y.TinySDF=d;var x=function(){this.specification=t.styleSpec.light.position;};x.prototype.possiblyEvaluate=function(e,i){return t.sphericalToCartesian(e.expression.evaluate(i))},x.prototype.interpolate=function(e,i,o){return {x:t.number(e.x,i.x,o),y:t.number(e.y,i.y,o),z:t.number(e.z,i.z,o)}};var b=new t.Properties({anchor:new t.DataConstantProperty(t.styleSpec.light.anchor),position:new x,color:new t.DataConstantProperty(t.styleSpec.light.color),intensity:new t.DataConstantProperty(t.styleSpec.light.intensity)}),w=function(e){function i(i){e.call(this),this._transitionable=new t.Transitionable(b),this.setLight(i),this._transitioning=this._transitionable.untransitioned();}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.getLight=function(){return this._transitionable.serialize()},i.prototype.setLight=function(e,i){if(void 0===i&&(i={}),!this._validate(t.validateLight,e,i))for(var o in e){var r=e[o];t.endsWith(o,"-transition")?this._transitionable.setTransition(o.slice(0,-"-transition".length),r):this._transitionable.setValue(o,r);}},i.prototype.updateTransitions=function(t){this._transitioning=this._transitionable.transitioned(t,this._transitioning);},i.prototype.hasTransition=function(){return this._transitioning.hasTransition()},i.prototype.recalculate=function(t){this.properties=this._transitioning.possiblyEvaluate(t);},i.prototype._validate=function(e,i,o){return (!o||!1!==o.validate)&&t.emitValidationErrors(this,e.call(t.validateStyle,t.extend({value:i,style:{glyphs:!0,sprite:!0},styleSpec:t.styleSpec})))},i}(t.Evented),T=function(t,e){this.width=t,this.height=e,this.nextRow=0,this.data=new Uint8Array(this.width*this.height),this.dashEntry={};};T.prototype.getDash=function(t,e){var i=t.join(",")+String(e);return this.dashEntry[i]||(this.dashEntry[i]=this.addDash(t,e)),this.dashEntry[i]},T.prototype.getDashRanges=function(t,e,i){var o=[],r=t.length%2==1?-t[t.length-1]*i:0,a=t[0]*i,n=!0;o.push({left:r,right:a,isDash:n,zeroLength:0===t[0]});for(var s=t[0],l=1;l<t.length;l++){var c=t[l];o.push({left:r=s*i,right:a=(s+=c)*i,isDash:n=!n,zeroLength:0===c});}return o},T.prototype.addRoundDash=function(t,e,i){for(var o=e/2,r=-i;r<=i;r++)for(var a=this.width*(this.nextRow+i+r),n=0,s=t[n],l=0;l<this.width;l++){l/s.right>1&&(s=t[++n]);var c=Math.abs(l-s.left),u=Math.abs(l-s.right),h=Math.min(c,u),p=void 0,d=r/i*(o+1);if(s.isDash){var _=o-Math.abs(d);p=Math.sqrt(h*h+_*_);}else p=o-Math.sqrt(h*h+d*d);this.data[a+l]=Math.max(0,Math.min(255,p+128));}},T.prototype.addRegularDash=function(t){for(var e=t.length-1;e>=0;--e){var i=t[e],o=t[e+1];i.zeroLength?t.splice(e,1):o&&o.isDash===i.isDash&&(o.left=i.left,t.splice(e,1));}var r=t[0],a=t[t.length-1];r.isDash===a.isDash&&(r.left=a.left-this.width,a.right=r.right+this.width);for(var n=this.width*this.nextRow,s=0,l=t[s],c=0;c<this.width;c++){c/l.right>1&&(l=t[++s]);var u=Math.abs(c-l.left),h=Math.abs(c-l.right),p=Math.min(u,h);this.data[n+c]=Math.max(0,Math.min(255,(l.isDash?p:-p)+128));}},T.prototype.addDash=function(e,i){var o=i?7:0,r=2*o+1;if(this.nextRow+r>this.height)return t.warnOnce("LineAtlas out of space"),null;for(var a=0,n=0;n<e.length;n++)a+=e[n];if(0!==a){var s=this.width/a,l=this.getDashRanges(e,this.width,s);i?this.addRoundDash(l,s,o):this.addRegularDash(l);}var c={y:(this.nextRow+o+.5)/this.height,height:2*o/this.height,width:a};return this.nextRow+=r,this.dirty=!0,c},T.prototype.bind=function(t){var e=t.gl;this.texture?(e.bindTexture(e.TEXTURE_2D,this.texture),this.dirty&&(this.dirty=!1,e.texSubImage2D(e.TEXTURE_2D,0,0,0,this.width,this.height,e.ALPHA,e.UNSIGNED_BYTE,this.data))):(this.texture=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.texture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texImage2D(e.TEXTURE_2D,0,e.ALPHA,this.width,this.height,0,e.ALPHA,e.UNSIGNED_BYTE,this.data));};var E=function e(i,o){this.workerPool=i,this.actors=[],this.currentActor=0,this.id=t.uniqueId();for(var r=this.workerPool.acquire(this.id),a=0;a<r.length;a++){var n=new e.Actor(r[a],o,this.id);n.name="Worker "+a,this.actors.push(n);}};function I(e,i,o){var r=function(r,a){if(r)return o(r);if(a){var n=t.pick(t.extend(a,e),["tiles","minzoom","maxzoom","attribution","mapbox_logo","bounds","scheme","tileSize","encoding"]);a.vector_layers&&(n.vectorLayers=a.vector_layers,n.vectorLayerIds=n.vectorLayers.map((function(t){return t.id}))),n.tiles=i.canonicalizeTileset(n,e.url),o(null,n);}};return e.url?t.getJSON(i.transformRequest(i.normalizeSourceURL(e.url),t.ResourceType.Source),r):t.browser.frame((function(){return r(null,e)}))}E.prototype.broadcast=function(e,i,o){t.asyncAll(this.actors,(function(t,o){t.send(e,i,o);}),o=o||function(){});},E.prototype.getActor=function(){return this.currentActor=(this.currentActor+1)%this.actors.length,this.actors[this.currentActor]},E.prototype.remove=function(){this.actors.forEach((function(t){t.remove();})),this.actors=[],this.workerPool.release(this.id);},E.Actor=t.Actor;var P=function(e,i,o){this.bounds=t.LngLatBounds.convert(this.validateBounds(e)),this.minzoom=i||0,this.maxzoom=o||24;};P.prototype.validateBounds=function(t){return Array.isArray(t)&&4===t.length?[Math.max(-180,t[0]),Math.max(-90,t[1]),Math.min(180,t[2]),Math.min(90,t[3])]:[-180,-90,180,90]},P.prototype.contains=function(e){var i=Math.pow(2,e.z),o=Math.floor(t.mercatorXfromLng(this.bounds.getWest())*i),r=Math.floor(t.mercatorYfromLat(this.bounds.getNorth())*i),a=Math.ceil(t.mercatorXfromLng(this.bounds.getEast())*i),n=Math.ceil(t.mercatorYfromLat(this.bounds.getSouth())*i);return e.x>=o&&e.x<a&&e.y>=r&&e.y<n};var S=function(e){function i(i,o,r,a){if(e.call(this),this.id=i,this.dispatcher=r,this.type="vector",this.minzoom=0,this.maxzoom=22,this.scheme="xyz",this.tileSize=512,this.reparseOverscaled=!0,this.isTileClipped=!0,this._loaded=!1,t.extend(this,t.pick(o,["url","scheme","tileSize","promoteId"])),this._options=t.extend({type:"vector"},o),this._collectResourceTiming=o.collectResourceTiming,512!==this.tileSize)throw new Error("vector tile sources must have a tileSize of 512");this.setEventedParent(a);}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.load=function(){var e=this;this._loaded=!1,this.fire(new t.Event("dataloading",{dataType:"source"})),this._tileJSONRequest=I(this._options,this.map._requestManager,(function(i,o){e._tileJSONRequest=null,e._loaded=!0,i?e.fire(new t.ErrorEvent(i)):o&&(t.extend(e,o),o.bounds&&(e.tileBounds=new P(o.bounds,e.minzoom,e.maxzoom)),t.postTurnstileEvent(o.tiles,e.map._requestManager._customAccessToken),t.postMapLoadEvent(o.tiles,e.map._getMapId(),e.map._requestManager._skuToken,e.map._requestManager._customAccessToken),e.fire(new t.Event("data",{dataType:"source",sourceDataType:"metadata"})),e.fire(new t.Event("data",{dataType:"source",sourceDataType:"content"})));}));},i.prototype.loaded=function(){return this._loaded},i.prototype.hasTile=function(t){return !this.tileBounds||this.tileBounds.contains(t.canonical)},i.prototype.onAdd=function(t){this.map=t,this.load();},i.prototype.setSourceProperty=function(t){this._tileJSONRequest&&this._tileJSONRequest.cancel(),t(),this.map.style.sourceCaches[this.id].clearTiles(),this.load();},i.prototype.setTiles=function(t){var e=this;return this.setSourceProperty((function(){e._options.tiles=t;})),this},i.prototype.setUrl=function(t){var e=this;return this.setSourceProperty((function(){e.url=t,e._options.url=t;})),this},i.prototype.onRemove=function(){this._tileJSONRequest&&(this._tileJSONRequest.cancel(),this._tileJSONRequest=null);},i.prototype.serialize=function(){return t.extend({},this._options)},i.prototype.loadTile=function(e,i){var o=this.map._requestManager.normalizeTileURL(e.tileID.canonical.url(this.tiles,this.scheme)),r={request:this.map._requestManager.transformRequest(o,t.ResourceType.Tile),uid:e.uid,tileID:e.tileID,zoom:e.tileID.overscaledZ,tileSize:this.tileSize*e.tileID.overscaleFactor(),type:this.type,source:this.id,pixelRatio:t.browser.devicePixelRatio,showCollisionBoxes:this.map.showCollisionBoxes,promoteId:this.promoteId};function a(o,r){return delete e.request,e.aborted?i(null):o&&404!==o.status?i(o):(r&&r.resourceTiming&&(e.resourceTiming=r.resourceTiming),this.map._refreshExpiredTiles&&r&&e.setExpiryData(r),e.loadVectorData(r,this.map.painter),t.cacheEntryPossiblyAdded(this.dispatcher),i(null),void(e.reloadCallback&&(this.loadTile(e,e.reloadCallback),e.reloadCallback=null)))}r.request.collectResourceTiming=this._collectResourceTiming,e.actor&&"expired"!==e.state?"loading"===e.state?e.reloadCallback=i:e.request=e.actor.send("reloadTile",r,a.bind(this)):(e.actor=this.dispatcher.getActor(),e.request=e.actor.send("loadTile",r,a.bind(this)));},i.prototype.abortTile=function(t){t.request&&(t.request.cancel(),delete t.request),t.actor&&t.actor.send("abortTile",{uid:t.uid,type:this.type,source:this.id},void 0);},i.prototype.unloadTile=function(t){t.unloadVectorData(),t.actor&&t.actor.send("removeTile",{uid:t.uid,type:this.type,source:this.id},void 0);},i.prototype.hasTransition=function(){return !1},i}(t.Evented),C=function(e){function i(i,o,r,a){e.call(this),this.id=i,this.dispatcher=r,this.setEventedParent(a),this.type="raster",this.minzoom=0,this.maxzoom=22,this.roundZoom=!0,this.scheme="xyz",this.tileSize=512,this._loaded=!1,this._options=t.extend({type:"raster"},o),t.extend(this,t.pick(o,["url","scheme","tileSize"]));}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.load=function(){var e=this;this._loaded=!1,this.fire(new t.Event("dataloading",{dataType:"source"})),this._tileJSONRequest=I(this._options,this.map._requestManager,(function(i,o){e._tileJSONRequest=null,e._loaded=!0,i?e.fire(new t.ErrorEvent(i)):o&&(t.extend(e,o),o.bounds&&(e.tileBounds=new P(o.bounds,e.minzoom,e.maxzoom)),t.postTurnstileEvent(o.tiles),t.postMapLoadEvent(o.tiles,e.map._getMapId(),e.map._requestManager._skuToken),e.fire(new t.Event("data",{dataType:"source",sourceDataType:"metadata"})),e.fire(new t.Event("data",{dataType:"source",sourceDataType:"content"})));}));},i.prototype.loaded=function(){return this._loaded},i.prototype.onAdd=function(t){this.map=t,this.load();},i.prototype.onRemove=function(){this._tileJSONRequest&&(this._tileJSONRequest.cancel(),this._tileJSONRequest=null);},i.prototype.serialize=function(){return t.extend({},this._options)},i.prototype.hasTile=function(t){return !this.tileBounds||this.tileBounds.contains(t.canonical)},i.prototype.loadTile=function(e,i){var o=this,r=this.map._requestManager.normalizeTileURL(e.tileID.canonical.url(this.tiles,this.scheme),this.tileSize);e.request=t.getImage(this.map._requestManager.transformRequest(r,t.ResourceType.Tile),(function(r,a){if(delete e.request,e.aborted)e.state="unloaded",i(null);else if(r)e.state="errored",i(r);else if(a){o.map._refreshExpiredTiles&&e.setExpiryData(a),delete a.cacheControl,delete a.expires;var n=o.map.painter.context,s=n.gl;e.texture=o.map.painter.getTileTexture(a.width),e.texture?e.texture.update(a,{useMipmap:!0}):(e.texture=new t.Texture(n,a,s.RGBA,{useMipmap:!0}),e.texture.bind(s.LINEAR,s.CLAMP_TO_EDGE,s.LINEAR_MIPMAP_NEAREST),n.extTextureFilterAnisotropic&&s.texParameterf(s.TEXTURE_2D,n.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,n.extTextureFilterAnisotropicMax)),e.state="loaded",t.cacheEntryPossiblyAdded(o.dispatcher),i(null);}}));},i.prototype.abortTile=function(t,e){t.request&&(t.request.cancel(),delete t.request),e();},i.prototype.unloadTile=function(t,e){t.texture&&this.map.painter.saveTileTexture(t.texture),e();},i.prototype.hasTransition=function(){return !1},i}(t.Evented),z=function(e){function i(i,o,r,a){e.call(this,i,o,r,a),this.type="raster-dem",this.maxzoom=22,this._options=t.extend({type:"raster-dem"},o),this.encoding=o.encoding||"mapbox";}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.serialize=function(){return {type:"raster-dem",url:this.url,tileSize:this.tileSize,tiles:this.tiles,bounds:this.bounds,encoding:this.encoding}},i.prototype.loadTile=function(e,i){var o=this.map._requestManager.normalizeTileURL(e.tileID.canonical.url(this.tiles,this.scheme),this.tileSize);function r(t,o){t&&(e.state="errored",i(t)),o&&(e.dem=o,e.needsHillshadePrepare=!0,e.state="loaded",i(null));}e.request=t.getImage(this.map._requestManager.transformRequest(o,t.ResourceType.Tile),function(o,a){if(delete e.request,e.aborted)e.state="unloaded",i(null);else if(o)e.state="errored",i(o);else if(a){this.map._refreshExpiredTiles&&e.setExpiryData(a),delete a.cacheControl,delete a.expires;var n=t.window.ImageBitmap&&a instanceof t.window.ImageBitmap&&t.offscreenCanvasSupported()?a:t.browser.getImageData(a,1),s={uid:e.uid,coord:e.tileID,source:this.id,rawImageData:n,encoding:this.encoding};e.actor&&"expired"!==e.state||(e.actor=this.dispatcher.getActor(),e.actor.send("loadDEMTile",s,r.bind(this)));}}.bind(this)),e.neighboringTiles=this._getNeighboringTiles(e.tileID);},i.prototype._getNeighboringTiles=function(e){var i=e.canonical,o=Math.pow(2,i.z),r=(i.x-1+o)%o,a=0===i.x?e.wrap-1:e.wrap,n=(i.x+1+o)%o,s=i.x+1===o?e.wrap+1:e.wrap,l={};return l[new t.OverscaledTileID(e.overscaledZ,a,i.z,r,i.y).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,s,i.z,n,i.y).key]={backfilled:!1},i.y>0&&(l[new t.OverscaledTileID(e.overscaledZ,a,i.z,r,i.y-1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,e.wrap,i.z,i.x,i.y-1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,s,i.z,n,i.y-1).key]={backfilled:!1}),i.y+1<o&&(l[new t.OverscaledTileID(e.overscaledZ,a,i.z,r,i.y+1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,e.wrap,i.z,i.x,i.y+1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,s,i.z,n,i.y+1).key]={backfilled:!1}),l},i.prototype.unloadTile=function(t){t.demTexture&&this.map.painter.saveTileTexture(t.demTexture),t.fbo&&(t.fbo.destroy(),delete t.fbo),t.dem&&delete t.dem,delete t.neighboringTiles,t.state="unloaded",t.actor&&t.actor.send("removeDEMTile",{uid:t.uid,source:this.id});},i}(C),D=function(e){function i(i,o,r,a){e.call(this),this.id=i,this.type="geojson",this.minzoom=0,this.maxzoom=18,this.tileSize=512,this.isTileClipped=!0,this.reparseOverscaled=!0,this._removed=!1,this._loaded=!1,this.actor=r.getActor(),this.setEventedParent(a),this._data=o.data,this._options=t.extend({},o),this._collectResourceTiming=o.collectResourceTiming,this._resourceTiming=[],void 0!==o.maxzoom&&(this.maxzoom=o.maxzoom),o.type&&(this.type=o.type),o.attribution&&(this.attribution=o.attribution),this.promoteId=o.promoteId;var n=t.EXTENT/this.tileSize;this.workerOptions=t.extend({source:this.id,cluster:o.cluster||!1,geojsonVtOptions:{buffer:(void 0!==o.buffer?o.buffer:128)*n,tolerance:(void 0!==o.tolerance?o.tolerance:.375)*n,extent:t.EXTENT,maxZoom:this.maxzoom,lineMetrics:o.lineMetrics||!1,generateId:o.generateId||!1},superclusterOptions:{maxZoom:void 0!==o.clusterMaxZoom?Math.min(o.clusterMaxZoom,this.maxzoom-1):this.maxzoom-1,minPoints:Math.max(2,o.clusterMinPoints||2),extent:t.EXTENT,radius:(o.clusterRadius||50)*n,log:!1,generateId:o.generateId||!1},clusterProperties:o.clusterProperties,filter:o.filter},o.workerOptions);}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.load=function(){var e=this;this.fire(new t.Event("dataloading",{dataType:"source"})),this._updateWorkerData((function(i){if(i)e.fire(new t.ErrorEvent(i));else {var o={dataType:"source",sourceDataType:"metadata"};e._collectResourceTiming&&e._resourceTiming&&e._resourceTiming.length>0&&(o.resourceTiming=e._resourceTiming,e._resourceTiming=[]),e.fire(new t.Event("data",o));}}));},i.prototype.onAdd=function(t){this.map=t,this.load();},i.prototype.setData=function(e){var i=this;return this._data=e,this.fire(new t.Event("dataloading",{dataType:"source"})),this._updateWorkerData((function(e){if(e)i.fire(new t.ErrorEvent(e));else {var o={dataType:"source",sourceDataType:"content"};i._collectResourceTiming&&i._resourceTiming&&i._resourceTiming.length>0&&(o.resourceTiming=i._resourceTiming,i._resourceTiming=[]),i.fire(new t.Event("data",o));}})),this},i.prototype.getClusterExpansionZoom=function(t,e){return this.actor.send("geojson.getClusterExpansionZoom",{clusterId:t,source:this.id},e),this},i.prototype.getClusterChildren=function(t,e){return this.actor.send("geojson.getClusterChildren",{clusterId:t,source:this.id},e),this},i.prototype.getClusterLeaves=function(t,e,i,o){return this.actor.send("geojson.getClusterLeaves",{source:this.id,clusterId:t,limit:e,offset:i},o),this},i.prototype._updateWorkerData=function(e){var i=this;this._loaded=!1;var o=t.extend({},this.workerOptions),r=this._data;"string"==typeof r?(o.request=this.map._requestManager.transformRequest(t.browser.resolveURL(r),t.ResourceType.Source),o.request.collectResourceTiming=this._collectResourceTiming):o.data=JSON.stringify(r),this.actor.send(this.type+".loadData",o,(function(t,r){i._removed||r&&r.abandoned||(i._loaded=!0,r&&r.resourceTiming&&r.resourceTiming[i.id]&&(i._resourceTiming=r.resourceTiming[i.id].slice(0)),i.actor.send(i.type+".coalesce",{source:o.source},null),e(t));}));},i.prototype.loaded=function(){return this._loaded},i.prototype.loadTile=function(e,i){var o=this,r=e.actor?"reloadTile":"loadTile";e.actor=this.actor,e.request=this.actor.send(r,{type:this.type,uid:e.uid,tileID:e.tileID,zoom:e.tileID.overscaledZ,maxZoom:this.maxzoom,tileSize:this.tileSize,source:this.id,pixelRatio:t.browser.devicePixelRatio,showCollisionBoxes:this.map.showCollisionBoxes,promoteId:this.promoteId},(function(t,a){return delete e.request,e.unloadVectorData(),e.aborted?i(null):t?i(t):(e.loadVectorData(a,o.map.painter,"reloadTile"===r),i(null))}));},i.prototype.abortTile=function(t){t.request&&(t.request.cancel(),delete t.request),t.aborted=!0;},i.prototype.unloadTile=function(t){t.unloadVectorData(),this.actor.send("removeTile",{uid:t.uid,type:this.type,source:this.id});},i.prototype.onRemove=function(){this._removed=!0,this.actor.send("removeSource",{type:this.type,source:this.id});},i.prototype.serialize=function(){return t.extend({},this._options,{type:this.type,data:this._data})},i.prototype.hasTransition=function(){return !1},i}(t.Evented),M=t.createLayout([{name:"a_pos",type:"Int16",components:2},{name:"a_texture_pos",type:"Int16",components:2}]),L=function(e){function i(t,i,o,r){e.call(this),this.id=t,this.dispatcher=o,this.coordinates=i.coordinates,this.type="image",this.minzoom=0,this.maxzoom=22,this.tileSize=512,this.tiles={},this._loaded=!1,this.setEventedParent(r),this.options=i;}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.load=function(e,i){var o=this;this._loaded=!1,this.fire(new t.Event("dataloading",{dataType:"source"})),this.url=this.options.url,t.getImage(this.map._requestManager.transformRequest(this.url,t.ResourceType.Image),(function(r,a){o._loaded=!0,r?o.fire(new t.ErrorEvent(r)):a&&(o.image=a,e&&(o.coordinates=e),i&&i(),o._finishLoading());}));},i.prototype.loaded=function(){return this._loaded},i.prototype.updateImage=function(t){var e=this;return this.image&&t.url?(this.options.url=t.url,this.load(t.coordinates,(function(){e.texture=null;})),this):this},i.prototype._finishLoading=function(){this.map&&(this.setCoordinates(this.coordinates),this.fire(new t.Event("data",{dataType:"source",sourceDataType:"metadata"})));},i.prototype.onAdd=function(t){this.map=t,this.load();},i.prototype.setCoordinates=function(e){var i=this;this.coordinates=e;var o=e.map(t.MercatorCoordinate.fromLngLat);this.tileID=function(e){for(var i=1/0,o=1/0,r=-1/0,a=-1/0,n=0,s=e;n<s.length;n+=1){var l=s[n];i=Math.min(i,l.x),o=Math.min(o,l.y),r=Math.max(r,l.x),a=Math.max(a,l.y);}var c=Math.max(r-i,a-o),u=Math.max(0,Math.floor(-Math.log(c)/Math.LN2)),h=Math.pow(2,u);return new t.CanonicalTileID(u,Math.floor((i+r)/2*h),Math.floor((o+a)/2*h))}(o),this.minzoom=this.maxzoom=this.tileID.z;var r=o.map((function(t){return i.tileID.getTilePoint(t)._round()}));return this._boundsArray=new t.StructArrayLayout4i8,this._boundsArray.emplaceBack(r[0].x,r[0].y,0,0),this._boundsArray.emplaceBack(r[1].x,r[1].y,t.EXTENT,0),this._boundsArray.emplaceBack(r[3].x,r[3].y,0,t.EXTENT),this._boundsArray.emplaceBack(r[2].x,r[2].y,t.EXTENT,t.EXTENT),this.boundsBuffer&&(this.boundsBuffer.destroy(),delete this.boundsBuffer),this.fire(new t.Event("data",{dataType:"source",sourceDataType:"content"})),this},i.prototype.prepare=function(){if(0!==Object.keys(this.tiles).length&&this.image){var e=this.map.painter.context,i=e.gl;for(var o in this.boundsBuffer||(this.boundsBuffer=e.createVertexBuffer(this._boundsArray,M.members)),this.boundsSegments||(this.boundsSegments=t.SegmentVector.simpleSegment(0,0,4,2)),this.texture||(this.texture=new t.Texture(e,this.image,i.RGBA),this.texture.bind(i.LINEAR,i.CLAMP_TO_EDGE)),this.tiles){var r=this.tiles[o];"loaded"!==r.state&&(r.state="loaded",r.texture=this.texture);}}},i.prototype.loadTile=function(t,e){this.tileID&&this.tileID.equals(t.tileID.canonical)?(this.tiles[String(t.tileID.wrap)]=t,t.buckets={},e(null)):(t.state="errored",e(null));},i.prototype.serialize=function(){return {type:"image",url:this.options.url,coordinates:this.coordinates}},i.prototype.hasTransition=function(){return !1},i}(t.Evented),A=function(e){function i(t,i,o,r){e.call(this,t,i,o,r),this.roundZoom=!0,this.type="video",this.options=i;}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.load=function(){var e=this;this._loaded=!1;var i=this.options;this.urls=[];for(var o=0,r=i.urls;o<r.length;o+=1)this.urls.push(this.map._requestManager.transformRequest(r[o],t.ResourceType.Source).url);t.getVideo(this.urls,(function(i,o){e._loaded=!0,i?e.fire(new t.ErrorEvent(i)):o&&(e.video=o,e.video.loop=!0,e.video.addEventListener("playing",(function(){e.map.triggerRepaint();})),e.map&&e.video.play(),e._finishLoading());}));},i.prototype.pause=function(){this.video&&this.video.pause();},i.prototype.play=function(){this.video&&this.video.play();},i.prototype.seek=function(e){if(this.video){var i=this.video.seekable;e<i.start(0)||e>i.end(0)?this.fire(new t.ErrorEvent(new t.ValidationError("sources."+this.id,null,"Playback for this video can be set only between the "+i.start(0)+" and "+i.end(0)+"-second mark."))):this.video.currentTime=e;}},i.prototype.getVideo=function(){return this.video},i.prototype.onAdd=function(t){this.map||(this.map=t,this.load(),this.video&&(this.video.play(),this.setCoordinates(this.coordinates)));},i.prototype.prepare=function(){if(!(0===Object.keys(this.tiles).length||this.video.readyState<2)){var e=this.map.painter.context,i=e.gl;for(var o in this.boundsBuffer||(this.boundsBuffer=e.createVertexBuffer(this._boundsArray,M.members)),this.boundsSegments||(this.boundsSegments=t.SegmentVector.simpleSegment(0,0,4,2)),this.texture?this.video.paused||(this.texture.bind(i.LINEAR,i.CLAMP_TO_EDGE),i.texSubImage2D(i.TEXTURE_2D,0,0,0,i.RGBA,i.UNSIGNED_BYTE,this.video)):(this.texture=new t.Texture(e,this.video,i.RGBA),this.texture.bind(i.LINEAR,i.CLAMP_TO_EDGE)),this.tiles){var r=this.tiles[o];"loaded"!==r.state&&(r.state="loaded",r.texture=this.texture);}}},i.prototype.serialize=function(){return {type:"video",urls:this.urls,coordinates:this.coordinates}},i.prototype.hasTransition=function(){return this.video&&!this.video.paused},i}(L),R=function(e){function i(i,o,r,a){e.call(this,i,o,r,a),o.coordinates?Array.isArray(o.coordinates)&&4===o.coordinates.length&&!o.coordinates.some((function(t){return !Array.isArray(t)||2!==t.length||t.some((function(t){return "number"!=typeof t}))}))||this.fire(new t.ErrorEvent(new t.ValidationError("sources."+i,null,'"coordinates" property must be an array of 4 longitude/latitude array pairs'))):this.fire(new t.ErrorEvent(new t.ValidationError("sources."+i,null,'missing required property "coordinates"'))),o.animate&&"boolean"!=typeof o.animate&&this.fire(new t.ErrorEvent(new t.ValidationError("sources."+i,null,'optional "animate" property must be a boolean value'))),o.canvas?"string"==typeof o.canvas||o.canvas instanceof t.window.HTMLCanvasElement||this.fire(new t.ErrorEvent(new t.ValidationError("sources."+i,null,'"canvas" must be either a string representing the ID of the canvas element from which to read, or an HTMLCanvasElement instance'))):this.fire(new t.ErrorEvent(new t.ValidationError("sources."+i,null,'missing required property "canvas"'))),this.options=o,this.animate=void 0===o.animate||o.animate;}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.load=function(){this._loaded=!0,this.canvas||(this.canvas=this.options.canvas instanceof t.window.HTMLCanvasElement?this.options.canvas:t.window.document.getElementById(this.options.canvas)),this.width=this.canvas.width,this.height=this.canvas.height,this._hasInvalidDimensions()?this.fire(new t.ErrorEvent(new Error("Canvas dimensions cannot be less than or equal to zero."))):(this.play=function(){this._playing=!0,this.map.triggerRepaint();},this.pause=function(){this._playing&&(this.prepare(),this._playing=!1);},this._finishLoading());},i.prototype.getCanvas=function(){return this.canvas},i.prototype.onAdd=function(t){this.map=t,this.load(),this.canvas&&this.animate&&this.play();},i.prototype.onRemove=function(){this.pause();},i.prototype.prepare=function(){var e=!1;if(this.canvas.width!==this.width&&(this.width=this.canvas.width,e=!0),this.canvas.height!==this.height&&(this.height=this.canvas.height,e=!0),!this._hasInvalidDimensions()&&0!==Object.keys(this.tiles).length){var i=this.map.painter.context,o=i.gl;for(var r in this.boundsBuffer||(this.boundsBuffer=i.createVertexBuffer(this._boundsArray,M.members)),this.boundsSegments||(this.boundsSegments=t.SegmentVector.simpleSegment(0,0,4,2)),this.texture?(e||this._playing)&&this.texture.update(this.canvas,{premultiply:!0}):this.texture=new t.Texture(i,this.canvas,o.RGBA,{premultiply:!0}),this.tiles){var a=this.tiles[r];"loaded"!==a.state&&(a.state="loaded",a.texture=this.texture);}}},i.prototype.serialize=function(){return {type:"canvas",coordinates:this.coordinates}},i.prototype.hasTransition=function(){return this._playing},i.prototype._hasInvalidDimensions=function(){for(var t=0,e=[this.canvas.width,this.canvas.height];t<e.length;t+=1){var i=e[t];if(isNaN(i)||i<=0)return !0}return !1},i}(L),k={vector:S,raster:C,"raster-dem":z,geojson:D,video:A,image:L,canvas:R};function B(e,i){var o=t.identity([]);return t.translate(o,o,[1,1,0]),t.scale(o,o,[.5*e.width,.5*e.height,1]),t.multiply(o,o,e.calculatePosMatrix(i.toUnwrapped()))}function O(t,e,i,o,r,a){var n=function(t,e,i){if(t)for(var o=0,r=t;o<r.length;o+=1){var a=e[r[o]];if(a&&a.source===i&&"fill-extrusion"===a.type)return !0}else for(var n in e){var s=e[n];if(s.source===i&&"fill-extrusion"===s.type)return !0}return !1}(r&&r.layers,e,t.id),s=a.maxPitchScaleFactor(),l=t.tilesIn(o,s,n);l.sort(F);for(var c=[],u=0,h=l;u<h.length;u+=1){var p=h[u];c.push({wrappedTileID:p.tileID.wrapped().key,queryResults:p.tile.queryRenderedFeatures(e,i,t._state,p.queryGeometry,p.cameraQueryGeometry,p.scale,r,a,s,B(t.transform,p.tileID))});}var d=function(t){for(var e={},i={},o=0,r=t;o<r.length;o+=1){var a=r[o],n=a.queryResults,s=a.wrappedTileID,l=i[s]=i[s]||{};for(var c in n)for(var u=n[c],h=l[c]=l[c]||{},p=e[c]=e[c]||[],d=0,_=u;d<_.length;d+=1){var f=_[d];h[f.featureIndex]||(h[f.featureIndex]=!0,p.push(f));}}return e}(c);for(var _ in d)d[_].forEach((function(e){var i=e.feature,o=t.getFeatureState(i.layer["source-layer"],i.id);i.source=i.layer.source,i.layer["source-layer"]&&(i.sourceLayer=i.layer["source-layer"]),i.state=o;}));return d}function F(t,e){var i=t.tileID,o=e.tileID;return i.overscaledZ-o.overscaledZ||i.canonical.y-o.canonical.y||i.wrap-o.wrap||i.canonical.x-o.canonical.x}var U=function(t,e){this.max=t,this.onRemove=e,this.reset();};U.prototype.reset=function(){for(var t in this.data)for(var e=0,i=this.data[t];e<i.length;e+=1){var o=i[e];o.timeout&&clearTimeout(o.timeout),this.onRemove(o.value);}return this.data={},this.order=[],this},U.prototype.add=function(t,e,i){var o=this,r=t.wrapped().key;void 0===this.data[r]&&(this.data[r]=[]);var a={value:e,timeout:void 0};if(void 0!==i&&(a.timeout=setTimeout((function(){o.remove(t,a);}),i)),this.data[r].push(a),this.order.push(r),this.order.length>this.max){var n=this._getAndRemoveByKey(this.order[0]);n&&this.onRemove(n);}return this},U.prototype.has=function(t){return t.wrapped().key in this.data},U.prototype.getAndRemove=function(t){return this.has(t)?this._getAndRemoveByKey(t.wrapped().key):null},U.prototype._getAndRemoveByKey=function(t){var e=this.data[t].shift();return e.timeout&&clearTimeout(e.timeout),0===this.data[t].length&&delete this.data[t],this.order.splice(this.order.indexOf(t),1),e.value},U.prototype.getByKey=function(t){var e=this.data[t];return e?e[0].value:null},U.prototype.get=function(t){return this.has(t)?this.data[t.wrapped().key][0].value:null},U.prototype.remove=function(t,e){if(!this.has(t))return this;var i=t.wrapped().key,o=void 0===e?0:this.data[i].indexOf(e),r=this.data[i][o];return this.data[i].splice(o,1),r.timeout&&clearTimeout(r.timeout),0===this.data[i].length&&delete this.data[i],this.onRemove(r.value),this.order.splice(this.order.indexOf(i),1),this},U.prototype.setMaxSize=function(t){for(this.max=t;this.order.length>this.max;){var e=this._getAndRemoveByKey(this.order[0]);e&&this.onRemove(e);}return this},U.prototype.filter=function(t){var e=[];for(var i in this.data)for(var o=0,r=this.data[i];o<r.length;o+=1){var a=r[o];t(a.value)||e.push(a);}for(var n=0,s=e;n<s.length;n+=1){var l=s[n];this.remove(l.value.tileID,l);}};var N=function(t,e,i){this.context=t;var o=t.gl;this.buffer=o.createBuffer(),this.dynamicDraw=Boolean(i),this.context.unbindVAO(),t.bindElementBuffer.set(this.buffer),o.bufferData(o.ELEMENT_ARRAY_BUFFER,e.arrayBuffer,this.dynamicDraw?o.DYNAMIC_DRAW:o.STATIC_DRAW),this.dynamicDraw||delete e.arrayBuffer;};N.prototype.bind=function(){this.context.bindElementBuffer.set(this.buffer);},N.prototype.updateData=function(t){var e=this.context.gl;this.context.unbindVAO(),this.bind(),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,0,t.arrayBuffer);},N.prototype.destroy=function(){this.buffer&&(this.context.gl.deleteBuffer(this.buffer),delete this.buffer);};var Z={Int8:"BYTE",Uint8:"UNSIGNED_BYTE",Int16:"SHORT",Uint16:"UNSIGNED_SHORT",Int32:"INT",Uint32:"UNSIGNED_INT",Float32:"FLOAT"},q=function(t,e,i,o){this.length=e.length,this.attributes=i,this.itemSize=e.bytesPerElement,this.dynamicDraw=o,this.context=t;var r=t.gl;this.buffer=r.createBuffer(),t.bindVertexBuffer.set(this.buffer),r.bufferData(r.ARRAY_BUFFER,e.arrayBuffer,this.dynamicDraw?r.DYNAMIC_DRAW:r.STATIC_DRAW),this.dynamicDraw||delete e.arrayBuffer;};q.prototype.bind=function(){this.context.bindVertexBuffer.set(this.buffer);},q.prototype.updateData=function(t){var e=this.context.gl;this.bind(),e.bufferSubData(e.ARRAY_BUFFER,0,t.arrayBuffer);},q.prototype.enableAttributes=function(t,e){for(var i=0;i<this.attributes.length;i++){var o=e.attributes[this.attributes[i].name];void 0!==o&&t.enableVertexAttribArray(o);}},q.prototype.setVertexAttribPointers=function(t,e,i){for(var o=0;o<this.attributes.length;o++){var r=this.attributes[o],a=e.attributes[r.name];void 0!==a&&t.vertexAttribPointer(a,r.components,t[Z[r.type]],!1,this.itemSize,r.offset+this.itemSize*(i||0));}},q.prototype.destroy=function(){this.buffer&&(this.context.gl.deleteBuffer(this.buffer),delete this.buffer);};var j=function(t){this.gl=t.gl,this.default=this.getDefault(),this.current=this.default,this.dirty=!1;};j.prototype.get=function(){return this.current},j.prototype.set=function(t){},j.prototype.getDefault=function(){return this.default},j.prototype.setDefault=function(){this.set(this.default);};var V=function(e){function i(){e.apply(this,arguments);}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.getDefault=function(){return t.Color.transparent},i.prototype.set=function(t){var e=this.current;(t.r!==e.r||t.g!==e.g||t.b!==e.b||t.a!==e.a||this.dirty)&&(this.gl.clearColor(t.r,t.g,t.b,t.a),this.current=t,this.dirty=!1);},i}(j),G=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return 1},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.clearDepth(t),this.current=t,this.dirty=!1);},e}(j),W=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return 0},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.clearStencil(t),this.current=t,this.dirty=!1);},e}(j),X=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return [!0,!0,!0,!0]},e.prototype.set=function(t){var e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||this.dirty)&&(this.gl.colorMask(t[0],t[1],t[2],t[3]),this.current=t,this.dirty=!1);},e}(j),H=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return !0},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.depthMask(t),this.current=t,this.dirty=!1);},e}(j),K=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return 255},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.stencilMask(t),this.current=t,this.dirty=!1);},e}(j),Y=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return {func:this.gl.ALWAYS,ref:0,mask:255}},e.prototype.set=function(t){var e=this.current;(t.func!==e.func||t.ref!==e.ref||t.mask!==e.mask||this.dirty)&&(this.gl.stencilFunc(t.func,t.ref,t.mask),this.current=t,this.dirty=!1);},e}(j),J=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){var t=this.gl;return [t.KEEP,t.KEEP,t.KEEP]},e.prototype.set=function(t){var e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||this.dirty)&&(this.gl.stencilOp(t[0],t[1],t[2]),this.current=t,this.dirty=!1);},e}(j),Q=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;t?e.enable(e.STENCIL_TEST):e.disable(e.STENCIL_TEST),this.current=t,this.dirty=!1;}},e}(j),$=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return [0,1]},e.prototype.set=function(t){var e=this.current;(t[0]!==e[0]||t[1]!==e[1]||this.dirty)&&(this.gl.depthRange(t[0],t[1]),this.current=t,this.dirty=!1);},e}(j),tt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;t?e.enable(e.DEPTH_TEST):e.disable(e.DEPTH_TEST),this.current=t,this.dirty=!1;}},e}(j),et=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return this.gl.LESS},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.depthFunc(t),this.current=t,this.dirty=!1);},e}(j),it=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;t?e.enable(e.BLEND):e.disable(e.BLEND),this.current=t,this.dirty=!1;}},e}(j),ot=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){var t=this.gl;return [t.ONE,t.ZERO]},e.prototype.set=function(t){var e=this.current;(t[0]!==e[0]||t[1]!==e[1]||this.dirty)&&(this.gl.blendFunc(t[0],t[1]),this.current=t,this.dirty=!1);},e}(j),rt=function(e){function i(){e.apply(this,arguments);}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.getDefault=function(){return t.Color.transparent},i.prototype.set=function(t){var e=this.current;(t.r!==e.r||t.g!==e.g||t.b!==e.b||t.a!==e.a||this.dirty)&&(this.gl.blendColor(t.r,t.g,t.b,t.a),this.current=t,this.dirty=!1);},i}(j),at=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return this.gl.FUNC_ADD},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.blendEquation(t),this.current=t,this.dirty=!1);},e}(j),nt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;t?e.enable(e.CULL_FACE):e.disable(e.CULL_FACE),this.current=t,this.dirty=!1;}},e}(j),st=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return this.gl.BACK},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.cullFace(t),this.current=t,this.dirty=!1);},e}(j),lt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return this.gl.CCW},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.frontFace(t),this.current=t,this.dirty=!1);},e}(j),ct=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.useProgram(t),this.current=t,this.dirty=!1);},e}(j),ut=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return this.gl.TEXTURE0},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.activeTexture(t),this.current=t,this.dirty=!1);},e}(j),ht=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){var t=this.gl;return [0,0,t.drawingBufferWidth,t.drawingBufferHeight]},e.prototype.set=function(t){var e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||this.dirty)&&(this.gl.viewport(t[0],t[1],t[2],t[3]),this.current=t,this.dirty=!1);},e}(j),pt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,t),this.current=t,this.dirty=!1;}},e}(j),dt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.bindRenderbuffer(e.RENDERBUFFER,t),this.current=t,this.dirty=!1;}},e}(j),_t=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.bindTexture(e.TEXTURE_2D,t),this.current=t,this.dirty=!1;}},e}(j),ft=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,t),this.current=t,this.dirty=!1;}},e}(j),mt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){var e=this.gl;e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t),this.current=t,this.dirty=!1;},e}(j),gt=function(t){function e(e){t.call(this,e),this.vao=e.extVertexArrayObject;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){this.vao&&(t!==this.current||this.dirty)&&(this.vao.bindVertexArrayOES(t),this.current=t,this.dirty=!1);},e}(j),vt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return 4},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.pixelStorei(e.UNPACK_ALIGNMENT,t),this.current=t,this.dirty=!1;}},e}(j),yt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t),this.current=t,this.dirty=!1;}},e}(j),xt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,t),this.current=t,this.dirty=!1;}},e}(j),bt=function(t){function e(e,i){t.call(this,e),this.context=e,this.parent=i;}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getDefault=function(){return null},e}(j),wt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.setDirty=function(){this.dirty=!0;},e.prototype.set=function(t){if(t!==this.current||this.dirty){this.context.bindFramebuffer.set(this.parent);var e=this.gl;e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),this.current=t,this.dirty=!1;}},e}(bt),Tt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.set=function(t){if(t!==this.current||this.dirty){this.context.bindFramebuffer.set(this.parent);var e=this.gl;e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,t),this.current=t,this.dirty=!1;}},e}(bt),Et=function(t,e,i,o){this.context=t,this.width=e,this.height=i;var r=this.framebuffer=t.gl.createFramebuffer();this.colorAttachment=new wt(t,r),o&&(this.depthAttachment=new Tt(t,r));};Et.prototype.destroy=function(){var t=this.context.gl,e=this.colorAttachment.get();if(e&&t.deleteTexture(e),this.depthAttachment){var i=this.depthAttachment.get();i&&t.deleteRenderbuffer(i);}t.deleteFramebuffer(this.framebuffer);};var It=function(t,e,i){this.func=t,this.mask=e,this.range=i;};It.ReadOnly=!1,It.ReadWrite=!0,It.disabled=new It(519,It.ReadOnly,[0,1]);var Pt=function(t,e,i,o,r,a){this.test=t,this.ref=e,this.mask=i,this.fail=o,this.depthFail=r,this.pass=a;};Pt.disabled=new Pt({func:519,mask:0},0,0,7680,7680,7680);var St=function(t,e,i){this.blendFunction=t,this.blendColor=e,this.mask=i;};St.disabled=new St(St.Replace=[1,0],t.Color.transparent,[!1,!1,!1,!1]),St.unblended=new St(St.Replace,t.Color.transparent,[!0,!0,!0,!0]),St.alphaBlended=new St([1,771],t.Color.transparent,[!0,!0,!0,!0]);var Ct=function(t,e,i){this.enable=t,this.mode=e,this.frontFace=i;};Ct.disabled=new Ct(!1,1029,2305),Ct.backCCW=new Ct(!0,1029,2305);var zt=function(t){this.gl=t,this.extVertexArrayObject=this.gl.getExtension("OES_vertex_array_object"),this.clearColor=new V(this),this.clearDepth=new G(this),this.clearStencil=new W(this),this.colorMask=new X(this),this.depthMask=new H(this),this.stencilMask=new K(this),this.stencilFunc=new Y(this),this.stencilOp=new J(this),this.stencilTest=new Q(this),this.depthRange=new $(this),this.depthTest=new tt(this),this.depthFunc=new et(this),this.blend=new it(this),this.blendFunc=new ot(this),this.blendColor=new rt(this),this.blendEquation=new at(this),this.cullFace=new nt(this),this.cullFaceSide=new st(this),this.frontFace=new lt(this),this.program=new ct(this),this.activeTexture=new ut(this),this.viewport=new ht(this),this.bindFramebuffer=new pt(this),this.bindRenderbuffer=new dt(this),this.bindTexture=new _t(this),this.bindVertexBuffer=new ft(this),this.bindElementBuffer=new mt(this),this.bindVertexArrayOES=this.extVertexArrayObject&&new gt(this),this.pixelStoreUnpack=new vt(this),this.pixelStoreUnpackPremultiplyAlpha=new yt(this),this.pixelStoreUnpackFlipY=new xt(this),this.extTextureFilterAnisotropic=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic"),this.extTextureFilterAnisotropic&&(this.extTextureFilterAnisotropicMax=t.getParameter(this.extTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),this.extTextureHalfFloat=t.getExtension("OES_texture_half_float"),this.extTextureHalfFloat&&(t.getExtension("OES_texture_half_float_linear"),this.extRenderToTextureHalfFloat=t.getExtension("EXT_color_buffer_half_float")),this.extTimerQuery=t.getExtension("EXT_disjoint_timer_query"),this.maxTextureSize=t.getParameter(t.MAX_TEXTURE_SIZE);};zt.prototype.setDefault=function(){this.unbindVAO(),this.clearColor.setDefault(),this.clearDepth.setDefault(),this.clearStencil.setDefault(),this.colorMask.setDefault(),this.depthMask.setDefault(),this.stencilMask.setDefault(),this.stencilFunc.setDefault(),this.stencilOp.setDefault(),this.stencilTest.setDefault(),this.depthRange.setDefault(),this.depthTest.setDefault(),this.depthFunc.setDefault(),this.blend.setDefault(),this.blendFunc.setDefault(),this.blendColor.setDefault(),this.blendEquation.setDefault(),this.cullFace.setDefault(),this.cullFaceSide.setDefault(),this.frontFace.setDefault(),this.program.setDefault(),this.activeTexture.setDefault(),this.bindFramebuffer.setDefault(),this.pixelStoreUnpack.setDefault(),this.pixelStoreUnpackPremultiplyAlpha.setDefault(),this.pixelStoreUnpackFlipY.setDefault();},zt.prototype.setDirty=function(){this.clearColor.dirty=!0,this.clearDepth.dirty=!0,this.clearStencil.dirty=!0,this.colorMask.dirty=!0,this.depthMask.dirty=!0,this.stencilMask.dirty=!0,this.stencilFunc.dirty=!0,this.stencilOp.dirty=!0,this.stencilTest.dirty=!0,this.depthRange.dirty=!0,this.depthTest.dirty=!0,this.depthFunc.dirty=!0,this.blend.dirty=!0,this.blendFunc.dirty=!0,this.blendColor.dirty=!0,this.blendEquation.dirty=!0,this.cullFace.dirty=!0,this.cullFaceSide.dirty=!0,this.frontFace.dirty=!0,this.program.dirty=!0,this.activeTexture.dirty=!0,this.viewport.dirty=!0,this.bindFramebuffer.dirty=!0,this.bindRenderbuffer.dirty=!0,this.bindTexture.dirty=!0,this.bindVertexBuffer.dirty=!0,this.bindElementBuffer.dirty=!0,this.extVertexArrayObject&&(this.bindVertexArrayOES.dirty=!0),this.pixelStoreUnpack.dirty=!0,this.pixelStoreUnpackPremultiplyAlpha.dirty=!0,this.pixelStoreUnpackFlipY.dirty=!0;},zt.prototype.createIndexBuffer=function(t,e){return new N(this,t,e)},zt.prototype.createVertexBuffer=function(t,e,i){return new q(this,t,e,i)},zt.prototype.createRenderbuffer=function(t,e,i){var o=this.gl,r=o.createRenderbuffer();return this.bindRenderbuffer.set(r),o.renderbufferStorage(o.RENDERBUFFER,t,e,i),this.bindRenderbuffer.set(null),r},zt.prototype.createFramebuffer=function(t,e,i){return new Et(this,t,e,i)},zt.prototype.clear=function(t){var e=t.color,i=t.depth,o=this.gl,r=0;e&&(r|=o.COLOR_BUFFER_BIT,this.clearColor.set(e),this.colorMask.set([!0,!0,!0,!0])),void 0!==i&&(r|=o.DEPTH_BUFFER_BIT,this.depthRange.set([0,1]),this.clearDepth.set(i),this.depthMask.set(!0)),o.clear(r);},zt.prototype.setCullFace=function(t){!1===t.enable?this.cullFace.set(!1):(this.cullFace.set(!0),this.cullFaceSide.set(t.mode),this.frontFace.set(t.frontFace));},zt.prototype.setDepthMode=function(t){t.func!==this.gl.ALWAYS||t.mask?(this.depthTest.set(!0),this.depthFunc.set(t.func),this.depthMask.set(t.mask),this.depthRange.set(t.range)):this.depthTest.set(!1);},zt.prototype.setStencilMode=function(t){t.test.func!==this.gl.ALWAYS||t.mask?(this.stencilTest.set(!0),this.stencilMask.set(t.mask),this.stencilOp.set([t.fail,t.depthFail,t.pass]),this.stencilFunc.set({func:t.test.func,ref:t.ref,mask:t.test.mask})):this.stencilTest.set(!1);},zt.prototype.setColorMode=function(e){t.deepEqual(e.blendFunction,St.Replace)?this.blend.set(!1):(this.blend.set(!0),this.blendFunc.set(e.blendFunction),this.blendColor.set(e.blendColor)),this.colorMask.set(e.mask);},zt.prototype.unbindVAO=function(){this.extVertexArrayObject&&this.bindVertexArrayOES.set(null);};var Dt=function(e){function i(i,o,r){var a=this;e.call(this),this.id=i,this.dispatcher=r,this.on("data",(function(t){"source"===t.dataType&&"metadata"===t.sourceDataType&&(a._sourceLoaded=!0),a._sourceLoaded&&!a._paused&&"source"===t.dataType&&"content"===t.sourceDataType&&(a.reload(),a.transform&&a.update(a.transform));})),this.on("error",(function(){a._sourceErrored=!0;})),this._source=function(e,i,o,r){var a=new k[i.type](e,i,o,r);if(a.id!==e)throw new Error("Expected Source id to be "+e+" instead of "+a.id);return t.bindAll(["load","abort","unload","serialize","prepare"],a),a}(i,o,r,this),this._tiles={},this._cache=new U(0,this._unloadTile.bind(this)),this._timers={},this._cacheTimers={},this._maxTileCacheSize=null,this._loadedParentTiles={},this._coveredTiles={},this._state=new t.SourceFeatureState;}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.onAdd=function(t){this.map=t,this._maxTileCacheSize=t?t._maxTileCacheSize:null,this._source&&this._source.onAdd&&this._source.onAdd(t);},i.prototype.onRemove=function(t){this._source&&this._source.onRemove&&this._source.onRemove(t);},i.prototype.loaded=function(){if(this._sourceErrored)return !0;if(!this._sourceLoaded)return !1;if(!this._source.loaded())return !1;for(var t in this._tiles){var e=this._tiles[t];if("loaded"!==e.state&&"errored"!==e.state)return !1}return !0},i.prototype.getSource=function(){return this._source},i.prototype.pause=function(){this._paused=!0;},i.prototype.resume=function(){if(this._paused){var t=this._shouldReloadOnResume;this._paused=!1,this._shouldReloadOnResume=!1,t&&this.reload(),this.transform&&this.update(this.transform);}},i.prototype._loadTile=function(t,e){return this._source.loadTile(t,e)},i.prototype._unloadTile=function(t){if(this._source.unloadTile)return this._source.unloadTile(t,(function(){}))},i.prototype._abortTile=function(t){if(this._source.abortTile)return this._source.abortTile(t,(function(){}))},i.prototype.serialize=function(){return this._source.serialize()},i.prototype.prepare=function(t){for(var e in this._source.prepare&&this._source.prepare(),this._state.coalesceChanges(this._tiles,this.map?this.map.painter:null),this._tiles){var i=this._tiles[e];i.upload(t),i.prepare(this.map.style.imageManager);}},i.prototype.getIds=function(){return t.values(this._tiles).map((function(t){return t.tileID})).sort(Mt).map((function(t){return t.key}))},i.prototype.getRenderableIds=function(e){var i=this,o=[];for(var r in this._tiles)this._isIdRenderable(r,e)&&o.push(this._tiles[r]);return e?o.sort((function(e,o){var r=e.tileID,a=o.tileID,n=new t.Point(r.canonical.x,r.canonical.y)._rotate(i.transform.angle),s=new t.Point(a.canonical.x,a.canonical.y)._rotate(i.transform.angle);return r.overscaledZ-a.overscaledZ||s.y-n.y||s.x-n.x})).map((function(t){return t.tileID.key})):o.map((function(t){return t.tileID})).sort(Mt).map((function(t){return t.key}))},i.prototype.hasRenderableParent=function(t){var e=this.findLoadedParent(t,0);return !!e&&this._isIdRenderable(e.tileID.key)},i.prototype._isIdRenderable=function(t,e){return this._tiles[t]&&this._tiles[t].hasData()&&!this._coveredTiles[t]&&(e||!this._tiles[t].holdingForFade())},i.prototype.reload=function(){if(this._paused)this._shouldReloadOnResume=!0;else for(var t in this._cache.reset(),this._tiles)"errored"!==this._tiles[t].state&&this._reloadTile(t,"reloading");},i.prototype._reloadTile=function(t,e){var i=this._tiles[t];i&&("loading"!==i.state&&(i.state=e),this._loadTile(i,this._tileLoaded.bind(this,i,t,e)));},i.prototype._tileLoaded=function(e,i,o,r){if(r)return e.state="errored",void(404!==r.status?this._source.fire(new t.ErrorEvent(r,{tile:e})):this.update(this.transform));e.timeAdded=t.browser.now(),"expired"===o&&(e.refreshedUponExpiration=!0),this._setTileReloadTimer(i,e),"raster-dem"===this.getSource().type&&e.dem&&this._backfillDEM(e),this._state.initializeTileState(e,this.map?this.map.painter:null),this._source.fire(new t.Event("data",{dataType:"source",tile:e,coord:e.tileID}));},i.prototype._backfillDEM=function(t){for(var e=this.getRenderableIds(),i=0;i<e.length;i++){var o=e[i];if(t.neighboringTiles&&t.neighboringTiles[o]){var r=this.getTileByID(o);a(t,r),a(r,t);}}function a(t,e){t.needsHillshadePrepare=!0;var i=e.tileID.canonical.x-t.tileID.canonical.x,o=e.tileID.canonical.y-t.tileID.canonical.y,r=Math.pow(2,t.tileID.canonical.z),a=e.tileID.key;0===i&&0===o||Math.abs(o)>1||(Math.abs(i)>1&&(1===Math.abs(i+r)?i+=r:1===Math.abs(i-r)&&(i-=r)),e.dem&&t.dem&&(t.dem.backfillBorder(e.dem,i,o),t.neighboringTiles&&t.neighboringTiles[a]&&(t.neighboringTiles[a].backfilled=!0)));}},i.prototype.getTile=function(t){return this.getTileByID(t.key)},i.prototype.getTileByID=function(t){return this._tiles[t]},i.prototype._retainLoadedChildren=function(t,e,i,o){for(var r in this._tiles){var a=this._tiles[r];if(!(o[r]||!a.hasData()||a.tileID.overscaledZ<=e||a.tileID.overscaledZ>i)){for(var n=a.tileID;a&&a.tileID.overscaledZ>e+1;){var s=a.tileID.scaledTo(a.tileID.overscaledZ-1);(a=this._tiles[s.key])&&a.hasData()&&(n=s);}for(var l=n;l.overscaledZ>e;)if(t[(l=l.scaledTo(l.overscaledZ-1)).key]){o[n.key]=n;break}}}},i.prototype.findLoadedParent=function(t,e){if(t.key in this._loadedParentTiles){var i=this._loadedParentTiles[t.key];return i&&i.tileID.overscaledZ>=e?i:null}for(var o=t.overscaledZ-1;o>=e;o--){var r=t.scaledTo(o),a=this._getLoadedTile(r);if(a)return a}},i.prototype._getLoadedTile=function(t){var e=this._tiles[t.key];return e&&e.hasData()?e:this._cache.getByKey(t.wrapped().key)},i.prototype.updateCacheSize=function(t){var e=Math.ceil(t.width/this._source.tileSize)+1,i=Math.ceil(t.height/this._source.tileSize)+1,o=Math.floor(e*i*5),r="number"==typeof this._maxTileCacheSize?Math.min(this._maxTileCacheSize,o):o;this._cache.setMaxSize(r);},i.prototype.handleWrapJump=function(t){var e=Math.round((t-(void 0===this._prevLng?t:this._prevLng))/360);if(this._prevLng=t,e){var i={};for(var o in this._tiles){var r=this._tiles[o];r.tileID=r.tileID.unwrapTo(r.tileID.wrap+e),i[r.tileID.key]=r;}for(var a in this._tiles=i,this._timers)clearTimeout(this._timers[a]),delete this._timers[a];for(var n in this._tiles)this._setTileReloadTimer(n,this._tiles[n]);}},i.prototype.update=function(e){var o=this;if(this.transform=e,this._sourceLoaded&&!this._paused){var r;this.updateCacheSize(e),this.handleWrapJump(this.transform.center.lng),this._coveredTiles={},this.used?this._source.tileID?r=e.getVisibleUnwrappedCoordinates(this._source.tileID).map((function(e){return new t.OverscaledTileID(e.canonical.z,e.wrap,e.canonical.z,e.canonical.x,e.canonical.y)})):(r=e.coveringTiles({tileSize:this._source.tileSize,minzoom:this._source.minzoom,maxzoom:this._source.maxzoom,roundZoom:this._source.roundZoom,reparseOverscaled:this._source.reparseOverscaled}),this._source.hasTile&&(r=r.filter((function(t){return o._source.hasTile(t)})))):r=[];var a=e.coveringZoomLevel(this._source),n=Math.max(a-i.maxOverzooming,this._source.minzoom),s=Math.max(a+i.maxUnderzooming,this._source.minzoom),l=this._updateRetainedTiles(r,a);if(Lt(this._source.type)){for(var c={},u={},h=0,p=Object.keys(l);h<p.length;h+=1){var d=p[h],_=l[d],f=this._tiles[d];if(f&&!(f.fadeEndTime&&f.fadeEndTime<=t.browser.now())){var m=this.findLoadedParent(_,n);m&&(this._addTile(m.tileID),c[m.tileID.key]=m.tileID),u[d]=_;}}for(var g in this._retainLoadedChildren(u,a,s,l),c)l[g]||(this._coveredTiles[g]=!0,l[g]=c[g]);}for(var v in l)this._tiles[v].clearFadeHold();for(var y=0,x=t.keysDifference(this._tiles,l);y<x.length;y+=1){var b=x[y],w=this._tiles[b];w.hasSymbolBuckets&&!w.holdingForFade()?w.setHoldDuration(this.map._fadeDuration):w.hasSymbolBuckets&&!w.symbolFadeFinished()||this._removeTile(b);}this._updateLoadedParentTileCache();}},i.prototype.releaseSymbolFadeTiles=function(){for(var t in this._tiles)this._tiles[t].holdingForFade()&&this._removeTile(t);},i.prototype._updateRetainedTiles=function(t,e){for(var o={},r={},a=Math.max(e-i.maxOverzooming,this._source.minzoom),n=Math.max(e+i.maxUnderzooming,this._source.minzoom),s={},l=0,c=t;l<c.length;l+=1){var u=c[l],h=this._addTile(u);o[u.key]=u,h.hasData()||e<this._source.maxzoom&&(s[u.key]=u);}this._retainLoadedChildren(s,e,n,o);for(var p=0,d=t;p<d.length;p+=1){var _=d[p],f=this._tiles[_.key];if(!f.hasData()){if(e+1>this._source.maxzoom){var m=_.children(this._source.maxzoom)[0],g=this.getTile(m);if(g&&g.hasData()){o[m.key]=m;continue}}else {var v=_.children(this._source.maxzoom);if(o[v[0].key]&&o[v[1].key]&&o[v[2].key]&&o[v[3].key])continue}for(var y=f.wasRequested(),x=_.overscaledZ-1;x>=a;--x){var b=_.scaledTo(x);if(r[b.key])break;if(r[b.key]=!0,!(f=this.getTile(b))&&y&&(f=this._addTile(b)),f&&(o[b.key]=b,y=f.wasRequested(),f.hasData()))break}}}return o},i.prototype._updateLoadedParentTileCache=function(){for(var t in this._loadedParentTiles={},this._tiles){for(var e=[],i=void 0,o=this._tiles[t].tileID;o.overscaledZ>0;){if(o.key in this._loadedParentTiles){i=this._loadedParentTiles[o.key];break}e.push(o.key);var r=o.scaledTo(o.overscaledZ-1);if(i=this._getLoadedTile(r))break;o=r;}for(var a=0,n=e;a<n.length;a+=1)this._loadedParentTiles[n[a]]=i;}},i.prototype._addTile=function(e){var i=this._tiles[e.key];if(i)return i;(i=this._cache.getAndRemove(e))&&(this._setTileReloadTimer(e.key,i),i.tileID=e,this._state.initializeTileState(i,this.map?this.map.painter:null),this._cacheTimers[e.key]&&(clearTimeout(this._cacheTimers[e.key]),delete this._cacheTimers[e.key],this._setTileReloadTimer(e.key,i)));var o=Boolean(i);return o||(i=new t.Tile(e,this._source.tileSize*e.overscaleFactor()),this._loadTile(i,this._tileLoaded.bind(this,i,e.key,i.state))),i?(i.uses++,this._tiles[e.key]=i,o||this._source.fire(new t.Event("dataloading",{tile:i,coord:i.tileID,dataType:"source"})),i):null},i.prototype._setTileReloadTimer=function(t,e){var i=this;t in this._timers&&(clearTimeout(this._timers[t]),delete this._timers[t]);var o=e.getExpiryTimeout();o&&(this._timers[t]=setTimeout((function(){i._reloadTile(t,"expired"),delete i._timers[t];}),o));},i.prototype._removeTile=function(t){var e=this._tiles[t];e&&(e.uses--,delete this._tiles[t],this._timers[t]&&(clearTimeout(this._timers[t]),delete this._timers[t]),e.uses>0||(e.hasData()&&"reloading"!==e.state?this._cache.add(e.tileID,e,e.getExpiryTimeout()):(e.aborted=!0,this._abortTile(e),this._unloadTile(e))));},i.prototype.clearTiles=function(){for(var t in this._shouldReloadOnResume=!1,this._paused=!1,this._tiles)this._removeTile(t);this._cache.reset();},i.prototype.tilesIn=function(e,i,o){var r=this,a=[],n=this.transform;if(!n)return a;for(var s=o?n.getCameraQueryGeometry(e):e,l=e.map((function(t){return n.pointCoordinate(t)})),c=s.map((function(t){return n.pointCoordinate(t)})),u=this.getIds(),h=1/0,p=1/0,d=-1/0,_=-1/0,f=0,m=c;f<m.length;f+=1){var g=m[f];h=Math.min(h,g.x),p=Math.min(p,g.y),d=Math.max(d,g.x),_=Math.max(_,g.y);}for(var v=function(e){var o=r._tiles[u[e]];if(!o.holdingForFade()){var s=o.tileID,f=Math.pow(2,n.zoom-o.tileID.overscaledZ),m=i*o.queryPadding*t.EXTENT/o.tileSize/f,g=[s.getTilePoint(new t.MercatorCoordinate(h,p)),s.getTilePoint(new t.MercatorCoordinate(d,_))];if(g[0].x-m<t.EXTENT&&g[0].y-m<t.EXTENT&&g[1].x+m>=0&&g[1].y+m>=0){var v=l.map((function(t){return s.getTilePoint(t)})),y=c.map((function(t){return s.getTilePoint(t)}));a.push({tile:o,tileID:s,queryGeometry:v,cameraQueryGeometry:y,scale:f});}}},y=0;y<u.length;y++)v(y);return a},i.prototype.getVisibleCoordinates=function(t){for(var e=this,i=this.getRenderableIds(t).map((function(t){return e._tiles[t].tileID})),o=0,r=i;o<r.length;o+=1){var a=r[o];a.posMatrix=this.transform.calculatePosMatrix(a.toUnwrapped());}return i},i.prototype.hasTransition=function(){if(this._source.hasTransition())return !0;if(Lt(this._source.type))for(var e in this._tiles){var i=this._tiles[e];if(void 0!==i.fadeEndTime&&i.fadeEndTime>=t.browser.now())return !0}return !1},i.prototype.setFeatureState=function(t,e,i){this._state.updateState(t=t||"_geojsonTileLayer",e,i);},i.prototype.removeFeatureState=function(t,e,i){this._state.removeFeatureState(t=t||"_geojsonTileLayer",e,i);},i.prototype.getFeatureState=function(t,e){return this._state.getState(t=t||"_geojsonTileLayer",e)},i.prototype.setDependencies=function(t,e,i){var o=this._tiles[t];o&&o.setDependencies(e,i);},i.prototype.reloadTilesForDependencies=function(t,e){for(var i in this._tiles)this._tiles[i].hasDependency(t,e)&&this._reloadTile(i,"reloading");this._cache.filter((function(i){return !i.hasDependency(t,e)}));},i}(t.Evented);function Mt(t,e){var i=Math.abs(2*t.wrap)-+(t.wrap<0),o=Math.abs(2*e.wrap)-+(e.wrap<0);return t.overscaledZ-e.overscaledZ||o-i||e.canonical.y-t.canonical.y||e.canonical.x-t.canonical.x}function Lt(t){return "raster"===t||"image"===t||"video"===t}function At(){return new t.window.Worker(Hr.workerUrl)}Dt.maxOverzooming=10,Dt.maxUnderzooming=3;var Rt="mapboxgl_preloaded_worker_pool",kt=function(){this.active={};};kt.prototype.acquire=function(t){if(!this.workers)for(this.workers=[];this.workers.length<kt.workerCount;)this.workers.push(new At);return this.active[t]=!0,this.workers.slice()},kt.prototype.release=function(t){delete this.active[t],0===this.numActive()&&(this.workers.forEach((function(t){t.terminate();})),this.workers=null);},kt.prototype.isPreloaded=function(){return !!this.active[Rt]},kt.prototype.numActive=function(){return Object.keys(this.active).length};var Bt,Ot=Math.floor(t.browser.hardwareConcurrency/2);function Ft(){return Bt||(Bt=new kt),Bt}function Ut(e,i){var o={};for(var r in e)"ref"!==r&&(o[r]=e[r]);return t.refProperties.forEach((function(t){t in i&&(o[t]=i[t]);})),o}function Nt(t){t=t.slice();for(var e=Object.create(null),i=0;i<t.length;i++)e[t[i].id]=t[i];for(var o=0;o<t.length;o++)"ref"in t[o]&&(t[o]=Ut(t[o],e[t[o].ref]));return t}kt.workerCount=Math.max(Math.min(Ot,6),1);var Zt={setStyle:"setStyle",addLayer:"addLayer",removeLayer:"removeLayer",setPaintProperty:"setPaintProperty",setLayoutProperty:"setLayoutProperty",setFilter:"setFilter",addSource:"addSource",removeSource:"removeSource",setGeoJSONSourceData:"setGeoJSONSourceData",setLayerZoomRange:"setLayerZoomRange",setLayerProperty:"setLayerProperty",setCenter:"setCenter",setZoom:"setZoom",setBearing:"setBearing",setPitch:"setPitch",setSprite:"setSprite",setGlyphs:"setGlyphs",setTransition:"setTransition",setLight:"setLight"};function qt(t,e,i){i.push({command:Zt.addSource,args:[t,e[t]]});}function jt(t,e,i){e.push({command:Zt.removeSource,args:[t]}),i[t]=!0;}function Vt(t,e,i,o){jt(t,i,o),qt(t,e,i);}function Gt(e,i,o){var r;for(r in e[o])if(e[o].hasOwnProperty(r)&&"data"!==r&&!t.deepEqual(e[o][r],i[o][r]))return !1;for(r in i[o])if(i[o].hasOwnProperty(r)&&"data"!==r&&!t.deepEqual(e[o][r],i[o][r]))return !1;return !0}function Wt(e,i,o,r,a,n){var s;for(s in i=i||{},e=e||{})e.hasOwnProperty(s)&&(t.deepEqual(e[s],i[s])||o.push({command:n,args:[r,s,i[s],a]}));for(s in i)i.hasOwnProperty(s)&&!e.hasOwnProperty(s)&&(t.deepEqual(e[s],i[s])||o.push({command:n,args:[r,s,i[s],a]}));}function Xt(t){return t.id}function Ht(t,e){return t[e.id]=e,t}var Kt=function(t,e){this.reset(t,e);};Kt.prototype.reset=function(t,e){this.points=t||[],this._distances=[0];for(var i=1;i<this.points.length;i++)this._distances[i]=this._distances[i-1]+this.points[i].dist(this.points[i-1]);this.length=this._distances[this._distances.length-1],this.padding=Math.min(e||0,.5*this.length),this.paddedLength=this.length-2*this.padding;},Kt.prototype.lerp=function(e){if(1===this.points.length)return this.points[0];e=t.clamp(e,0,1);for(var i=1,o=this._distances[i],r=e*this.paddedLength+this.padding;o<r&&i<this._distances.length;)o=this._distances[++i];var a=i-1,n=this._distances[a],s=o-n,l=s>0?(r-n)/s:0;return this.points[a].mult(1-l).add(this.points[i].mult(l))};var Yt=function(t,e,i){var o=this.boxCells=[],r=this.circleCells=[];this.xCellCount=Math.ceil(t/i),this.yCellCount=Math.ceil(e/i);for(var a=0;a<this.xCellCount*this.yCellCount;a++)o.push([]),r.push([]);this.circleKeys=[],this.boxKeys=[],this.bboxes=[],this.circles=[],this.width=t,this.height=e,this.xScale=this.xCellCount/t,this.yScale=this.yCellCount/e,this.boxUid=0,this.circleUid=0;};function Jt(e,i,o,r,a){var n=t.create();return i?(t.scale(n,n,[1/a,1/a,1]),o||t.rotateZ(n,n,r.angle)):t.multiply(n,r.labelPlaneMatrix,e),n}function Qt(e,i,o,r,a){if(i){var n=t.clone(e);return t.scale(n,n,[a,a,1]),o||t.rotateZ(n,n,-r.angle),n}return r.glCoordMatrix}function $t(e,i){var o=[e.x,e.y,0,1];ue(o,o,i);var r=o[3];return {point:new t.Point(o[0]/r,o[1]/r),signedDistanceFromCamera:r}}function te(t,e){return .5+t/e*.5}function ee(t,e){var i=t[0]/t[3],o=t[1]/t[3];return i>=-e[0]&&i<=e[0]&&o>=-e[1]&&o<=e[1]}function ie(e,i,o,r,a,n,s,l){var c=r?e.textSizeData:e.iconSizeData,u=t.evaluateSizeForZoom(c,o.transform.zoom),h=[256/o.width*2+1,256/o.height*2+1],p=r?e.text.dynamicLayoutVertexArray:e.icon.dynamicLayoutVertexArray;p.clear();for(var d=e.lineVertexArray,_=r?e.text.placedSymbolArray:e.icon.placedSymbolArray,f=o.transform.width/o.transform.height,m=!1,g=0;g<_.length;g++){var v=_.get(g);if(v.hidden||v.writingMode===t.WritingMode.vertical&&!m)ce(v.numGlyphs,p);else {m=!1;var y=[v.anchorX,v.anchorY,0,1];if(t.transformMat4(y,y,i),ee(y,h)){var x=te(o.transform.cameraToCenterDistance,y[3]),b=t.evaluateSizeForFeature(c,u,v),w=s?b/x:b*x,T=new t.Point(v.anchorX,v.anchorY),E=$t(T,a).point,I={},P=ae(v,w,!1,l,i,a,n,e.glyphOffsetArray,d,p,E,T,I,f);m=P.useVertical,(P.notEnoughRoom||m||P.needsFlipping&&ae(v,w,!0,l,i,a,n,e.glyphOffsetArray,d,p,E,T,I,f).notEnoughRoom)&&ce(v.numGlyphs,p);}else ce(v.numGlyphs,p);}}r?e.text.dynamicLayoutVertexBuffer.updateData(p):e.icon.dynamicLayoutVertexBuffer.updateData(p);}function oe(t,e,i,o,r,a,n,s,l,c,u){var h=s.glyphStartIndex+s.numGlyphs,p=s.lineStartIndex,d=s.lineStartIndex+s.lineLength,_=e.getoffsetX(s.glyphStartIndex),f=e.getoffsetX(h-1),m=se(t*_,i,o,r,a,n,s.segment,p,d,l,c,u);if(!m)return null;var g=se(t*f,i,o,r,a,n,s.segment,p,d,l,c,u);return g?{first:m,last:g}:null}function re(e,i,o,r){return e===t.WritingMode.horizontal&&Math.abs(o.y-i.y)>Math.abs(o.x-i.x)*r?{useVertical:!0}:(e===t.WritingMode.vertical?i.y<o.y:i.x>o.x)?{needsFlipping:!0}:null}function ae(e,i,o,r,a,n,s,l,c,u,h,p,d,_){var f,m=i/24,g=e.lineOffsetX*m,v=e.lineOffsetY*m;if(e.numGlyphs>1){var y=e.glyphStartIndex+e.numGlyphs,x=e.lineStartIndex,b=e.lineStartIndex+e.lineLength,w=oe(m,l,g,v,o,h,p,e,c,n,d);if(!w)return {notEnoughRoom:!0};var T=$t(w.first.point,s).point,E=$t(w.last.point,s).point;if(r&&!o){var I=re(e.writingMode,T,E,_);if(I)return I}f=[w.first];for(var P=e.glyphStartIndex+1;P<y-1;P++)f.push(se(m*l.getoffsetX(P),g,v,o,h,p,e.segment,x,b,c,n,d));f.push(w.last);}else {if(r&&!o){var S=$t(p,a).point,C=e.lineStartIndex+e.segment+1,z=new t.Point(c.getx(C),c.gety(C)),D=$t(z,a),M=D.signedDistanceFromCamera>0?D.point:ne(p,z,S,1,a),L=re(e.writingMode,S,M,_);if(L)return L}var A=se(m*l.getoffsetX(e.glyphStartIndex),g,v,o,h,p,e.segment,e.lineStartIndex,e.lineStartIndex+e.lineLength,c,n,d);if(!A)return {notEnoughRoom:!0};f=[A];}for(var R=0,k=f;R<k.length;R+=1){var B=k[R];t.addDynamicAttributes(u,B.point,B.angle);}return {}}function ne(t,e,i,o,r){var a=$t(t.add(t.sub(e)._unit()),r).point,n=i.sub(a);return i.add(n._mult(o/n.mag()))}function se(e,i,o,r,a,n,s,l,c,u,h,p){var d=r?e-i:e+i,_=d>0?1:-1,f=0;r&&(_*=-1,f=Math.PI),_<0&&(f+=Math.PI);for(var m=_>0?l+s:l+s+1,g=a,v=a,y=0,x=0,b=Math.abs(d),w=[];y+x<=b;){if((m+=_)<l||m>=c)return null;if(v=g,w.push(g),void 0===(g=p[m])){var T=new t.Point(u.getx(m),u.gety(m)),E=$t(T,h);if(E.signedDistanceFromCamera>0)g=p[m]=E.point;else {var I=m-_;g=ne(0===y?n:new t.Point(u.getx(I),u.gety(I)),T,v,b-y+1,h);}}y+=x,x=v.dist(g);}var P=(b-y)/x,S=g.sub(v),C=S.mult(P)._add(v);C._add(S._unit()._perp()._mult(o*_));var z=f+Math.atan2(g.y-v.y,g.x-v.x);return w.push(C),{point:C,angle:z,path:w}}Yt.prototype.keysLength=function(){return this.boxKeys.length+this.circleKeys.length},Yt.prototype.insert=function(t,e,i,o,r){this._forEachCell(e,i,o,r,this._insertBoxCell,this.boxUid++),this.boxKeys.push(t),this.bboxes.push(e),this.bboxes.push(i),this.bboxes.push(o),this.bboxes.push(r);},Yt.prototype.insertCircle=function(t,e,i,o){this._forEachCell(e-o,i-o,e+o,i+o,this._insertCircleCell,this.circleUid++),this.circleKeys.push(t),this.circles.push(e),this.circles.push(i),this.circles.push(o);},Yt.prototype._insertBoxCell=function(t,e,i,o,r,a){this.boxCells[r].push(a);},Yt.prototype._insertCircleCell=function(t,e,i,o,r,a){this.circleCells[r].push(a);},Yt.prototype._query=function(t,e,i,o,r,a){if(i<0||t>this.width||o<0||e>this.height)return !r&&[];var n=[];if(t<=0&&e<=0&&this.width<=i&&this.height<=o){if(r)return !0;for(var s=0;s<this.boxKeys.length;s++)n.push({key:this.boxKeys[s],x1:this.bboxes[4*s],y1:this.bboxes[4*s+1],x2:this.bboxes[4*s+2],y2:this.bboxes[4*s+3]});for(var l=0;l<this.circleKeys.length;l++){var c=this.circles[3*l],u=this.circles[3*l+1],h=this.circles[3*l+2];n.push({key:this.circleKeys[l],x1:c-h,y1:u-h,x2:c+h,y2:u+h});}return a?n.filter(a):n}return this._forEachCell(t,e,i,o,this._queryCell,n,{hitTest:r,seenUids:{box:{},circle:{}}},a),r?n.length>0:n},Yt.prototype._queryCircle=function(t,e,i,o,r){var a=t-i,n=t+i,s=e-i,l=e+i;if(n<0||a>this.width||l<0||s>this.height)return !o&&[];var c=[];return this._forEachCell(a,s,n,l,this._queryCellCircle,c,{hitTest:o,circle:{x:t,y:e,radius:i},seenUids:{box:{},circle:{}}},r),o?c.length>0:c},Yt.prototype.query=function(t,e,i,o,r){return this._query(t,e,i,o,!1,r)},Yt.prototype.hitTest=function(t,e,i,o,r){return this._query(t,e,i,o,!0,r)},Yt.prototype.hitTestCircle=function(t,e,i,o){return this._queryCircle(t,e,i,!0,o)},Yt.prototype._queryCell=function(t,e,i,o,r,a,n,s){var l=n.seenUids,c=this.boxCells[r];if(null!==c)for(var u=this.bboxes,h=0,p=c;h<p.length;h+=1){var d=p[h];if(!l.box[d]){l.box[d]=!0;var _=4*d;if(t<=u[_+2]&&e<=u[_+3]&&i>=u[_+0]&&o>=u[_+1]&&(!s||s(this.boxKeys[d]))){if(n.hitTest)return a.push(!0),!0;a.push({key:this.boxKeys[d],x1:u[_],y1:u[_+1],x2:u[_+2],y2:u[_+3]});}}}var f=this.circleCells[r];if(null!==f)for(var m=this.circles,g=0,v=f;g<v.length;g+=1){var y=v[g];if(!l.circle[y]){l.circle[y]=!0;var x=3*y;if(this._circleAndRectCollide(m[x],m[x+1],m[x+2],t,e,i,o)&&(!s||s(this.circleKeys[y]))){if(n.hitTest)return a.push(!0),!0;var b=m[x],w=m[x+1],T=m[x+2];a.push({key:this.circleKeys[y],x1:b-T,y1:w-T,x2:b+T,y2:w+T});}}}},Yt.prototype._queryCellCircle=function(t,e,i,o,r,a,n,s){var l=n.circle,c=n.seenUids,u=this.boxCells[r];if(null!==u)for(var h=this.bboxes,p=0,d=u;p<d.length;p+=1){var _=d[p];if(!c.box[_]){c.box[_]=!0;var f=4*_;if(this._circleAndRectCollide(l.x,l.y,l.radius,h[f+0],h[f+1],h[f+2],h[f+3])&&(!s||s(this.boxKeys[_])))return a.push(!0),!0}}var m=this.circleCells[r];if(null!==m)for(var g=this.circles,v=0,y=m;v<y.length;v+=1){var x=y[v];if(!c.circle[x]){c.circle[x]=!0;var b=3*x;if(this._circlesCollide(g[b],g[b+1],g[b+2],l.x,l.y,l.radius)&&(!s||s(this.circleKeys[x])))return a.push(!0),!0}}},Yt.prototype._forEachCell=function(t,e,i,o,r,a,n,s){for(var l=this._convertToXCellCoord(t),c=this._convertToYCellCoord(e),u=this._convertToXCellCoord(i),h=this._convertToYCellCoord(o),p=l;p<=u;p++)for(var d=c;d<=h;d++)if(r.call(this,t,e,i,o,this.xCellCount*d+p,a,n,s))return},Yt.prototype._convertToXCellCoord=function(t){return Math.max(0,Math.min(this.xCellCount-1,Math.floor(t*this.xScale)))},Yt.prototype._convertToYCellCoord=function(t){return Math.max(0,Math.min(this.yCellCount-1,Math.floor(t*this.yScale)))},Yt.prototype._circlesCollide=function(t,e,i,o,r,a){var n=o-t,s=r-e,l=i+a;return l*l>n*n+s*s},Yt.prototype._circleAndRectCollide=function(t,e,i,o,r,a,n){var s=(a-o)/2,l=Math.abs(t-(o+s));if(l>s+i)return !1;var c=(n-r)/2,u=Math.abs(e-(r+c));if(u>c+i)return !1;if(l<=s||u<=c)return !0;var h=l-s,p=u-c;return h*h+p*p<=i*i};var le=new Float32Array([-1/0,-1/0,0,-1/0,-1/0,0,-1/0,-1/0,0,-1/0,-1/0,0]);function ce(t,e){for(var i=0;i<t;i++){var o=e.length;e.resize(o+4),e.float32.set(le,3*o);}}function ue(t,e,i){var o=e[0],r=e[1];return t[0]=i[0]*o+i[4]*r+i[12],t[1]=i[1]*o+i[5]*r+i[13],t[3]=i[3]*o+i[7]*r+i[15],t}var he=function(t,e,i){void 0===e&&(e=new Yt(t.width+200,t.height+200,25)),void 0===i&&(i=new Yt(t.width+200,t.height+200,25)),this.transform=t,this.grid=e,this.ignoredGrid=i,this.pitchfactor=Math.cos(t._pitch)*t.cameraToCenterDistance,this.screenRightBoundary=t.width+100,this.screenBottomBoundary=t.height+100,this.gridRightBoundary=t.width+200,this.gridBottomBoundary=t.height+200;};function pe(e,i,o){return i*(t.EXTENT/(e.tileSize*Math.pow(2,o-e.tileID.overscaledZ)))}he.prototype.placeCollisionBox=function(t,e,i,o,r){var a=this.projectAndGetPerspectiveRatio(o,t.anchorPointX,t.anchorPointY),n=i*a.perspectiveRatio,s=t.x1*n+a.point.x,l=t.y1*n+a.point.y,c=t.x2*n+a.point.x,u=t.y2*n+a.point.y;return !this.isInsideGrid(s,l,c,u)||!e&&this.grid.hitTest(s,l,c,u,r)?{box:[],offscreen:!1}:{box:[s,l,c,u],offscreen:this.isOffscreen(s,l,c,u)}},he.prototype.placeCollisionCircles=function(e,i,o,r,a,n,s,l,c,u,h,p,d){var _=[],f=new t.Point(i.anchorX,i.anchorY),m=$t(f,n),g=te(this.transform.cameraToCenterDistance,m.signedDistanceFromCamera),v=(u?a/g:a*g)/t.ONE_EM,y=$t(f,s).point,x=oe(v,r,i.lineOffsetX*v,i.lineOffsetY*v,!1,y,f,i,o,s,{}),b=!1,w=!1,T=!0;if(x){for(var E=.5*p*g+d,I=new t.Point(-100,-100),P=new t.Point(this.screenRightBoundary,this.screenBottomBoundary),S=new Kt,C=x.first,z=x.last,D=[],M=C.path.length-1;M>=1;M--)D.push(C.path[M]);for(var L=1;L<z.path.length;L++)D.push(z.path[L]);var A=2.5*E;if(l){var R=D.map((function(t){return $t(t,l)}));D=R.some((function(t){return t.signedDistanceFromCamera<=0}))?[]:R.map((function(t){return t.point}));}var k=[];if(D.length>0){for(var B=D[0].clone(),O=D[0].clone(),F=1;F<D.length;F++)B.x=Math.min(B.x,D[F].x),B.y=Math.min(B.y,D[F].y),O.x=Math.max(O.x,D[F].x),O.y=Math.max(O.y,D[F].y);k=B.x>=I.x&&O.x<=P.x&&B.y>=I.y&&O.y<=P.y?[D]:O.x<I.x||B.x>P.x||O.y<I.y||B.y>P.y?[]:t.clipLine([D],I.x,I.y,P.x,P.y);}for(var U=0,N=k;U<N.length;U+=1){var Z;S.reset(N[U],.25*E),Z=S.length<=.5*E?1:Math.ceil(S.paddedLength/A)+1;for(var q=0;q<Z;q++){var j=q/Math.max(Z-1,1),V=S.lerp(j),G=V.x+100,W=V.y+100;_.push(G,W,E,0);var X=G-E,H=W-E,K=G+E,Y=W+E;if(T=T&&this.isOffscreen(X,H,K,Y),w=w||this.isInsideGrid(X,H,K,Y),!e&&this.grid.hitTestCircle(G,W,E,h)&&(b=!0,!c))return {circles:[],offscreen:!1,collisionDetected:b}}}}return {circles:!c&&b||!w?[]:_,offscreen:T,collisionDetected:b}},he.prototype.queryRenderedSymbols=function(e){if(0===e.length||0===this.grid.keysLength()&&0===this.ignoredGrid.keysLength())return {};for(var i=[],o=1/0,r=1/0,a=-1/0,n=-1/0,s=0,l=e;s<l.length;s+=1){var c=l[s],u=new t.Point(c.x+100,c.y+100);o=Math.min(o,u.x),r=Math.min(r,u.y),a=Math.max(a,u.x),n=Math.max(n,u.y),i.push(u);}for(var h={},p={},d=0,_=this.grid.query(o,r,a,n).concat(this.ignoredGrid.query(o,r,a,n));d<_.length;d+=1){var f=_[d],m=f.key;if(void 0===h[m.bucketInstanceId]&&(h[m.bucketInstanceId]={}),!h[m.bucketInstanceId][m.featureIndex]){var g=[new t.Point(f.x1,f.y1),new t.Point(f.x2,f.y1),new t.Point(f.x2,f.y2),new t.Point(f.x1,f.y2)];t.polygonIntersectsPolygon(i,g)&&(h[m.bucketInstanceId][m.featureIndex]=!0,void 0===p[m.bucketInstanceId]&&(p[m.bucketInstanceId]=[]),p[m.bucketInstanceId].push(m.featureIndex));}}return p},he.prototype.insertCollisionBox=function(t,e,i,o,r){(e?this.ignoredGrid:this.grid).insert({bucketInstanceId:i,featureIndex:o,collisionGroupID:r},t[0],t[1],t[2],t[3]);},he.prototype.insertCollisionCircles=function(t,e,i,o,r){for(var a=e?this.ignoredGrid:this.grid,n={bucketInstanceId:i,featureIndex:o,collisionGroupID:r},s=0;s<t.length;s+=4)a.insertCircle(n,t[s],t[s+1],t[s+2]);},he.prototype.projectAndGetPerspectiveRatio=function(e,i,o){var r=[i,o,0,1];return ue(r,r,e),{point:new t.Point((r[0]/r[3]+1)/2*this.transform.width+100,(-r[1]/r[3]+1)/2*this.transform.height+100),perspectiveRatio:.5+this.transform.cameraToCenterDistance/r[3]*.5}},he.prototype.isOffscreen=function(t,e,i,o){return i<100||t>=this.screenRightBoundary||o<100||e>this.screenBottomBoundary},he.prototype.isInsideGrid=function(t,e,i,o){return i>=0&&t<this.gridRightBoundary&&o>=0&&e<this.gridBottomBoundary},he.prototype.getViewportMatrix=function(){var e=t.identity([]);return t.translate(e,e,[-100,-100,0]),e};var de=function(t,e,i,o){this.opacity=t?Math.max(0,Math.min(1,t.opacity+(t.placed?e:-e))):o&&i?1:0,this.placed=i;};de.prototype.isHidden=function(){return 0===this.opacity&&!this.placed};var _e=function(t,e,i,o,r){this.text=new de(t?t.text:null,e,i,r),this.icon=new de(t?t.icon:null,e,o,r);};_e.prototype.isHidden=function(){return this.text.isHidden()&&this.icon.isHidden()};var fe=function(t,e,i){this.text=t,this.icon=e,this.skipFade=i;},me=function(){this.invProjMatrix=t.create(),this.viewportMatrix=t.create(),this.circles=[];},ge=function(t,e,i,o,r){this.bucketInstanceId=t,this.featureIndex=e,this.sourceLayerIndex=i,this.bucketIndex=o,this.tileID=r;},ve=function(t){this.crossSourceCollisions=t,this.maxGroupID=0,this.collisionGroups={};};function ye(e,i,o,r,a){var n=t.getAnchorAlignment(e),s=-(n.horizontalAlign-.5)*i,l=-(n.verticalAlign-.5)*o,c=t.evaluateVariableOffset(e,r);return new t.Point(s+c[0]*a,l+c[1]*a)}function xe(e,i,o,r,a,n){var s=e.x1,l=e.x2,c=e.y1,u=e.y2,h=e.anchorPointX,p=e.anchorPointY,d=new t.Point(i,o);return r&&d._rotate(a?n:-n),{x1:s+d.x,y1:c+d.y,x2:l+d.x,y2:u+d.y,anchorPointX:h,anchorPointY:p}}ve.prototype.get=function(t){if(this.crossSourceCollisions)return {ID:0,predicate:null};if(!this.collisionGroups[t]){var e=++this.maxGroupID;this.collisionGroups[t]={ID:e,predicate:function(t){return t.collisionGroupID===e}};}return this.collisionGroups[t]};var be=function(t,e,i,o){this.transform=t.clone(),this.collisionIndex=new he(this.transform),this.placements={},this.opacities={},this.variableOffsets={},this.stale=!1,this.commitTime=0,this.fadeDuration=e,this.retainedQueryData={},this.collisionGroups=new ve(i),this.collisionCircleArrays={},this.prevPlacement=o,o&&(o.prevPlacement=void 0),this.placedOrientations={};};function we(t,e,i,o,r){t.emplaceBack(e?1:0,i?1:0,o||0,r||0),t.emplaceBack(e?1:0,i?1:0,o||0,r||0),t.emplaceBack(e?1:0,i?1:0,o||0,r||0),t.emplaceBack(e?1:0,i?1:0,o||0,r||0);}be.prototype.getBucketParts=function(e,i,o,r){var a=o.getBucket(i),n=o.latestFeatureIndex;if(a&&n&&i.id===a.layerIds[0]){var s=o.collisionBoxArray,l=a.layers[0].layout,c=Math.pow(2,this.transform.zoom-o.tileID.overscaledZ),u=o.tileSize/t.EXTENT,h=this.transform.calculatePosMatrix(o.tileID.toUnwrapped()),p="map"===l.get("text-pitch-alignment"),d="map"===l.get("text-rotation-alignment"),_=pe(o,1,this.transform.zoom),f=Jt(h,p,d,this.transform,_),m=null;if(p){var g=Qt(h,p,d,this.transform,_);m=t.multiply([],this.transform.labelPlaneMatrix,g);}this.retainedQueryData[a.bucketInstanceId]=new ge(a.bucketInstanceId,n,a.sourceLayerIndex,a.index,o.tileID);var v={bucket:a,layout:l,posMatrix:h,textLabelPlaneMatrix:f,labelToScreenMatrix:m,scale:c,textPixelRatio:u,holdingForFade:o.holdingForFade(),collisionBoxArray:s,partiallyEvaluatedTextSize:t.evaluateSizeForZoom(a.textSizeData,this.transform.zoom),collisionGroup:this.collisionGroups.get(a.sourceID)};if(r)for(var y=0,x=a.sortKeyRanges;y<x.length;y+=1){var b=x[y];e.push({sortKey:b.sortKey,symbolInstanceStart:b.symbolInstanceStart,symbolInstanceEnd:b.symbolInstanceEnd,parameters:v});}else e.push({symbolInstanceStart:0,symbolInstanceEnd:a.symbolInstances.length,parameters:v});}},be.prototype.attemptAnchorPlacement=function(t,e,i,o,r,a,n,s,l,c,u,h,p,d,_){var f,m=[h.textOffset0,h.textOffset1],g=ye(t,i,o,m,r),v=this.collisionIndex.placeCollisionBox(xe(e,g.x,g.y,a,n,this.transform.angle),u,s,l,c.predicate);if(!_||0!==this.collisionIndex.placeCollisionBox(xe(_,g.x,g.y,a,n,this.transform.angle),u,s,l,c.predicate).box.length)return v.box.length>0?(this.prevPlacement&&this.prevPlacement.variableOffsets[h.crossTileID]&&this.prevPlacement.placements[h.crossTileID]&&this.prevPlacement.placements[h.crossTileID].text&&(f=this.prevPlacement.variableOffsets[h.crossTileID].anchor),this.variableOffsets[h.crossTileID]={textOffset:m,width:i,height:o,anchor:t,textBoxScale:r,prevAnchor:f},this.markUsedJustification(p,t,h,d),p.allowVerticalPlacement&&(this.markUsedOrientation(p,d,h),this.placedOrientations[h.crossTileID]=d),{shift:g,placedGlyphBoxes:v}):void 0},be.prototype.placeLayerBucketPart=function(e,i,o){var r=this,a=e.parameters,n=a.bucket,s=a.layout,l=a.posMatrix,c=a.textLabelPlaneMatrix,u=a.labelToScreenMatrix,h=a.textPixelRatio,p=a.holdingForFade,d=a.collisionBoxArray,_=a.partiallyEvaluatedTextSize,f=a.collisionGroup,m=s.get("text-optional"),g=s.get("icon-optional"),v=s.get("text-allow-overlap"),y=s.get("icon-allow-overlap"),x="map"===s.get("text-rotation-alignment"),b="map"===s.get("text-pitch-alignment"),w="none"!==s.get("icon-text-fit"),T="viewport-y"===s.get("symbol-z-order"),E=v&&(y||!n.hasIconData()||g),I=y&&(v||!n.hasTextData()||m);!n.collisionArrays&&d&&n.deserializeCollisionBoxes(d);var P=function(e,a){if(!i[e.crossTileID])if(p)r.placements[e.crossTileID]=new fe(!1,!1,!1);else {var d,T=!1,P=!1,S=!0,C=null,z={box:null,offscreen:null},D={box:null,offscreen:null},M=null,L=null,A=0,R=0,k=0;a.textFeatureIndex?A=a.textFeatureIndex:e.useRuntimeCollisionCircles&&(A=e.featureIndex),a.verticalTextFeatureIndex&&(R=a.verticalTextFeatureIndex);var B=a.textBox;if(B){var O=function(i){var o=t.WritingMode.horizontal;if(n.allowVerticalPlacement&&!i&&r.prevPlacement){var a=r.prevPlacement.placedOrientations[e.crossTileID];a&&(r.placedOrientations[e.crossTileID]=a,r.markUsedOrientation(n,o=a,e));}return o},F=function(i,o){if(n.allowVerticalPlacement&&e.numVerticalGlyphVertices>0&&a.verticalTextBox)for(var r=0,s=n.writingModes;r<s.length&&(s[r]===t.WritingMode.vertical?(z=o(),D=z):z=i(),!(z&&z.box&&z.box.length));r+=1);else z=i();};if(s.get("text-variable-anchor")){var U=s.get("text-variable-anchor");if(r.prevPlacement&&r.prevPlacement.variableOffsets[e.crossTileID]){var N=r.prevPlacement.variableOffsets[e.crossTileID];U.indexOf(N.anchor)>0&&(U=U.filter((function(t){return t!==N.anchor}))).unshift(N.anchor);}var Z=function(t,i,o){for(var a=t.x2-t.x1,s=t.y2-t.y1,c=e.textBoxScale,u=w&&!y?i:null,p={box:[],offscreen:!1},d=v?2*U.length:U.length,_=0;_<d;++_){var m=r.attemptAnchorPlacement(U[_%U.length],t,a,s,c,x,b,h,l,f,_>=U.length,e,n,o,u);if(m&&(p=m.placedGlyphBoxes)&&p.box&&p.box.length){T=!0,C=m.shift;break}}return p};F((function(){return Z(B,a.iconBox,t.WritingMode.horizontal)}),(function(){var i=a.verticalTextBox;return n.allowVerticalPlacement&&!(z&&z.box&&z.box.length)&&e.numVerticalGlyphVertices>0&&i?Z(i,a.verticalIconBox,t.WritingMode.vertical):{box:null,offscreen:null}})),z&&(T=z.box,S=z.offscreen);var q=O(z&&z.box);if(!T&&r.prevPlacement){var j=r.prevPlacement.variableOffsets[e.crossTileID];j&&(r.variableOffsets[e.crossTileID]=j,r.markUsedJustification(n,j.anchor,e,q));}}else {var V=function(t,i){var o=r.collisionIndex.placeCollisionBox(t,v,h,l,f.predicate);return o&&o.box&&o.box.length&&(r.markUsedOrientation(n,i,e),r.placedOrientations[e.crossTileID]=i),o};F((function(){return V(B,t.WritingMode.horizontal)}),(function(){var i=a.verticalTextBox;return n.allowVerticalPlacement&&e.numVerticalGlyphVertices>0&&i?V(i,t.WritingMode.vertical):{box:null,offscreen:null}})),O(z&&z.box&&z.box.length);}}if(T=(d=z)&&d.box&&d.box.length>0,S=d&&d.offscreen,e.useRuntimeCollisionCircles){var G=n.text.placedSymbolArray.get(e.centerJustifiedTextSymbolIndex),W=t.evaluateSizeForFeature(n.textSizeData,_,G),X=s.get("text-padding");M=r.collisionIndex.placeCollisionCircles(v,G,n.lineVertexArray,n.glyphOffsetArray,W,l,c,u,o,b,f.predicate,e.collisionCircleDiameter,X),T=v||M.circles.length>0&&!M.collisionDetected,S=S&&M.offscreen;}if(a.iconFeatureIndex&&(k=a.iconFeatureIndex),a.iconBox){var H=function(t){var e=w&&C?xe(t,C.x,C.y,x,b,r.transform.angle):t;return r.collisionIndex.placeCollisionBox(e,y,h,l,f.predicate)};P=D&&D.box&&D.box.length&&a.verticalIconBox?(L=H(a.verticalIconBox)).box.length>0:(L=H(a.iconBox)).box.length>0,S=S&&L.offscreen;}var K=m||0===e.numHorizontalGlyphVertices&&0===e.numVerticalGlyphVertices,Y=g||0===e.numIconVertices;if(K||Y?Y?K||(P=P&&T):T=P&&T:P=T=P&&T,T&&d&&d.box&&r.collisionIndex.insertCollisionBox(d.box,s.get("text-ignore-placement"),n.bucketInstanceId,D&&D.box&&R?R:A,f.ID),P&&L&&r.collisionIndex.insertCollisionBox(L.box,s.get("icon-ignore-placement"),n.bucketInstanceId,k,f.ID),M&&(T&&r.collisionIndex.insertCollisionCircles(M.circles,s.get("text-ignore-placement"),n.bucketInstanceId,A,f.ID),o)){var J=n.bucketInstanceId,Q=r.collisionCircleArrays[J];void 0===Q&&(Q=r.collisionCircleArrays[J]=new me);for(var $=0;$<M.circles.length;$+=4)Q.circles.push(M.circles[$+0]),Q.circles.push(M.circles[$+1]),Q.circles.push(M.circles[$+2]),Q.circles.push(M.collisionDetected?1:0);}r.placements[e.crossTileID]=new fe(T||E,P||I,S||n.justReloaded),i[e.crossTileID]=!0;}};if(T)for(var S=n.getSortedSymbolIndexes(this.transform.angle),C=S.length-1;C>=0;--C){var z=S[C];P(n.symbolInstances.get(z),n.collisionArrays[z]);}else for(var D=e.symbolInstanceStart;D<e.symbolInstanceEnd;D++)P(n.symbolInstances.get(D),n.collisionArrays[D]);if(o&&n.bucketInstanceId in this.collisionCircleArrays){var M=this.collisionCircleArrays[n.bucketInstanceId];t.invert(M.invProjMatrix,l),M.viewportMatrix=this.collisionIndex.getViewportMatrix();}n.justReloaded=!1;},be.prototype.markUsedJustification=function(e,i,o,r){var a;a=r===t.WritingMode.vertical?o.verticalPlacedTextSymbolIndex:{left:o.leftJustifiedTextSymbolIndex,center:o.centerJustifiedTextSymbolIndex,right:o.rightJustifiedTextSymbolIndex}[t.getAnchorJustification(i)];for(var n=0,s=[o.leftJustifiedTextSymbolIndex,o.centerJustifiedTextSymbolIndex,o.rightJustifiedTextSymbolIndex,o.verticalPlacedTextSymbolIndex];n<s.length;n+=1){var l=s[n];l>=0&&(e.text.placedSymbolArray.get(l).crossTileID=a>=0&&l!==a?0:o.crossTileID);}},be.prototype.markUsedOrientation=function(e,i,o){for(var r=i===t.WritingMode.horizontal||i===t.WritingMode.horizontalOnly?i:0,a=i===t.WritingMode.vertical?i:0,n=0,s=[o.leftJustifiedTextSymbolIndex,o.centerJustifiedTextSymbolIndex,o.rightJustifiedTextSymbolIndex];n<s.length;n+=1)e.text.placedSymbolArray.get(s[n]).placedOrientation=r;o.verticalPlacedTextSymbolIndex&&(e.text.placedSymbolArray.get(o.verticalPlacedTextSymbolIndex).placedOrientation=a);},be.prototype.commit=function(t){this.commitTime=t,this.zoomAtLastRecencyCheck=this.transform.zoom;var e=this.prevPlacement,i=!1;this.prevZoomAdjustment=e?e.zoomAdjustment(this.transform.zoom):0;var o=e?e.symbolFadeChange(t):1,r=e?e.opacities:{},a=e?e.variableOffsets:{},n=e?e.placedOrientations:{};for(var s in this.placements){var l=this.placements[s],c=r[s];c?(this.opacities[s]=new _e(c,o,l.text,l.icon),i=i||l.text!==c.text.placed||l.icon!==c.icon.placed):(this.opacities[s]=new _e(null,o,l.text,l.icon,l.skipFade),i=i||l.text||l.icon);}for(var u in r){var h=r[u];if(!this.opacities[u]){var p=new _e(h,o,!1,!1);p.isHidden()||(this.opacities[u]=p,i=i||h.text.placed||h.icon.placed);}}for(var d in a)this.variableOffsets[d]||!this.opacities[d]||this.opacities[d].isHidden()||(this.variableOffsets[d]=a[d]);for(var _ in n)this.placedOrientations[_]||!this.opacities[_]||this.opacities[_].isHidden()||(this.placedOrientations[_]=n[_]);i?this.lastPlacementChangeTime=t:"number"!=typeof this.lastPlacementChangeTime&&(this.lastPlacementChangeTime=e?e.lastPlacementChangeTime:t);},be.prototype.updateLayerOpacities=function(t,e){for(var i={},o=0,r=e;o<r.length;o+=1){var a=r[o],n=a.getBucket(t);n&&a.latestFeatureIndex&&t.id===n.layerIds[0]&&this.updateBucketOpacities(n,i,a.collisionBoxArray);}},be.prototype.updateBucketOpacities=function(e,i,o){var r=this;e.hasTextData()&&e.text.opacityVertexArray.clear(),e.hasIconData()&&e.icon.opacityVertexArray.clear(),e.hasIconCollisionBoxData()&&e.iconCollisionBox.collisionVertexArray.clear(),e.hasTextCollisionBoxData()&&e.textCollisionBox.collisionVertexArray.clear();var a=e.layers[0].layout,n=new _e(null,0,!1,!1,!0),s=a.get("text-allow-overlap"),l=a.get("icon-allow-overlap"),c=a.get("text-variable-anchor"),u="map"===a.get("text-rotation-alignment"),h="map"===a.get("text-pitch-alignment"),p="none"!==a.get("icon-text-fit"),d=new _e(null,0,s&&(l||!e.hasIconData()||a.get("icon-optional")),l&&(s||!e.hasTextData()||a.get("text-optional")),!0);!e.collisionArrays&&o&&(e.hasIconCollisionBoxData()||e.hasTextCollisionBoxData())&&e.deserializeCollisionBoxes(o);for(var _=function(t,e,i){for(var o=0;o<e/4;o++)t.opacityVertexArray.emplaceBack(i);},f=function(o){var a=e.symbolInstances.get(o),s=a.numHorizontalGlyphVertices,l=a.numVerticalGlyphVertices,f=a.crossTileID,m=r.opacities[f];i[f]?m=n:m||(r.opacities[f]=m=d),i[f]=!0;var g=a.numIconVertices>0,v=r.placedOrientations[a.crossTileID],y=v===t.WritingMode.vertical,x=v===t.WritingMode.horizontal||v===t.WritingMode.horizontalOnly;if(s>0||l>0){var b=De(m.text);_(e.text,s,y?Me:b),_(e.text,l,x?Me:b);var w=m.text.isHidden();[a.rightJustifiedTextSymbolIndex,a.centerJustifiedTextSymbolIndex,a.leftJustifiedTextSymbolIndex].forEach((function(t){t>=0&&(e.text.placedSymbolArray.get(t).hidden=w||y?1:0);})),a.verticalPlacedTextSymbolIndex>=0&&(e.text.placedSymbolArray.get(a.verticalPlacedTextSymbolIndex).hidden=w||x?1:0);var T=r.variableOffsets[a.crossTileID];T&&r.markUsedJustification(e,T.anchor,a,v);var E=r.placedOrientations[a.crossTileID];E&&(r.markUsedJustification(e,"left",a,E),r.markUsedOrientation(e,E,a));}if(g){var I=De(m.icon),P=!(p&&a.verticalPlacedIconSymbolIndex&&y);a.placedIconSymbolIndex>=0&&(_(e.icon,a.numIconVertices,P?I:Me),e.icon.placedSymbolArray.get(a.placedIconSymbolIndex).hidden=m.icon.isHidden()),a.verticalPlacedIconSymbolIndex>=0&&(_(e.icon,a.numVerticalIconVertices,P?Me:I),e.icon.placedSymbolArray.get(a.verticalPlacedIconSymbolIndex).hidden=m.icon.isHidden());}if(e.hasIconCollisionBoxData()||e.hasTextCollisionBoxData()){var S=e.collisionArrays[o];if(S){var C=new t.Point(0,0);if(S.textBox||S.verticalTextBox){var z=!0;if(c){var D=r.variableOffsets[f];D?(C=ye(D.anchor,D.width,D.height,D.textOffset,D.textBoxScale),u&&C._rotate(h?r.transform.angle:-r.transform.angle)):z=!1;}S.textBox&&we(e.textCollisionBox.collisionVertexArray,m.text.placed,!z||y,C.x,C.y),S.verticalTextBox&&we(e.textCollisionBox.collisionVertexArray,m.text.placed,!z||x,C.x,C.y);}var M=Boolean(!x&&S.verticalIconBox);S.iconBox&&we(e.iconCollisionBox.collisionVertexArray,m.icon.placed,M,p?C.x:0,p?C.y:0),S.verticalIconBox&&we(e.iconCollisionBox.collisionVertexArray,m.icon.placed,!M,p?C.x:0,p?C.y:0);}}},m=0;m<e.symbolInstances.length;m++)f(m);if(e.sortFeatures(this.transform.angle),this.retainedQueryData[e.bucketInstanceId]&&(this.retainedQueryData[e.bucketInstanceId].featureSortOrder=e.featureSortOrder),e.hasTextData()&&e.text.opacityVertexBuffer&&e.text.opacityVertexBuffer.updateData(e.text.opacityVertexArray),e.hasIconData()&&e.icon.opacityVertexBuffer&&e.icon.opacityVertexBuffer.updateData(e.icon.opacityVertexArray),e.hasIconCollisionBoxData()&&e.iconCollisionBox.collisionVertexBuffer&&e.iconCollisionBox.collisionVertexBuffer.updateData(e.iconCollisionBox.collisionVertexArray),e.hasTextCollisionBoxData()&&e.textCollisionBox.collisionVertexBuffer&&e.textCollisionBox.collisionVertexBuffer.updateData(e.textCollisionBox.collisionVertexArray),e.bucketInstanceId in this.collisionCircleArrays){var g=this.collisionCircleArrays[e.bucketInstanceId];e.placementInvProjMatrix=g.invProjMatrix,e.placementViewportMatrix=g.viewportMatrix,e.collisionCircleArray=g.circles,delete this.collisionCircleArrays[e.bucketInstanceId];}},be.prototype.symbolFadeChange=function(t){return 0===this.fadeDuration?1:(t-this.commitTime)/this.fadeDuration+this.prevZoomAdjustment},be.prototype.zoomAdjustment=function(t){return Math.max(0,(this.transform.zoom-t)/1.5)},be.prototype.hasTransitions=function(t){return this.stale||t-this.lastPlacementChangeTime<this.fadeDuration},be.prototype.stillRecent=function(t,e){var i=this.zoomAtLastRecencyCheck===e?1-this.zoomAdjustment(e):1;return this.zoomAtLastRecencyCheck=e,this.commitTime+this.fadeDuration*i>t},be.prototype.setStale=function(){this.stale=!0;};var Te=Math.pow(2,25),Ee=Math.pow(2,24),Ie=Math.pow(2,17),Pe=Math.pow(2,16),Se=Math.pow(2,9),Ce=Math.pow(2,8),ze=Math.pow(2,1);function De(t){if(0===t.opacity&&!t.placed)return 0;if(1===t.opacity&&t.placed)return 4294967295;var e=t.placed?1:0,i=Math.floor(127*t.opacity);return i*Te+e*Ee+i*Ie+e*Pe+i*Se+e*Ce+i*ze+e}var Me=0,Le=function(t){this._sortAcrossTiles="viewport-y"!==t.layout.get("symbol-z-order")&&void 0!==t.layout.get("symbol-sort-key").constantOr(1),this._currentTileIndex=0,this._currentPartIndex=0,this._seenCrossTileIDs={},this._bucketParts=[];};Le.prototype.continuePlacement=function(t,e,i,o,r){for(var a=this._bucketParts;this._currentTileIndex<t.length;)if(e.getBucketParts(a,o,t[this._currentTileIndex],this._sortAcrossTiles),this._currentTileIndex++,r())return !0;for(this._sortAcrossTiles&&(this._sortAcrossTiles=!1,a.sort((function(t,e){return t.sortKey-e.sortKey})));this._currentPartIndex<a.length;)if(e.placeLayerBucketPart(a[this._currentPartIndex],this._seenCrossTileIDs,i),this._currentPartIndex++,r())return !0;return !1};var Ae=function(t,e,i,o,r,a,n){this.placement=new be(t,r,a,n),this._currentPlacementIndex=e.length-1,this._forceFullPlacement=i,this._showCollisionBoxes=o,this._done=!1;};Ae.prototype.isDone=function(){return this._done},Ae.prototype.continuePlacement=function(e,i,o){for(var r=this,a=t.browser.now(),n=function(){var e=t.browser.now()-a;return !r._forceFullPlacement&&e>2};this._currentPlacementIndex>=0;){var s=i[e[this._currentPlacementIndex]],l=this.placement.collisionIndex.transform.zoom;if("symbol"===s.type&&(!s.minzoom||s.minzoom<=l)&&(!s.maxzoom||s.maxzoom>l)){if(this._inProgressLayer||(this._inProgressLayer=new Le(s)),this._inProgressLayer.continuePlacement(o[s.source],this.placement,this._showCollisionBoxes,s,n))return;delete this._inProgressLayer;}this._currentPlacementIndex--;}this._done=!0;},Ae.prototype.commit=function(t){return this.placement.commit(t),this.placement};var Re=512/t.EXTENT/2,ke=function(t,e,i){this.tileID=t,this.indexedSymbolInstances={},this.bucketInstanceId=i;for(var o=0;o<e.length;o++){var r=e.get(o),a=r.key;this.indexedSymbolInstances[a]||(this.indexedSymbolInstances[a]=[]),this.indexedSymbolInstances[a].push({crossTileID:r.crossTileID,coord:this.getScaledCoordinates(r,t)});}};ke.prototype.getScaledCoordinates=function(e,i){var o=Re/Math.pow(2,i.canonical.z-this.tileID.canonical.z);return {x:Math.floor((i.canonical.x*t.EXTENT+e.anchorX)*o),y:Math.floor((i.canonical.y*t.EXTENT+e.anchorY)*o)}},ke.prototype.findMatches=function(t,e,i){for(var o=this.tileID.canonical.z<e.canonical.z?1:Math.pow(2,this.tileID.canonical.z-e.canonical.z),r=0;r<t.length;r++){var a=t.get(r);if(!a.crossTileID){var n=this.indexedSymbolInstances[a.key];if(n)for(var s=this.getScaledCoordinates(a,e),l=0,c=n;l<c.length;l+=1){var u=c[l];if(Math.abs(u.coord.x-s.x)<=o&&Math.abs(u.coord.y-s.y)<=o&&!i[u.crossTileID]){i[u.crossTileID]=!0,a.crossTileID=u.crossTileID;break}}}}};var Be=function(){this.maxCrossTileID=0;};Be.prototype.generate=function(){return ++this.maxCrossTileID};var Oe=function(){this.indexes={},this.usedCrossTileIDs={},this.lng=0;};Oe.prototype.handleWrapJump=function(t){var e=Math.round((t-this.lng)/360);if(0!==e)for(var i in this.indexes){var o=this.indexes[i],r={};for(var a in o){var n=o[a];n.tileID=n.tileID.unwrapTo(n.tileID.wrap+e),r[n.tileID.key]=n;}this.indexes[i]=r;}this.lng=t;},Oe.prototype.addBucket=function(t,e,i){if(this.indexes[t.overscaledZ]&&this.indexes[t.overscaledZ][t.key]){if(this.indexes[t.overscaledZ][t.key].bucketInstanceId===e.bucketInstanceId)return !1;this.removeBucketCrossTileIDs(t.overscaledZ,this.indexes[t.overscaledZ][t.key]);}for(var o=0;o<e.symbolInstances.length;o++)e.symbolInstances.get(o).crossTileID=0;this.usedCrossTileIDs[t.overscaledZ]||(this.usedCrossTileIDs[t.overscaledZ]={});var r=this.usedCrossTileIDs[t.overscaledZ];for(var a in this.indexes){var n=this.indexes[a];if(Number(a)>t.overscaledZ)for(var s in n){var l=n[s];l.tileID.isChildOf(t)&&l.findMatches(e.symbolInstances,t,r);}else {var c=n[t.scaledTo(Number(a)).key];c&&c.findMatches(e.symbolInstances,t,r);}}for(var u=0;u<e.symbolInstances.length;u++){var h=e.symbolInstances.get(u);h.crossTileID||(h.crossTileID=i.generate(),r[h.crossTileID]=!0);}return void 0===this.indexes[t.overscaledZ]&&(this.indexes[t.overscaledZ]={}),this.indexes[t.overscaledZ][t.key]=new ke(t,e.symbolInstances,e.bucketInstanceId),!0},Oe.prototype.removeBucketCrossTileIDs=function(t,e){for(var i in e.indexedSymbolInstances)for(var o=0,r=e.indexedSymbolInstances[i];o<r.length;o+=1)delete this.usedCrossTileIDs[t][r[o].crossTileID];},Oe.prototype.removeStaleBuckets=function(t){var e=!1;for(var i in this.indexes){var o=this.indexes[i];for(var r in o)t[o[r].bucketInstanceId]||(this.removeBucketCrossTileIDs(i,o[r]),delete o[r],e=!0);}return e};var Fe=function(){this.layerIndexes={},this.crossTileIDs=new Be,this.maxBucketInstanceId=0,this.bucketsInCurrentPlacement={};};Fe.prototype.addLayer=function(t,e,i){var o=this.layerIndexes[t.id];void 0===o&&(o=this.layerIndexes[t.id]=new Oe);var r=!1,a={};o.handleWrapJump(i);for(var n=0,s=e;n<s.length;n+=1){var l=s[n],c=l.getBucket(t);c&&t.id===c.layerIds[0]&&(c.bucketInstanceId||(c.bucketInstanceId=++this.maxBucketInstanceId),o.addBucket(l.tileID,c,this.crossTileIDs)&&(r=!0),a[c.bucketInstanceId]=!0);}return o.removeStaleBuckets(a)&&(r=!0),r},Fe.prototype.pruneUnusedLayers=function(t){var e={};for(var i in t.forEach((function(t){e[t]=!0;})),this.layerIndexes)e[i]||delete this.layerIndexes[i];};var Ue=function(e,i){return t.emitValidationErrors(e,i&&i.filter((function(t){return "source.canvas"!==t.identifier})))},Ne=t.pick(Zt,["addLayer","removeLayer","setPaintProperty","setLayoutProperty","setFilter","addSource","removeSource","setLayerZoomRange","setLight","setTransition","setGeoJSONSourceData"]),Ze=t.pick(Zt,["setCenter","setZoom","setBearing","setPitch"]),qe=function(){var e={},i=t.styleSpec.$version;for(var o in t.styleSpec.$root){var r,a=t.styleSpec.$root[o];if(a.required)null!=(r="version"===o?i:"array"===a.type?[]:{})&&(e[o]=r);}return e}(),je=function(e){function i(o,r){var a=this;void 0===r&&(r={}),e.call(this),this.map=o,this.dispatcher=new E(Ft(),this),this.imageManager=new p,this.imageManager.setEventedParent(this),this.glyphManager=new y(o._requestManager,r.localIdeographFontFamily),this.lineAtlas=new T(256,512),this.crossTileSymbolIndex=new Fe,this._layers={},this._serializedLayers={},this._order=[],this.sourceCaches={},this.zoomHistory=new t.ZoomHistory,this._loaded=!1,this._availableImages=[],this._resetUpdates(),this.dispatcher.broadcast("setReferrer",t.getReferrer());var n=this;this._rtlTextPluginCallback=i.registerForPluginStateChange((function(e){n.dispatcher.broadcast("syncRTLPluginState",{pluginStatus:e.pluginStatus,pluginURL:e.pluginURL},(function(e,i){if(t.triggerPluginCompletionEvent(e),i&&i.every((function(t){return t})))for(var o in n.sourceCaches)n.sourceCaches[o].reload();}));})),this.on("data",(function(t){if("source"===t.dataType&&"metadata"===t.sourceDataType){var e=a.sourceCaches[t.sourceId];if(e){var i=e.getSource();if(i&&i.vectorLayerIds)for(var o in a._layers){var r=a._layers[o];r.source===i.id&&a._validateLayer(r);}}}}));}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.loadURL=function(e,i){var o=this;void 0===i&&(i={}),this.fire(new t.Event("dataloading",{dataType:"style"}));var r="boolean"==typeof i.validate?i.validate:!t.isMapboxURL(e);e=this.map._requestManager.normalizeStyleURL(e,i.accessToken);var a=this.map._requestManager.transformRequest(e,t.ResourceType.Style);this._request=t.getJSON(a,(function(e,i){o._request=null,e?o.fire(new t.ErrorEvent(e)):i&&o._load(i,r);}));},i.prototype.loadJSON=function(e,i){var o=this;void 0===i&&(i={}),this.fire(new t.Event("dataloading",{dataType:"style"})),this._request=t.browser.frame((function(){o._request=null,o._load(e,!1!==i.validate);}));},i.prototype.loadEmpty=function(){this.fire(new t.Event("dataloading",{dataType:"style"})),this._load(qe,!1);},i.prototype._load=function(e,i){if(!i||!Ue(this,t.validateStyle(e))){for(var o in this._loaded=!0,this.stylesheet=e,e.sources)this.addSource(o,e.sources[o],{validate:!1});e.sprite?this._loadSprite(e.sprite):this.imageManager.setLoaded(!0),this.glyphManager.setURL(e.glyphs);var r=Nt(this.stylesheet.layers);this._order=r.map((function(t){return t.id})),this._layers={},this._serializedLayers={};for(var a=0,n=r;a<n.length;a+=1){var s=n[a];(s=t.createStyleLayer(s)).setEventedParent(this,{layer:{id:s.id}}),this._layers[s.id]=s,this._serializedLayers[s.id]=s.serialize();}this.dispatcher.broadcast("setLayers",this._serializeLayers(this._order)),this.light=new w(this.stylesheet.light),this.fire(new t.Event("data",{dataType:"style"})),this.fire(new t.Event("style.load"));}},i.prototype._loadSprite=function(e){var i=this;this._spriteRequest=function(e,i,o){var r,a,n,s=t.browser.devicePixelRatio>1?"@2x":"",l=t.getJSON(i.transformRequest(i.normalizeSpriteURL(e,s,".json"),t.ResourceType.SpriteJSON),(function(t,e){l=null,n||(n=t,r=e,u());})),c=t.getImage(i.transformRequest(i.normalizeSpriteURL(e,s,".png"),t.ResourceType.SpriteImage),(function(t,e){c=null,n||(n=t,a=e,u());}));function u(){if(n)o(n);else if(r&&a){var e=t.browser.getImageData(a),i={};for(var s in r){var l=r[s],c=l.width,u=l.height,h=l.x,p=l.y,d=l.sdf,_=l.pixelRatio,f=l.stretchX,m=l.stretchY,g=l.content,v=new t.RGBAImage({width:c,height:u});t.RGBAImage.copy(e,v,{x:h,y:p},{x:0,y:0},{width:c,height:u}),i[s]={data:v,pixelRatio:_,sdf:d,stretchX:f,stretchY:m,content:g};}o(null,i);}}return {cancel:function(){l&&(l.cancel(),l=null),c&&(c.cancel(),c=null);}}}(e,this.map._requestManager,(function(e,o){if(i._spriteRequest=null,e)i.fire(new t.ErrorEvent(e));else if(o)for(var r in o)i.imageManager.addImage(r,o[r]);i.imageManager.setLoaded(!0),i._availableImages=i.imageManager.listImages(),i.dispatcher.broadcast("setImages",i._availableImages),i.fire(new t.Event("data",{dataType:"style"}));}));},i.prototype._validateLayer=function(e){var i=this.sourceCaches[e.source];if(i){var o=e.sourceLayer;if(o){var r=i.getSource();("geojson"===r.type||r.vectorLayerIds&&-1===r.vectorLayerIds.indexOf(o))&&this.fire(new t.ErrorEvent(new Error('Source layer "'+o+'" does not exist on source "'+r.id+'" as specified by style layer "'+e.id+'"')));}}},i.prototype.loaded=function(){if(!this._loaded)return !1;if(Object.keys(this._updatedSources).length)return !1;for(var t in this.sourceCaches)if(!this.sourceCaches[t].loaded())return !1;return !!this.imageManager.isLoaded()},i.prototype._serializeLayers=function(t){for(var e=[],i=0,o=t;i<o.length;i+=1){var r=this._layers[o[i]];"custom"!==r.type&&e.push(r.serialize());}return e},i.prototype.hasTransitions=function(){if(this.light&&this.light.hasTransition())return !0;for(var t in this.sourceCaches)if(this.sourceCaches[t].hasTransition())return !0;for(var e in this._layers)if(this._layers[e].hasTransition())return !0;return !1},i.prototype._checkLoaded=function(){if(!this._loaded)throw new Error("Style is not done loading")},i.prototype.update=function(e){if(this._loaded){var i=this._changed;if(this._changed){var o=Object.keys(this._updatedLayers),r=Object.keys(this._removedLayers);for(var a in (o.length||r.length)&&this._updateWorkerLayers(o,r),this._updatedSources){var n=this._updatedSources[a];"reload"===n?this._reloadSource(a):"clear"===n&&this._clearSource(a);}for(var s in this._updateTilesForChangedImages(),this._updatedPaintProps)this._layers[s].updateTransitions(e);this.light.updateTransitions(e),this._resetUpdates();}for(var l in this.sourceCaches)this.sourceCaches[l].used=!1;for(var c=0,u=this._order;c<u.length;c+=1){var h=this._layers[u[c]];h.recalculate(e,this._availableImages),!h.isHidden(e.zoom)&&h.source&&(this.sourceCaches[h.source].used=!0);}this.light.recalculate(e),this.z=e.zoom,i&&this.fire(new t.Event("data",{dataType:"style"}));}},i.prototype._updateTilesForChangedImages=function(){var t=Object.keys(this._changedImages);if(t.length){for(var e in this.sourceCaches)this.sourceCaches[e].reloadTilesForDependencies(["icons","patterns"],t);this._changedImages={};}},i.prototype._updateWorkerLayers=function(t,e){this.dispatcher.broadcast("updateLayers",{layers:this._serializeLayers(t),removedIds:e});},i.prototype._resetUpdates=function(){this._changed=!1,this._updatedLayers={},this._removedLayers={},this._updatedSources={},this._updatedPaintProps={},this._changedImages={};},i.prototype.setState=function(e){var i=this;if(this._checkLoaded(),Ue(this,t.validateStyle(e)))return !1;(e=t.clone$1(e)).layers=Nt(e.layers);var o=function(e,i){if(!e)return [{command:Zt.setStyle,args:[i]}];var o=[];try{if(!t.deepEqual(e.version,i.version))return [{command:Zt.setStyle,args:[i]}];t.deepEqual(e.center,i.center)||o.push({command:Zt.setCenter,args:[i.center]}),t.deepEqual(e.zoom,i.zoom)||o.push({command:Zt.setZoom,args:[i.zoom]}),t.deepEqual(e.bearing,i.bearing)||o.push({command:Zt.setBearing,args:[i.bearing]}),t.deepEqual(e.pitch,i.pitch)||o.push({command:Zt.setPitch,args:[i.pitch]}),t.deepEqual(e.sprite,i.sprite)||o.push({command:Zt.setSprite,args:[i.sprite]}),t.deepEqual(e.glyphs,i.glyphs)||o.push({command:Zt.setGlyphs,args:[i.glyphs]}),t.deepEqual(e.transition,i.transition)||o.push({command:Zt.setTransition,args:[i.transition]}),t.deepEqual(e.light,i.light)||o.push({command:Zt.setLight,args:[i.light]});var r={},a=[];!function(e,i,o,r){var a;for(a in i=i||{},e=e||{})e.hasOwnProperty(a)&&(i.hasOwnProperty(a)||jt(a,o,r));for(a in i)i.hasOwnProperty(a)&&(e.hasOwnProperty(a)?t.deepEqual(e[a],i[a])||("geojson"===e[a].type&&"geojson"===i[a].type&&Gt(e,i,a)?o.push({command:Zt.setGeoJSONSourceData,args:[a,i[a].data]}):Vt(a,i,o,r)):qt(a,i,o));}(e.sources,i.sources,a,r);var n=[];e.layers&&e.layers.forEach((function(t){r[t.source]?o.push({command:Zt.removeLayer,args:[t.id]}):n.push(t);})),o=o.concat(a),function(e,i,o){i=i||[];var r,a,n,s,l,c,u,h=(e=e||[]).map(Xt),p=i.map(Xt),d=e.reduce(Ht,{}),_=i.reduce(Ht,{}),f=h.slice(),m=Object.create(null);for(r=0,a=0;r<h.length;r++)_.hasOwnProperty(n=h[r])?a++:(o.push({command:Zt.removeLayer,args:[n]}),f.splice(f.indexOf(n,a),1));for(r=0,a=0;r<p.length;r++)f[f.length-1-r]!==(n=p[p.length-1-r])&&(d.hasOwnProperty(n)?(o.push({command:Zt.removeLayer,args:[n]}),f.splice(f.lastIndexOf(n,f.length-a),1)):a++,o.push({command:Zt.addLayer,args:[_[n],c=f[f.length-r]]}),f.splice(f.length-r,0,n),m[n]=!0);for(r=0;r<p.length;r++)if(s=d[n=p[r]],l=_[n],!m[n]&&!t.deepEqual(s,l))if(t.deepEqual(s.source,l.source)&&t.deepEqual(s["source-layer"],l["source-layer"])&&t.deepEqual(s.type,l.type)){for(u in Wt(s.layout,l.layout,o,n,null,Zt.setLayoutProperty),Wt(s.paint,l.paint,o,n,null,Zt.setPaintProperty),t.deepEqual(s.filter,l.filter)||o.push({command:Zt.setFilter,args:[n,l.filter]}),t.deepEqual(s.minzoom,l.minzoom)&&t.deepEqual(s.maxzoom,l.maxzoom)||o.push({command:Zt.setLayerZoomRange,args:[n,l.minzoom,l.maxzoom]}),s)s.hasOwnProperty(u)&&"layout"!==u&&"paint"!==u&&"filter"!==u&&"metadata"!==u&&"minzoom"!==u&&"maxzoom"!==u&&(0===u.indexOf("paint.")?Wt(s[u],l[u],o,n,u.slice(6),Zt.setPaintProperty):t.deepEqual(s[u],l[u])||o.push({command:Zt.setLayerProperty,args:[n,u,l[u]]}));for(u in l)l.hasOwnProperty(u)&&!s.hasOwnProperty(u)&&"layout"!==u&&"paint"!==u&&"filter"!==u&&"metadata"!==u&&"minzoom"!==u&&"maxzoom"!==u&&(0===u.indexOf("paint.")?Wt(s[u],l[u],o,n,u.slice(6),Zt.setPaintProperty):t.deepEqual(s[u],l[u])||o.push({command:Zt.setLayerProperty,args:[n,u,l[u]]}));}else o.push({command:Zt.removeLayer,args:[n]}),c=f[f.lastIndexOf(n)+1],o.push({command:Zt.addLayer,args:[l,c]});}(n,i.layers,o);}catch(t){console.warn("Unable to compute style diff:",t),o=[{command:Zt.setStyle,args:[i]}];}return o}(this.serialize(),e).filter((function(t){return !(t.command in Ze)}));if(0===o.length)return !1;var r=o.filter((function(t){return !(t.command in Ne)}));if(r.length>0)throw new Error("Unimplemented: "+r.map((function(t){return t.command})).join(", ")+".");return o.forEach((function(t){"setTransition"!==t.command&&i[t.command].apply(i,t.args);})),this.stylesheet=e,!0},i.prototype.addImage=function(e,i){if(this.getImage(e))return this.fire(new t.ErrorEvent(new Error("An image with this name already exists.")));this.imageManager.addImage(e,i),this._afterImageUpdated(e);},i.prototype.updateImage=function(t,e){this.imageManager.updateImage(t,e);},i.prototype.getImage=function(t){return this.imageManager.getImage(t)},i.prototype.removeImage=function(e){if(!this.getImage(e))return this.fire(new t.ErrorEvent(new Error("No image with this name exists.")));this.imageManager.removeImage(e),this._afterImageUpdated(e);},i.prototype._afterImageUpdated=function(e){this._availableImages=this.imageManager.listImages(),this._changedImages[e]=!0,this._changed=!0,this.dispatcher.broadcast("setImages",this._availableImages),this.fire(new t.Event("data",{dataType:"style"}));},i.prototype.listImages=function(){return this._checkLoaded(),this.imageManager.listImages()},i.prototype.addSource=function(e,i,o){var r=this;if(void 0===o&&(o={}),this._checkLoaded(),void 0!==this.sourceCaches[e])throw new Error("There is already a source with this ID");if(!i.type)throw new Error("The type property must be defined, but only the following properties were given: "+Object.keys(i).join(", ")+".");if(!(["vector","raster","geojson","video","image"].indexOf(i.type)>=0&&this._validate(t.validateStyle.source,"sources."+e,i,null,o))){this.map&&this.map._collectResourceTiming&&(i.collectResourceTiming=!0);var a=this.sourceCaches[e]=new Dt(e,i,this.dispatcher);a.style=this,a.setEventedParent(this,(function(){return {isSourceLoaded:r.loaded(),source:a.serialize(),sourceId:e}})),a.onAdd(this.map),this._changed=!0;}},i.prototype.removeSource=function(e){if(this._checkLoaded(),void 0===this.sourceCaches[e])throw new Error("There is no source with this ID");for(var i in this._layers)if(this._layers[i].source===e)return this.fire(new t.ErrorEvent(new Error('Source "'+e+'" cannot be removed while layer "'+i+'" is using it.')));var o=this.sourceCaches[e];delete this.sourceCaches[e],delete this._updatedSources[e],o.fire(new t.Event("data",{sourceDataType:"metadata",dataType:"source",sourceId:e})),o.setEventedParent(null),o.clearTiles(),o.onRemove&&o.onRemove(this.map),this._changed=!0;},i.prototype.setGeoJSONSourceData=function(t,e){this._checkLoaded(),this.sourceCaches[t].getSource().setData(e),this._changed=!0;},i.prototype.getSource=function(t){return this.sourceCaches[t]&&this.sourceCaches[t].getSource()},i.prototype.addLayer=function(e,i,o){void 0===o&&(o={}),this._checkLoaded();var r=e.id;if(this.getLayer(r))this.fire(new t.ErrorEvent(new Error('Layer with id "'+r+'" already exists on this map')));else {var a;if("custom"===e.type){if(Ue(this,t.validateCustomStyleLayer(e)))return;a=t.createStyleLayer(e);}else {if("object"==typeof e.source&&(this.addSource(r,e.source),e=t.clone$1(e),e=t.extend(e,{source:r})),this._validate(t.validateStyle.layer,"layers."+r,e,{arrayIndex:-1},o))return;a=t.createStyleLayer(e),this._validateLayer(a),a.setEventedParent(this,{layer:{id:r}}),this._serializedLayers[a.id]=a.serialize();}var n=i?this._order.indexOf(i):this._order.length;if(i&&-1===n)this.fire(new t.ErrorEvent(new Error('Layer with id "'+i+'" does not exist on this map.')));else {if(this._order.splice(n,0,r),this._layerOrderChanged=!0,this._layers[r]=a,this._removedLayers[r]&&a.source&&"custom"!==a.type){var s=this._removedLayers[r];delete this._removedLayers[r],s.type!==a.type?this._updatedSources[a.source]="clear":(this._updatedSources[a.source]="reload",this.sourceCaches[a.source].pause());}this._updateLayer(a),a.onAdd&&a.onAdd(this.map);}}},i.prototype.moveLayer=function(e,i){if(this._checkLoaded(),this._changed=!0,this._layers[e]){if(e!==i){var o=this._order.indexOf(e);this._order.splice(o,1);var r=i?this._order.indexOf(i):this._order.length;i&&-1===r?this.fire(new t.ErrorEvent(new Error('Layer with id "'+i+'" does not exist on this map.'))):(this._order.splice(r,0,e),this._layerOrderChanged=!0);}}else this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot be moved.")));},i.prototype.removeLayer=function(e){this._checkLoaded();var i=this._layers[e];if(i){i.setEventedParent(null);var o=this._order.indexOf(e);this._order.splice(o,1),this._layerOrderChanged=!0,this._changed=!0,this._removedLayers[e]=i,delete this._layers[e],delete this._serializedLayers[e],delete this._updatedLayers[e],delete this._updatedPaintProps[e],i.onRemove&&i.onRemove(this.map);}else this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot be removed.")));},i.prototype.getLayer=function(t){return this._layers[t]},i.prototype.hasLayer=function(t){return t in this._layers},i.prototype.setLayerZoomRange=function(e,i,o){this._checkLoaded();var r=this.getLayer(e);r?r.minzoom===i&&r.maxzoom===o||(null!=i&&(r.minzoom=i),null!=o&&(r.maxzoom=o),this._updateLayer(r)):this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot have zoom extent.")));},i.prototype.setFilter=function(e,i,o){void 0===o&&(o={}),this._checkLoaded();var r=this.getLayer(e);if(r){if(!t.deepEqual(r.filter,i))return null==i?(r.filter=void 0,void this._updateLayer(r)):void(this._validate(t.validateStyle.filter,"layers."+r.id+".filter",i,null,o)||(r.filter=t.clone$1(i),this._updateLayer(r)))}else this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot be filtered.")));},i.prototype.getFilter=function(e){return t.clone$1(this.getLayer(e).filter)},i.prototype.setLayoutProperty=function(e,i,o,r){void 0===r&&(r={}),this._checkLoaded();var a=this.getLayer(e);a?t.deepEqual(a.getLayoutProperty(i),o)||(a.setLayoutProperty(i,o,r),this._updateLayer(a)):this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot be styled.")));},i.prototype.getLayoutProperty=function(e,i){var o=this.getLayer(e);if(o)return o.getLayoutProperty(i);this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style.")));},i.prototype.setPaintProperty=function(e,i,o,r){void 0===r&&(r={}),this._checkLoaded();var a=this.getLayer(e);a?t.deepEqual(a.getPaintProperty(i),o)||(a.setPaintProperty(i,o,r)&&this._updateLayer(a),this._changed=!0,this._updatedPaintProps[e]=!0):this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot be styled.")));},i.prototype.getPaintProperty=function(t,e){return this.getLayer(t).getPaintProperty(e)},i.prototype.setFeatureState=function(e,i){this._checkLoaded();var o=e.source,r=e.sourceLayer,a=this.sourceCaches[o];if(void 0!==a){var n=a.getSource().type;"geojson"===n&&r?this.fire(new t.ErrorEvent(new Error("GeoJSON sources cannot have a sourceLayer parameter."))):"vector"!==n||r?(void 0===e.id&&this.fire(new t.ErrorEvent(new Error("The feature id parameter must be provided."))),a.setFeatureState(r,e.id,i)):this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));}else this.fire(new t.ErrorEvent(new Error("The source '"+o+"' does not exist in the map's style.")));},i.prototype.removeFeatureState=function(e,i){this._checkLoaded();var o=e.source,r=this.sourceCaches[o];if(void 0!==r){var a=r.getSource().type,n="vector"===a?e.sourceLayer:void 0;"vector"!==a||n?i&&"string"!=typeof e.id&&"number"!=typeof e.id?this.fire(new t.ErrorEvent(new Error("A feature id is required to remove its specific state property."))):r.removeFeatureState(n,e.id,i):this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));}else this.fire(new t.ErrorEvent(new Error("The source '"+o+"' does not exist in the map's style.")));},i.prototype.getFeatureState=function(e){this._checkLoaded();var i=e.source,o=e.sourceLayer,r=this.sourceCaches[i];if(void 0!==r){if("vector"!==r.getSource().type||o)return void 0===e.id&&this.fire(new t.ErrorEvent(new Error("The feature id parameter must be provided."))),r.getFeatureState(o,e.id);this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));}else this.fire(new t.ErrorEvent(new Error("The source '"+i+"' does not exist in the map's style.")));},i.prototype.getTransition=function(){return t.extend({duration:300,delay:0},this.stylesheet&&this.stylesheet.transition)},i.prototype.serialize=function(){return t.filterObject({version:this.stylesheet.version,name:this.stylesheet.name,metadata:this.stylesheet.metadata,light:this.stylesheet.light,center:this.stylesheet.center,zoom:this.stylesheet.zoom,bearing:this.stylesheet.bearing,pitch:this.stylesheet.pitch,sprite:this.stylesheet.sprite,glyphs:this.stylesheet.glyphs,transition:this.stylesheet.transition,sources:t.mapObject(this.sourceCaches,(function(t){return t.serialize()})),layers:this._serializeLayers(this._order)},(function(t){return void 0!==t}))},i.prototype._updateLayer=function(t){this._updatedLayers[t.id]=!0,t.source&&!this._updatedSources[t.source]&&"raster"!==this.sourceCaches[t.source].getSource().type&&(this._updatedSources[t.source]="reload",this.sourceCaches[t.source].pause()),this._changed=!0;},i.prototype._flattenAndSortRenderedFeatures=function(t){for(var e=this,i=function(t){return "fill-extrusion"===e._layers[t].type},o={},r=[],a=this._order.length-1;a>=0;a--){var n=this._order[a];if(i(n)){o[n]=a;for(var s=0,l=t;s<l.length;s+=1){var c=l[s][n];if(c)for(var u=0,h=c;u<h.length;u+=1)r.push(h[u]);}}}r.sort((function(t,e){return e.intersectionZ-t.intersectionZ}));for(var p=[],d=this._order.length-1;d>=0;d--){var _=this._order[d];if(i(_))for(var f=r.length-1;f>=0;f--){var m=r[f].feature;if(o[m.layer.id]<d)break;p.push(m),r.pop();}else for(var g=0,v=t;g<v.length;g+=1){var y=v[g][_];if(y)for(var x=0,b=y;x<b.length;x+=1)p.push(b[x].feature);}}return p},i.prototype.queryRenderedFeatures=function(e,i,o){i&&i.filter&&this._validate(t.validateStyle.filter,"queryRenderedFeatures.filter",i.filter,null,i);var r={};if(i&&i.layers){if(!Array.isArray(i.layers))return this.fire(new t.ErrorEvent(new Error("parameters.layers must be an Array."))),[];for(var a=0,n=i.layers;a<n.length;a+=1){var s=n[a],l=this._layers[s];if(!l)return this.fire(new t.ErrorEvent(new Error("The layer '"+s+"' does not exist in the map's style and cannot be queried for features."))),[];r[l.source]=!0;}}var c=[];for(var u in i.availableImages=this._availableImages,this.sourceCaches)i.layers&&!r[u]||c.push(O(this.sourceCaches[u],this._layers,this._serializedLayers,e,i,o));return this.placement&&c.push(function(t,e,i,o,r,a,n){for(var s={},l=a.queryRenderedSymbols(o),c=[],u=0,h=Object.keys(l).map(Number);u<h.length;u+=1)c.push(n[h[u]]);c.sort(F);for(var p=function(){var i=_[d],o=i.featureIndex.lookupSymbolFeatures(l[i.bucketInstanceId],e,i.bucketIndex,i.sourceLayerIndex,r.filter,r.layers,r.availableImages,t);for(var a in o){var n=s[a]=s[a]||[],c=o[a];c.sort((function(t,e){var o=i.featureSortOrder;if(o){var r=o.indexOf(t.featureIndex);return o.indexOf(e.featureIndex)-r}return e.featureIndex-t.featureIndex}));for(var u=0,h=c;u<h.length;u+=1)n.push(h[u]);}},d=0,_=c;d<_.length;d+=1)p();var f=function(e){s[e].forEach((function(o){var r=o.feature,a=i[t[e].source].getFeatureState(r.layer["source-layer"],r.id);r.source=r.layer.source,r.layer["source-layer"]&&(r.sourceLayer=r.layer["source-layer"]),r.state=a;}));};for(var m in s)f(m);return s}(this._layers,this._serializedLayers,this.sourceCaches,e,i,this.placement.collisionIndex,this.placement.retainedQueryData)),this._flattenAndSortRenderedFeatures(c)},i.prototype.querySourceFeatures=function(e,i){i&&i.filter&&this._validate(t.validateStyle.filter,"querySourceFeatures.filter",i.filter,null,i);var o=this.sourceCaches[e];return o?function(t,e){for(var i=t.getRenderableIds().map((function(e){return t.getTileByID(e)})),o=[],r={},a=0;a<i.length;a++){var n=i[a],s=n.tileID.canonical.key;r[s]||(r[s]=!0,n.querySourceFeatures(o,e));}return o}(o,i):[]},i.prototype.addSourceType=function(t,e,o){return i.getSourceType(t)?o(new Error('A source type called "'+t+'" already exists.')):(i.setSourceType(t,e),e.workerSourceURL?void this.dispatcher.broadcast("loadWorkerSource",{name:t,url:e.workerSourceURL},o):o(null,null))},i.prototype.getLight=function(){return this.light.getLight()},i.prototype.setLight=function(e,i){void 0===i&&(i={}),this._checkLoaded();var o=this.light.getLight(),r=!1;for(var a in e)if(!t.deepEqual(e[a],o[a])){r=!0;break}if(r){var n={now:t.browser.now(),transition:t.extend({duration:300,delay:0},this.stylesheet.transition)};this.light.setLight(e,i),this.light.updateTransitions(n);}},i.prototype._validate=function(e,i,o,r,a){return void 0===a&&(a={}),(!a||!1!==a.validate)&&Ue(this,e.call(t.validateStyle,t.extend({key:i,style:this.serialize(),value:o,styleSpec:t.styleSpec},r)))},i.prototype._remove=function(){for(var e in this._request&&(this._request.cancel(),this._request=null),this._spriteRequest&&(this._spriteRequest.cancel(),this._spriteRequest=null),t.evented.off("pluginStateChange",this._rtlTextPluginCallback),this._layers)this._layers[e].setEventedParent(null);for(var i in this.sourceCaches)this.sourceCaches[i].clearTiles(),this.sourceCaches[i].setEventedParent(null);this.imageManager.setEventedParent(null),this.setEventedParent(null),this.dispatcher.remove();},i.prototype._clearSource=function(t){this.sourceCaches[t].clearTiles();},i.prototype._reloadSource=function(t){this.sourceCaches[t].resume(),this.sourceCaches[t].reload();},i.prototype._updateSources=function(t){for(var e in this.sourceCaches)this.sourceCaches[e].update(t);},i.prototype._generateCollisionBoxes=function(){for(var t in this.sourceCaches)this._reloadSource(t);},i.prototype._updatePlacement=function(e,i,o,r,a){void 0===a&&(a=!1);for(var n=!1,s=!1,l={},c=0,u=this._order;c<u.length;c+=1){var h=this._layers[u[c]];if("symbol"===h.type){if(!l[h.source]){var p=this.sourceCaches[h.source];l[h.source]=p.getRenderableIds(!0).map((function(t){return p.getTileByID(t)})).sort((function(t,e){return e.tileID.overscaledZ-t.tileID.overscaledZ||(t.tileID.isLessThan(e.tileID)?-1:1)}));}var d=this.crossTileSymbolIndex.addLayer(h,l[h.source],e.center.lng);n=n||d;}}if(this.crossTileSymbolIndex.pruneUnusedLayers(this._order),((a=a||this._layerOrderChanged||0===o)||!this.pauseablePlacement||this.pauseablePlacement.isDone()&&!this.placement.stillRecent(t.browser.now(),e.zoom))&&(this.pauseablePlacement=new Ae(e,this._order,a,i,o,r,this.placement),this._layerOrderChanged=!1),this.pauseablePlacement.isDone()?this.placement.setStale():(this.pauseablePlacement.continuePlacement(this._order,this._layers,l),this.pauseablePlacement.isDone()&&(this.placement=this.pauseablePlacement.commit(t.browser.now()),s=!0),n&&this.pauseablePlacement.placement.setStale()),s||n)for(var _=0,f=this._order;_<f.length;_+=1){var m=this._layers[f[_]];"symbol"===m.type&&this.placement.updateLayerOpacities(m,l[m.source]);}return !this.pauseablePlacement.isDone()||this.placement.hasTransitions(t.browser.now())},i.prototype._releaseSymbolFadeTiles=function(){for(var t in this.sourceCaches)this.sourceCaches[t].releaseSymbolFadeTiles();},i.prototype.getImages=function(t,e,i){this.imageManager.getImages(e.icons,i),this._updateTilesForChangedImages();var o=this.sourceCaches[e.source];o&&o.setDependencies(e.tileID.key,e.type,e.icons);},i.prototype.getGlyphs=function(t,e,i){this.glyphManager.getGlyphs(e.stacks,i);},i.prototype.getResource=function(e,i,o){return t.makeRequest(i,o)},i}(t.Evented);je.getSourceType=function(t){return k[t]},je.setSourceType=function(t,e){k[t]=e;},je.registerForPluginStateChange=t.registerForPluginStateChange;var Ve=t.createLayout([{name:"a_pos",type:"Int16",components:2}]),Ge=gi("#ifdef GL_ES\nprecision mediump float;\n#else\n#if !defined(lowp)\n#define lowp\n#endif\n#if !defined(mediump)\n#define mediump\n#endif\n#if !defined(highp)\n#define highp\n#endif\n#endif","#ifdef GL_ES\nprecision highp float;\n#else\n#if !defined(lowp)\n#define lowp\n#endif\n#if !defined(mediump)\n#define mediump\n#endif\n#if !defined(highp)\n#define highp\n#endif\n#endif\nvec2 unpack_float(const float packedValue) {int packedIntValue=int(packedValue);int v0=packedIntValue/256;return vec2(v0,packedIntValue-v0*256);}vec2 unpack_opacity(const float packedOpacity) {int intOpacity=int(packedOpacity)/2;return vec2(float(intOpacity)/127.0,mod(packedOpacity,2.0));}vec4 decode_color(const vec2 encodedColor) {return vec4(unpack_float(encodedColor[0])/255.0,unpack_float(encodedColor[1])/255.0\n);}float unpack_mix_vec2(const vec2 packedValue,const float t) {return mix(packedValue[0],packedValue[1],t);}vec4 unpack_mix_color(const vec4 packedColors,const float t) {vec4 minColor=decode_color(vec2(packedColors[0],packedColors[1]));vec4 maxColor=decode_color(vec2(packedColors[2],packedColors[3]));return mix(minColor,maxColor,t);}vec2 get_pattern_pos(const vec2 pixel_coord_upper,const vec2 pixel_coord_lower,const vec2 pattern_size,const float tile_units_to_pixels,const vec2 pos) {vec2 offset=mod(mod(mod(pixel_coord_upper,pattern_size)*256.0,pattern_size)*256.0+pixel_coord_lower,pattern_size);return (tile_units_to_pixels*pos+offset)/pattern_size;}"),We=gi("uniform vec4 u_color;uniform float u_opacity;void main() {gl_FragColor=u_color*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","attribute vec2 a_pos;uniform mat4 u_matrix;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);}"),Xe=gi("uniform vec2 u_pattern_tl_a;uniform vec2 u_pattern_br_a;uniform vec2 u_pattern_tl_b;uniform vec2 u_pattern_br_b;uniform vec2 u_texsize;uniform float u_mix;uniform float u_opacity;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;void main() {vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(u_pattern_tl_a/u_texsize,u_pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(u_pattern_tl_b/u_texsize,u_pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);gl_FragColor=mix(color1,color2,u_mix)*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_pattern_size_a;uniform vec2 u_pattern_size_b;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform float u_scale_a;uniform float u_scale_b;uniform float u_tile_units_to_pixels;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,u_scale_a*u_pattern_size_a,u_tile_units_to_pixels,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,u_scale_b*u_pattern_size_b,u_tile_units_to_pixels,a_pos);}"),He=gi("varying vec3 v_data;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define mediump float radius\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define highp vec4 stroke_color\n#pragma mapbox: define mediump float stroke_width\n#pragma mapbox: define lowp float stroke_opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize mediump float radius\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize highp vec4 stroke_color\n#pragma mapbox: initialize mediump float stroke_width\n#pragma mapbox: initialize lowp float stroke_opacity\nvec2 extrude=v_data.xy;float extrude_length=length(extrude);lowp float antialiasblur=v_data.z;float antialiased_blur=-max(blur,antialiasblur);float opacity_t=smoothstep(0.0,antialiased_blur,extrude_length-1.0);float color_t=stroke_width < 0.01 ? 0.0 : smoothstep(antialiased_blur,0.0,extrude_length-radius/(radius+stroke_width));gl_FragColor=opacity_t*mix(color*opacity,stroke_color*stroke_opacity,color_t);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform bool u_scale_with_map;uniform bool u_pitch_with_map;uniform vec2 u_extrude_scale;uniform lowp float u_device_pixel_ratio;uniform highp float u_camera_to_center_distance;attribute vec2 a_pos;varying vec3 v_data;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define mediump float radius\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define highp vec4 stroke_color\n#pragma mapbox: define mediump float stroke_width\n#pragma mapbox: define lowp float stroke_opacity\nvoid main(void) {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize mediump float radius\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize highp vec4 stroke_color\n#pragma mapbox: initialize mediump float stroke_width\n#pragma mapbox: initialize lowp float stroke_opacity\nvec2 extrude=vec2(mod(a_pos,2.0)*2.0-1.0);vec2 circle_center=floor(a_pos*0.5);if (u_pitch_with_map) {vec2 corner_position=circle_center;if (u_scale_with_map) {corner_position+=extrude*(radius+stroke_width)*u_extrude_scale;} else {vec4 projected_center=u_matrix*vec4(circle_center,0,1);corner_position+=extrude*(radius+stroke_width)*u_extrude_scale*(projected_center.w/u_camera_to_center_distance);}gl_Position=u_matrix*vec4(corner_position,0,1);} else {gl_Position=u_matrix*vec4(circle_center,0,1);if (u_scale_with_map) {gl_Position.xy+=extrude*(radius+stroke_width)*u_extrude_scale*u_camera_to_center_distance;} else {gl_Position.xy+=extrude*(radius+stroke_width)*u_extrude_scale*gl_Position.w;}}lowp float antialiasblur=1.0/u_device_pixel_ratio/(radius+stroke_width);v_data=vec3(extrude.x,extrude.y,antialiasblur);}"),Ke=gi("void main() {gl_FragColor=vec4(1.0);}","attribute vec2 a_pos;uniform mat4 u_matrix;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);}"),Ye=gi("uniform highp float u_intensity;varying vec2 v_extrude;\n#pragma mapbox: define highp float weight\n#define GAUSS_COEF 0.3989422804014327\nvoid main() {\n#pragma mapbox: initialize highp float weight\nfloat d=-0.5*3.0*3.0*dot(v_extrude,v_extrude);float val=weight*u_intensity*GAUSS_COEF*exp(d);gl_FragColor=vec4(val,1.0,1.0,1.0);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform float u_extrude_scale;uniform float u_opacity;uniform float u_intensity;attribute vec2 a_pos;varying vec2 v_extrude;\n#pragma mapbox: define highp float weight\n#pragma mapbox: define mediump float radius\nconst highp float ZERO=1.0/255.0/16.0;\n#define GAUSS_COEF 0.3989422804014327\nvoid main(void) {\n#pragma mapbox: initialize highp float weight\n#pragma mapbox: initialize mediump float radius\nvec2 unscaled_extrude=vec2(mod(a_pos,2.0)*2.0-1.0);float S=sqrt(-2.0*log(ZERO/weight/u_intensity/GAUSS_COEF))/3.0;v_extrude=S*unscaled_extrude;vec2 extrude=v_extrude*radius*u_extrude_scale;vec4 pos=vec4(floor(a_pos*0.5)+extrude,0,1);gl_Position=u_matrix*pos;}"),Je=gi("uniform sampler2D u_image;uniform sampler2D u_color_ramp;uniform float u_opacity;varying vec2 v_pos;void main() {float t=texture2D(u_image,v_pos).r;vec4 color=texture2D(u_color_ramp,vec2(t,0.5));gl_FragColor=color*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(0.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_world;attribute vec2 a_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos*u_world,0,1);v_pos.x=a_pos.x;v_pos.y=1.0-a_pos.y;}"),Qe=gi("varying float v_placed;varying float v_notUsed;void main() {float alpha=0.5;gl_FragColor=vec4(1.0,0.0,0.0,1.0)*alpha;if (v_placed > 0.5) {gl_FragColor=vec4(0.0,0.0,1.0,0.5)*alpha;}if (v_notUsed > 0.5) {gl_FragColor*=.1;}}","attribute vec2 a_pos;attribute vec2 a_anchor_pos;attribute vec2 a_extrude;attribute vec2 a_placed;attribute vec2 a_shift;uniform mat4 u_matrix;uniform vec2 u_extrude_scale;uniform float u_camera_to_center_distance;varying float v_placed;varying float v_notUsed;void main() {vec4 projectedPoint=u_matrix*vec4(a_anchor_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float collision_perspective_ratio=clamp(0.5+0.5*(u_camera_to_center_distance/camera_to_anchor_distance),0.0,4.0);gl_Position=u_matrix*vec4(a_pos,0.0,1.0);gl_Position.xy+=(a_extrude+a_shift)*u_extrude_scale*gl_Position.w*collision_perspective_ratio;v_placed=a_placed.x;v_notUsed=a_placed.y;}"),$e=gi("varying float v_radius;varying vec2 v_extrude;varying float v_perspective_ratio;varying float v_collision;void main() {float alpha=0.5*min(v_perspective_ratio,1.0);float stroke_radius=0.9*max(v_perspective_ratio,1.0);float distance_to_center=length(v_extrude);float distance_to_edge=abs(distance_to_center-v_radius);float opacity_t=smoothstep(-stroke_radius,0.0,-distance_to_edge);vec4 color=mix(vec4(0.0,0.0,1.0,0.5),vec4(1.0,0.0,0.0,1.0),v_collision);gl_FragColor=color*alpha*opacity_t;}","attribute vec2 a_pos;attribute float a_radius;attribute vec2 a_flags;uniform mat4 u_matrix;uniform mat4 u_inv_matrix;uniform vec2 u_viewport_size;uniform float u_camera_to_center_distance;varying float v_radius;varying vec2 v_extrude;varying float v_perspective_ratio;varying float v_collision;vec3 toTilePosition(vec2 screenPos) {vec4 rayStart=u_inv_matrix*vec4(screenPos,-1.0,1.0);vec4 rayEnd  =u_inv_matrix*vec4(screenPos, 1.0,1.0);rayStart.xyz/=rayStart.w;rayEnd.xyz  /=rayEnd.w;highp float t=(0.0-rayStart.z)/(rayEnd.z-rayStart.z);return mix(rayStart.xyz,rayEnd.xyz,t);}void main() {vec2 quadCenterPos=a_pos;float radius=a_radius;float collision=a_flags.x;float vertexIdx=a_flags.y;vec2 quadVertexOffset=vec2(mix(-1.0,1.0,float(vertexIdx >=2.0)),mix(-1.0,1.0,float(vertexIdx >=1.0 && vertexIdx <=2.0)));vec2 quadVertexExtent=quadVertexOffset*radius;vec3 tilePos=toTilePosition(quadCenterPos);vec4 clipPos=u_matrix*vec4(tilePos,1.0);highp float camera_to_anchor_distance=clipPos.w;highp float collision_perspective_ratio=clamp(0.5+0.5*(u_camera_to_center_distance/camera_to_anchor_distance),0.0,4.0);float padding_factor=1.2;v_radius=radius;v_extrude=quadVertexExtent*padding_factor;v_perspective_ratio=collision_perspective_ratio;v_collision=collision;gl_Position=vec4(clipPos.xyz/clipPos.w,1.0)+vec4(quadVertexExtent*padding_factor/u_viewport_size*2.0,0.0,0.0);}"),ti=gi("uniform highp vec4 u_color;uniform sampler2D u_overlay;varying vec2 v_uv;void main() {vec4 overlay_color=texture2D(u_overlay,v_uv);gl_FragColor=mix(u_color,overlay_color,overlay_color.a);}","attribute vec2 a_pos;varying vec2 v_uv;uniform mat4 u_matrix;uniform float u_overlay_scale;void main() {v_uv=a_pos/8192.0;gl_Position=u_matrix*vec4(a_pos*u_overlay_scale,0,1);}"),ei=gi("#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float opacity\ngl_FragColor=color*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","attribute vec2 a_pos;uniform mat4 u_matrix;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float opacity\ngl_Position=u_matrix*vec4(a_pos,0,1);}"),ii=gi("varying vec2 v_pos;\n#pragma mapbox: define highp vec4 outline_color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 outline_color\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_pos-gl_FragCoord.xy);float alpha=1.0-smoothstep(0.0,1.0,dist);gl_FragColor=outline_color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","attribute vec2 a_pos;uniform mat4 u_matrix;uniform vec2 u_world;varying vec2 v_pos;\n#pragma mapbox: define highp vec4 outline_color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 outline_color\n#pragma mapbox: initialize lowp float opacity\ngl_Position=u_matrix*vec4(a_pos,0,1);v_pos=(gl_Position.xy/gl_Position.w+1.0)/2.0*u_world;}"),oi=gi("uniform vec2 u_texsize;uniform sampler2D u_image;uniform float u_fade;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec2 v_pos;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);float dist=length(v_pos-gl_FragCoord.xy);float alpha=1.0-smoothstep(0.0,1.0,dist);gl_FragColor=mix(color1,color2,u_fade)*alpha*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_world;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform vec3 u_scale;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec2 v_pos;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float tileRatio=u_scale.x;float fromScale=u_scale.y;float toScale=u_scale.z;gl_Position=u_matrix*vec4(a_pos,0,1);vec2 display_size_a=(pattern_br_a-pattern_tl_a)/pixel_ratio_from;vec2 display_size_b=(pattern_br_b-pattern_tl_b)/pixel_ratio_to;v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileRatio,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileRatio,a_pos);v_pos=(gl_Position.xy/gl_Position.w+1.0)/2.0*u_world;}"),ri=gi("uniform vec2 u_texsize;uniform float u_fade;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);gl_FragColor=mix(color1,color2,u_fade)*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform vec3 u_scale;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float tileZoomRatio=u_scale.x;float fromScale=u_scale.y;float toScale=u_scale.z;vec2 display_size_a=(pattern_br_a-pattern_tl_a)/pixel_ratio_from;vec2 display_size_b=(pattern_br_b-pattern_tl_b)/pixel_ratio_to;gl_Position=u_matrix*vec4(a_pos,0,1);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileZoomRatio,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileZoomRatio,a_pos);}"),ai=gi("varying vec4 v_color;void main() {gl_FragColor=v_color;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec3 u_lightcolor;uniform lowp vec3 u_lightpos;uniform lowp float u_lightintensity;uniform float u_vertical_gradient;uniform lowp float u_opacity;attribute vec2 a_pos;attribute vec4 a_normal_ed;varying vec4 v_color;\n#pragma mapbox: define highp float base\n#pragma mapbox: define highp float height\n#pragma mapbox: define highp vec4 color\nvoid main() {\n#pragma mapbox: initialize highp float base\n#pragma mapbox: initialize highp float height\n#pragma mapbox: initialize highp vec4 color\nvec3 normal=a_normal_ed.xyz;base=max(0.0,base);height=max(0.0,height);float t=mod(normal.x,2.0);gl_Position=u_matrix*vec4(a_pos,t > 0.0 ? height : base,1);float colorvalue=color.r*0.2126+color.g*0.7152+color.b*0.0722;v_color=vec4(0.0,0.0,0.0,1.0);vec4 ambientlight=vec4(0.03,0.03,0.03,1.0);color+=ambientlight;float directional=clamp(dot(normal/16384.0,u_lightpos),0.0,1.0);directional=mix((1.0-u_lightintensity),max((1.0-colorvalue+u_lightintensity),1.0),directional);if (normal.y !=0.0) {directional*=((1.0-u_vertical_gradient)+(u_vertical_gradient*clamp((t+base)*pow(height/150.0,0.5),mix(0.7,0.98,1.0-u_lightintensity),1.0)));}v_color.r+=clamp(color.r*directional*u_lightcolor.r,mix(0.0,0.3,1.0-u_lightcolor.r),1.0);v_color.g+=clamp(color.g*directional*u_lightcolor.g,mix(0.0,0.3,1.0-u_lightcolor.g),1.0);v_color.b+=clamp(color.b*directional*u_lightcolor.b,mix(0.0,0.3,1.0-u_lightcolor.b),1.0);v_color*=u_opacity;}"),ni=gi("uniform vec2 u_texsize;uniform float u_fade;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec4 v_lighting;\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\nvoid main() {\n#pragma mapbox: initialize lowp float base\n#pragma mapbox: initialize lowp float height\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);vec4 mixedColor=mix(color1,color2,u_fade);gl_FragColor=mixedColor*v_lighting;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform float u_height_factor;uniform vec3 u_scale;uniform float u_vertical_gradient;uniform lowp float u_opacity;uniform vec3 u_lightcolor;uniform lowp vec3 u_lightpos;uniform lowp float u_lightintensity;attribute vec2 a_pos;attribute vec4 a_normal_ed;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec4 v_lighting;\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\nvoid main() {\n#pragma mapbox: initialize lowp float base\n#pragma mapbox: initialize lowp float height\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float tileRatio=u_scale.x;float fromScale=u_scale.y;float toScale=u_scale.z;vec3 normal=a_normal_ed.xyz;float edgedistance=a_normal_ed.w;vec2 display_size_a=(pattern_br_a-pattern_tl_a)/pixel_ratio_from;vec2 display_size_b=(pattern_br_b-pattern_tl_b)/pixel_ratio_to;base=max(0.0,base);height=max(0.0,height);float t=mod(normal.x,2.0);float z=t > 0.0 ? height : base;gl_Position=u_matrix*vec4(a_pos,z,1);vec2 pos=normal.x==1.0 && normal.y==0.0 && normal.z==16384.0\n? a_pos\n: vec2(edgedistance,z*u_height_factor);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileRatio,pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileRatio,pos);v_lighting=vec4(0.0,0.0,0.0,1.0);float directional=clamp(dot(normal/16383.0,u_lightpos),0.0,1.0);directional=mix((1.0-u_lightintensity),max((0.5+u_lightintensity),1.0),directional);if (normal.y !=0.0) {directional*=((1.0-u_vertical_gradient)+(u_vertical_gradient*clamp((t+base)*pow(height/150.0,0.5),mix(0.7,0.98,1.0-u_lightintensity),1.0)));}v_lighting.rgb+=clamp(directional*u_lightcolor,mix(vec3(0.0),vec3(0.3),1.0-u_lightcolor),vec3(1.0));v_lighting*=u_opacity;}"),si=gi("#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D u_image;varying vec2 v_pos;uniform vec2 u_dimension;uniform float u_zoom;uniform vec4 u_unpack;float getElevation(vec2 coord,float bias) {vec4 data=texture2D(u_image,coord)*255.0;data.a=-1.0;return dot(data,u_unpack)/4.0;}void main() {vec2 epsilon=1.0/u_dimension;float a=getElevation(v_pos+vec2(-epsilon.x,-epsilon.y),0.0);float b=getElevation(v_pos+vec2(0,-epsilon.y),0.0);float c=getElevation(v_pos+vec2(epsilon.x,-epsilon.y),0.0);float d=getElevation(v_pos+vec2(-epsilon.x,0),0.0);float e=getElevation(v_pos,0.0);float f=getElevation(v_pos+vec2(epsilon.x,0),0.0);float g=getElevation(v_pos+vec2(-epsilon.x,epsilon.y),0.0);float h=getElevation(v_pos+vec2(0,epsilon.y),0.0);float i=getElevation(v_pos+vec2(epsilon.x,epsilon.y),0.0);float exaggerationFactor=u_zoom < 2.0 ? 0.4 : u_zoom < 4.5 ? 0.35 : 0.3;float exaggeration=u_zoom < 15.0 ? (u_zoom-15.0)*exaggerationFactor : 0.0;vec2 deriv=vec2((c+f+f+i)-(a+d+d+g),(g+h+h+i)-(a+b+b+c))/pow(2.0,exaggeration+(19.2562-u_zoom));gl_FragColor=clamp(vec4(deriv.x/2.0+0.5,deriv.y/2.0+0.5,1.0,1.0),0.0,1.0);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_dimension;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);highp vec2 epsilon=1.0/u_dimension;float scale=(u_dimension.x-2.0)/u_dimension.x;v_pos=(a_texture_pos/8192.0)*scale+epsilon;}"),li=gi("uniform sampler2D u_image;varying vec2 v_pos;uniform vec2 u_latrange;uniform vec2 u_light;uniform vec4 u_shadow;uniform vec4 u_highlight;uniform vec4 u_accent;\n#define PI 3.141592653589793\nvoid main() {vec4 pixel=texture2D(u_image,v_pos);vec2 deriv=((pixel.rg*2.0)-1.0);float scaleFactor=cos(radians((u_latrange[0]-u_latrange[1])*(1.0-v_pos.y)+u_latrange[1]));float slope=atan(1.25*length(deriv)/scaleFactor);float aspect=deriv.x !=0.0 ? atan(deriv.y,-deriv.x) : PI/2.0*(deriv.y > 0.0 ? 1.0 :-1.0);float intensity=u_light.x;float azimuth=u_light.y+PI;float base=1.875-intensity*1.75;float maxValue=0.5*PI;float scaledSlope=intensity !=0.5 ? ((pow(base,slope)-1.0)/(pow(base,maxValue)-1.0))*maxValue : slope;float accent=cos(scaledSlope);vec4 accent_color=(1.0-accent)*u_accent*clamp(intensity*2.0,0.0,1.0);float shade=abs(mod((aspect+azimuth)/PI+0.5,2.0)-1.0);vec4 shade_color=mix(u_shadow,u_highlight,shade)*sin(scaledSlope)*clamp(intensity*2.0,0.0,1.0);gl_FragColor=accent_color*(1.0-shade_color.a)+shade_color;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos=a_texture_pos/8192.0;}"),ci=gi("uniform lowp float u_device_pixel_ratio;varying vec2 v_width2;varying vec2 v_normal;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define scale 0.015873016\nattribute vec2 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform vec2 u_units_to_pixels;uniform lowp float u_device_pixel_ratio;varying vec2 v_normal;varying vec2 v_width2;varying float v_gamma_scale;varying highp float v_linesofar;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;v_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*2.0;vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_width2=vec2(outset,inset);}"),ui=gi("uniform lowp float u_device_pixel_ratio;uniform sampler2D u_image;varying vec2 v_width2;varying vec2 v_normal;varying float v_gamma_scale;varying highp vec2 v_uv;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);vec4 color=texture2D(u_image,v_uv);gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define scale 0.015873016\nattribute vec2 a_pos_normal;attribute vec4 a_data;attribute float a_uv_x;attribute float a_split_index;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform lowp float u_device_pixel_ratio;uniform vec2 u_units_to_pixels;uniform float u_image_height;varying vec2 v_normal;varying vec2 v_width2;varying float v_gamma_scale;varying highp vec2 v_uv;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;highp float texel_height=1.0/u_image_height;highp float half_texel_height=0.5*texel_height;v_uv=vec2(a_uv_x,a_split_index*texel_height-half_texel_height);vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_width2=vec2(outset,inset);}"),hi=gi("uniform lowp float u_device_pixel_ratio;uniform vec2 u_texsize;uniform float u_fade;uniform mediump vec3 u_scale;uniform sampler2D u_image;varying vec2 v_normal;varying vec2 v_width2;varying float v_linesofar;varying float v_gamma_scale;varying float v_width;\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float tileZoomRatio=u_scale.x;float fromScale=u_scale.y;float toScale=u_scale.z;vec2 display_size_a=(pattern_br_a-pattern_tl_a)/pixel_ratio_from;vec2 display_size_b=(pattern_br_b-pattern_tl_b)/pixel_ratio_to;vec2 pattern_size_a=vec2(display_size_a.x*fromScale/tileZoomRatio,display_size_a.y);vec2 pattern_size_b=vec2(display_size_b.x*toScale/tileZoomRatio,display_size_b.y);float aspect_a=display_size_a.y/v_width;float aspect_b=display_size_b.y/v_width;float dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);float x_a=mod(v_linesofar/pattern_size_a.x*aspect_a,1.0);float x_b=mod(v_linesofar/pattern_size_b.x*aspect_b,1.0);float y=0.5*v_normal.y+0.5;vec2 texel_size=1.0/u_texsize;vec2 pos_a=mix(pattern_tl_a*texel_size-texel_size,pattern_br_a*texel_size+texel_size,vec2(x_a,y));vec2 pos_b=mix(pattern_tl_b*texel_size-texel_size,pattern_br_b*texel_size+texel_size,vec2(x_b,y));vec4 color=mix(texture2D(u_image,pos_a),texture2D(u_image,pos_b),u_fade);gl_FragColor=color*alpha*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define scale 0.015873016\n#define LINE_DISTANCE_SCALE 2.0\nattribute vec2 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform vec2 u_units_to_pixels;uniform mediump float u_ratio;uniform lowp float u_device_pixel_ratio;varying vec2 v_normal;varying vec2 v_width2;varying float v_linesofar;varying float v_gamma_scale;varying float v_width;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize lowp float floorwidth\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;float a_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*LINE_DISTANCE_SCALE;vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_linesofar=a_linesofar;v_width2=vec2(outset,inset);v_width=floorwidth;}"),pi=gi("uniform lowp float u_device_pixel_ratio;uniform sampler2D u_image;uniform float u_sdfgamma;uniform float u_mix;varying vec2 v_normal;varying vec2 v_width2;varying vec2 v_tex_a;varying vec2 v_tex_b;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize lowp float floorwidth\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);float sdfdist_a=texture2D(u_image,v_tex_a).a;float sdfdist_b=texture2D(u_image,v_tex_b).a;float sdfdist=mix(sdfdist_a,sdfdist_b,u_mix);alpha*=smoothstep(0.5-u_sdfgamma/floorwidth,0.5+u_sdfgamma/floorwidth,sdfdist);gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define scale 0.015873016\n#define LINE_DISTANCE_SCALE 2.0\nattribute vec2 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform lowp float u_device_pixel_ratio;uniform vec2 u_patternscale_a;uniform float u_tex_y_a;uniform vec2 u_patternscale_b;uniform float u_tex_y_b;uniform vec2 u_units_to_pixels;varying vec2 v_normal;varying vec2 v_width2;varying vec2 v_tex_a;varying vec2 v_tex_b;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize lowp float floorwidth\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;float a_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*LINE_DISTANCE_SCALE;vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_tex_a=vec2(a_linesofar*u_patternscale_a.x/floorwidth,normal.y*u_patternscale_a.y+u_tex_y_a);v_tex_b=vec2(a_linesofar*u_patternscale_b.x/floorwidth,normal.y*u_patternscale_b.y+u_tex_y_b);v_width2=vec2(outset,inset);}"),di=gi("uniform float u_fade_t;uniform float u_opacity;uniform sampler2D u_image0;uniform sampler2D u_image1;varying vec2 v_pos0;varying vec2 v_pos1;uniform float u_brightness_low;uniform float u_brightness_high;uniform float u_saturation_factor;uniform float u_contrast_factor;uniform vec3 u_spin_weights;void main() {vec4 color0=texture2D(u_image0,v_pos0);vec4 color1=texture2D(u_image1,v_pos1);if (color0.a > 0.0) {color0.rgb=color0.rgb/color0.a;}if (color1.a > 0.0) {color1.rgb=color1.rgb/color1.a;}vec4 color=mix(color0,color1,u_fade_t);color.a*=u_opacity;vec3 rgb=color.rgb;rgb=vec3(dot(rgb,u_spin_weights.xyz),dot(rgb,u_spin_weights.zxy),dot(rgb,u_spin_weights.yzx));float average=(color.r+color.g+color.b)/3.0;rgb+=(average-rgb)*u_saturation_factor;rgb=(rgb-0.5)*u_contrast_factor+0.5;vec3 u_high_vec=vec3(u_brightness_low,u_brightness_low,u_brightness_low);vec3 u_low_vec=vec3(u_brightness_high,u_brightness_high,u_brightness_high);gl_FragColor=vec4(mix(u_high_vec,u_low_vec,rgb)*color.a,color.a);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_tl_parent;uniform float u_scale_parent;uniform float u_buffer_scale;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos0;varying vec2 v_pos1;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos0=(((a_texture_pos/8192.0)-0.5)/u_buffer_scale )+0.5;v_pos1=(v_pos0*u_scale_parent)+u_tl_parent;}"),_i=gi("uniform sampler2D u_texture;varying vec2 v_tex;varying float v_fade_opacity;\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\nlowp float alpha=opacity*v_fade_opacity;gl_FragColor=texture2D(u_texture,v_tex)*alpha;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","const float PI=3.141592653589793;attribute vec4 a_pos_offset;attribute vec4 a_data;attribute vec4 a_pixeloffset;attribute vec3 a_projected_pos;attribute float a_fade_opacity;uniform bool u_is_size_zoom_constant;uniform bool u_is_size_feature_constant;uniform highp float u_size_t;uniform highp float u_size;uniform highp float u_camera_to_center_distance;uniform highp float u_pitch;uniform bool u_rotate_symbol;uniform highp float u_aspect_ratio;uniform float u_fade_change;uniform mat4 u_matrix;uniform mat4 u_label_plane_matrix;uniform mat4 u_coord_matrix;uniform bool u_is_text;uniform bool u_pitch_with_map;uniform vec2 u_texsize;varying vec2 v_tex;varying float v_fade_opacity;\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\nvec2 a_pos=a_pos_offset.xy;vec2 a_offset=a_pos_offset.zw;vec2 a_tex=a_data.xy;vec2 a_size=a_data.zw;float a_size_min=floor(a_size[0]*0.5);vec2 a_pxoffset=a_pixeloffset.xy;vec2 a_minFontScale=a_pixeloffset.zw/256.0;highp float segment_angle=-a_projected_pos[2];float size;if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {size=mix(a_size_min,a_size[1],u_size_t)/128.0;} else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {size=a_size_min/128.0;} else {size=u_size;}vec4 projectedPoint=u_matrix*vec4(a_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float distance_ratio=u_pitch_with_map ?\ncamera_to_anchor_distance/u_camera_to_center_distance :\nu_camera_to_center_distance/camera_to_anchor_distance;highp float perspective_ratio=clamp(0.5+0.5*distance_ratio,0.0,4.0);size*=perspective_ratio;float fontScale=u_is_text ? size/24.0 : size;highp float symbol_rotation=0.0;if (u_rotate_symbol) {vec4 offsetProjectedPoint=u_matrix*vec4(a_pos+vec2(1,0),0,1);vec2 a=projectedPoint.xy/projectedPoint.w;vec2 b=offsetProjectedPoint.xy/offsetProjectedPoint.w;symbol_rotation=atan((b.y-a.y)/u_aspect_ratio,b.x-a.x);}highp float angle_sin=sin(segment_angle+symbol_rotation);highp float angle_cos=cos(segment_angle+symbol_rotation);mat2 rotation_matrix=mat2(angle_cos,-1.0*angle_sin,angle_sin,angle_cos);vec4 projected_pos=u_label_plane_matrix*vec4(a_projected_pos.xy,0.0,1.0);gl_Position=u_coord_matrix*vec4(projected_pos.xy/projected_pos.w+rotation_matrix*(a_offset/32.0*max(a_minFontScale,fontScale)+a_pxoffset/16.0),0.0,1.0);v_tex=a_tex/u_texsize;vec2 fade_opacity=unpack_opacity(a_fade_opacity);float fade_change=fade_opacity[1] > 0.5 ? u_fade_change :-u_fade_change;v_fade_opacity=max(0.0,min(1.0,fade_opacity[0]+fade_change));}"),fi=gi("#define SDF_PX 8.0\nuniform bool u_is_halo;uniform sampler2D u_texture;uniform highp float u_gamma_scale;uniform lowp float u_device_pixel_ratio;uniform bool u_is_text;varying vec2 v_data0;varying vec3 v_data1;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nvoid main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nfloat EDGE_GAMMA=0.105/u_device_pixel_ratio;vec2 tex=v_data0.xy;float gamma_scale=v_data1.x;float size=v_data1.y;float fade_opacity=v_data1[2];float fontScale=u_is_text ? size/24.0 : size;lowp vec4 color=fill_color;highp float gamma=EDGE_GAMMA/(fontScale*u_gamma_scale);lowp float buff=(256.0-64.0)/256.0;if (u_is_halo) {color=halo_color;gamma=(halo_blur*1.19/SDF_PX+EDGE_GAMMA)/(fontScale*u_gamma_scale);buff=(6.0-halo_width/fontScale)/SDF_PX;}lowp float dist=texture2D(u_texture,tex).a;highp float gamma_scaled=gamma*gamma_scale;highp float alpha=smoothstep(buff-gamma_scaled,buff+gamma_scaled,dist);gl_FragColor=color*(alpha*opacity*fade_opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","const float PI=3.141592653589793;attribute vec4 a_pos_offset;attribute vec4 a_data;attribute vec4 a_pixeloffset;attribute vec3 a_projected_pos;attribute float a_fade_opacity;uniform bool u_is_size_zoom_constant;uniform bool u_is_size_feature_constant;uniform highp float u_size_t;uniform highp float u_size;uniform mat4 u_matrix;uniform mat4 u_label_plane_matrix;uniform mat4 u_coord_matrix;uniform bool u_is_text;uniform bool u_pitch_with_map;uniform highp float u_pitch;uniform bool u_rotate_symbol;uniform highp float u_aspect_ratio;uniform highp float u_camera_to_center_distance;uniform float u_fade_change;uniform vec2 u_texsize;varying vec2 v_data0;varying vec3 v_data1;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nvoid main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nvec2 a_pos=a_pos_offset.xy;vec2 a_offset=a_pos_offset.zw;vec2 a_tex=a_data.xy;vec2 a_size=a_data.zw;float a_size_min=floor(a_size[0]*0.5);vec2 a_pxoffset=a_pixeloffset.xy;highp float segment_angle=-a_projected_pos[2];float size;if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {size=mix(a_size_min,a_size[1],u_size_t)/128.0;} else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {size=a_size_min/128.0;} else {size=u_size;}vec4 projectedPoint=u_matrix*vec4(a_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float distance_ratio=u_pitch_with_map ?\ncamera_to_anchor_distance/u_camera_to_center_distance :\nu_camera_to_center_distance/camera_to_anchor_distance;highp float perspective_ratio=clamp(0.5+0.5*distance_ratio,0.0,4.0);size*=perspective_ratio;float fontScale=u_is_text ? size/24.0 : size;highp float symbol_rotation=0.0;if (u_rotate_symbol) {vec4 offsetProjectedPoint=u_matrix*vec4(a_pos+vec2(1,0),0,1);vec2 a=projectedPoint.xy/projectedPoint.w;vec2 b=offsetProjectedPoint.xy/offsetProjectedPoint.w;symbol_rotation=atan((b.y-a.y)/u_aspect_ratio,b.x-a.x);}highp float angle_sin=sin(segment_angle+symbol_rotation);highp float angle_cos=cos(segment_angle+symbol_rotation);mat2 rotation_matrix=mat2(angle_cos,-1.0*angle_sin,angle_sin,angle_cos);vec4 projected_pos=u_label_plane_matrix*vec4(a_projected_pos.xy,0.0,1.0);gl_Position=u_coord_matrix*vec4(projected_pos.xy/projected_pos.w+rotation_matrix*(a_offset/32.0*fontScale+a_pxoffset),0.0,1.0);float gamma_scale=gl_Position.w;vec2 fade_opacity=unpack_opacity(a_fade_opacity);float fade_change=fade_opacity[1] > 0.5 ? u_fade_change :-u_fade_change;float interpolated_fade_opacity=max(0.0,min(1.0,fade_opacity[0]+fade_change));v_data0=a_tex/u_texsize;v_data1=vec3(gamma_scale,size,interpolated_fade_opacity);}"),mi=gi("#define SDF_PX 8.0\n#define SDF 1.0\n#define ICON 0.0\nuniform bool u_is_halo;uniform sampler2D u_texture;uniform sampler2D u_texture_icon;uniform highp float u_gamma_scale;uniform lowp float u_device_pixel_ratio;varying vec4 v_data0;varying vec4 v_data1;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nvoid main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nfloat fade_opacity=v_data1[2];if (v_data1.w==ICON) {vec2 tex_icon=v_data0.zw;lowp float alpha=opacity*fade_opacity;gl_FragColor=texture2D(u_texture_icon,tex_icon)*alpha;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\nreturn;}vec2 tex=v_data0.xy;float EDGE_GAMMA=0.105/u_device_pixel_ratio;float gamma_scale=v_data1.x;float size=v_data1.y;float fontScale=size/24.0;lowp vec4 color=fill_color;highp float gamma=EDGE_GAMMA/(fontScale*u_gamma_scale);lowp float buff=(256.0-64.0)/256.0;if (u_is_halo) {color=halo_color;gamma=(halo_blur*1.19/SDF_PX+EDGE_GAMMA)/(fontScale*u_gamma_scale);buff=(6.0-halo_width/fontScale)/SDF_PX;}lowp float dist=texture2D(u_texture,tex).a;highp float gamma_scaled=gamma*gamma_scale;highp float alpha=smoothstep(buff-gamma_scaled,buff+gamma_scaled,dist);gl_FragColor=color*(alpha*opacity*fade_opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","const float PI=3.141592653589793;attribute vec4 a_pos_offset;attribute vec4 a_data;attribute vec3 a_projected_pos;attribute float a_fade_opacity;uniform bool u_is_size_zoom_constant;uniform bool u_is_size_feature_constant;uniform highp float u_size_t;uniform highp float u_size;uniform mat4 u_matrix;uniform mat4 u_label_plane_matrix;uniform mat4 u_coord_matrix;uniform bool u_is_text;uniform bool u_pitch_with_map;uniform highp float u_pitch;uniform bool u_rotate_symbol;uniform highp float u_aspect_ratio;uniform highp float u_camera_to_center_distance;uniform float u_fade_change;uniform vec2 u_texsize;uniform vec2 u_texsize_icon;varying vec4 v_data0;varying vec4 v_data1;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nvoid main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nvec2 a_pos=a_pos_offset.xy;vec2 a_offset=a_pos_offset.zw;vec2 a_tex=a_data.xy;vec2 a_size=a_data.zw;float a_size_min=floor(a_size[0]*0.5);float is_sdf=a_size[0]-2.0*a_size_min;highp float segment_angle=-a_projected_pos[2];float size;if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {size=mix(a_size_min,a_size[1],u_size_t)/128.0;} else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {size=a_size_min/128.0;} else {size=u_size;}vec4 projectedPoint=u_matrix*vec4(a_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float distance_ratio=u_pitch_with_map ?\ncamera_to_anchor_distance/u_camera_to_center_distance :\nu_camera_to_center_distance/camera_to_anchor_distance;highp float perspective_ratio=clamp(0.5+0.5*distance_ratio,0.0,4.0);size*=perspective_ratio;float fontScale=size/24.0;highp float symbol_rotation=0.0;if (u_rotate_symbol) {vec4 offsetProjectedPoint=u_matrix*vec4(a_pos+vec2(1,0),0,1);vec2 a=projectedPoint.xy/projectedPoint.w;vec2 b=offsetProjectedPoint.xy/offsetProjectedPoint.w;symbol_rotation=atan((b.y-a.y)/u_aspect_ratio,b.x-a.x);}highp float angle_sin=sin(segment_angle+symbol_rotation);highp float angle_cos=cos(segment_angle+symbol_rotation);mat2 rotation_matrix=mat2(angle_cos,-1.0*angle_sin,angle_sin,angle_cos);vec4 projected_pos=u_label_plane_matrix*vec4(a_projected_pos.xy,0.0,1.0);gl_Position=u_coord_matrix*vec4(projected_pos.xy/projected_pos.w+rotation_matrix*(a_offset/32.0*fontScale),0.0,1.0);float gamma_scale=gl_Position.w;vec2 fade_opacity=unpack_opacity(a_fade_opacity);float fade_change=fade_opacity[1] > 0.5 ? u_fade_change :-u_fade_change;float interpolated_fade_opacity=max(0.0,min(1.0,fade_opacity[0]+fade_change));v_data0.xy=a_tex/u_texsize;v_data0.zw=a_tex/u_texsize_icon;v_data1=vec4(gamma_scale,size,interpolated_fade_opacity,is_sdf);}");function gi(t,e){var i=/#pragma mapbox: ([\w]+) ([\w]+) ([\w]+) ([\w]+)/g,o=e.match(/attribute ([\w]+) ([\w]+)/g),r=t.match(/uniform ([\w]+) ([\w]+)([\s]*)([\w]*)/g),a=e.match(/uniform ([\w]+) ([\w]+)([\s]*)([\w]*)/g),n=a?a.concat(r):r,s={};return {fragmentSource:t=t.replace(i,(function(t,e,i,o,r){return s[r]=!0,"define"===e?"\n#ifndef HAS_UNIFORM_u_"+r+"\nvarying "+i+" "+o+" "+r+";\n#else\nuniform "+i+" "+o+" u_"+r+";\n#endif\n":"\n#ifdef HAS_UNIFORM_u_"+r+"\n    "+i+" "+o+" "+r+" = u_"+r+";\n#endif\n"})),vertexSource:e=e.replace(i,(function(t,e,i,o,r){var a="float"===o?"vec2":"vec4",n=r.match(/color/)?"color":a;return s[r]?"define"===e?"\n#ifndef HAS_UNIFORM_u_"+r+"\nuniform lowp float u_"+r+"_t;\nattribute "+i+" "+a+" a_"+r+";\nvarying "+i+" "+o+" "+r+";\n#else\nuniform "+i+" "+o+" u_"+r+";\n#endif\n":"vec4"===n?"\n#ifndef HAS_UNIFORM_u_"+r+"\n    "+r+" = a_"+r+";\n#else\n    "+i+" "+o+" "+r+" = u_"+r+";\n#endif\n":"\n#ifndef HAS_UNIFORM_u_"+r+"\n    "+r+" = unpack_mix_"+n+"(a_"+r+", u_"+r+"_t);\n#else\n    "+i+" "+o+" "+r+" = u_"+r+";\n#endif\n":"define"===e?"\n#ifndef HAS_UNIFORM_u_"+r+"\nuniform lowp float u_"+r+"_t;\nattribute "+i+" "+a+" a_"+r+";\n#else\nuniform "+i+" "+o+" u_"+r+";\n#endif\n":"vec4"===n?"\n#ifndef HAS_UNIFORM_u_"+r+"\n    "+i+" "+o+" "+r+" = a_"+r+";\n#else\n    "+i+" "+o+" "+r+" = u_"+r+";\n#endif\n":"\n#ifndef HAS_UNIFORM_u_"+r+"\n    "+i+" "+o+" "+r+" = unpack_mix_"+n+"(a_"+r+", u_"+r+"_t);\n#else\n    "+i+" "+o+" "+r+" = u_"+r+";\n#endif\n"})),staticAttributes:o,staticUniforms:n}}var vi=Object.freeze({__proto__:null,prelude:Ge,background:We,backgroundPattern:Xe,circle:He,clippingMask:Ke,heatmap:Ye,heatmapTexture:Je,collisionBox:Qe,collisionCircle:$e,debug:ti,fill:ei,fillOutline:ii,fillOutlinePattern:oi,fillPattern:ri,fillExtrusion:ai,fillExtrusionPattern:ni,hillshadePrepare:si,hillshade:li,line:ci,lineGradient:ui,linePattern:hi,lineSDF:pi,raster:di,symbolIcon:_i,symbolSDF:fi,symbolTextAndIcon:mi}),yi=function(){this.boundProgram=null,this.boundLayoutVertexBuffer=null,this.boundPaintVertexBuffers=[],this.boundIndexBuffer=null,this.boundVertexOffset=null,this.boundDynamicVertexBuffer=null,this.vao=null;};function xi(t){for(var e=[],i=0;i<t.length;i++)if(null!==t[i]){var o=t[i].split(" ");e.push(o.pop());}return e}yi.prototype.bind=function(t,e,i,o,r,a,n,s){this.context=t;for(var l=this.boundPaintVertexBuffers.length!==o.length,c=0;!l&&c<o.length;c++)this.boundPaintVertexBuffers[c]!==o[c]&&(l=!0);t.extVertexArrayObject&&this.vao&&this.boundProgram===e&&this.boundLayoutVertexBuffer===i&&!l&&this.boundIndexBuffer===r&&this.boundVertexOffset===a&&this.boundDynamicVertexBuffer===n&&this.boundDynamicVertexBuffer2===s?(t.bindVertexArrayOES.set(this.vao),n&&n.bind(),r&&r.dynamicDraw&&r.bind(),s&&s.bind()):this.freshBind(e,i,o,r,a,n,s);},yi.prototype.freshBind=function(t,e,i,o,r,a,n){var s,l=t.numAttributes,c=this.context,u=c.gl;if(c.extVertexArrayObject)this.vao&&this.destroy(),this.vao=c.extVertexArrayObject.createVertexArrayOES(),c.bindVertexArrayOES.set(this.vao),s=0,this.boundProgram=t,this.boundLayoutVertexBuffer=e,this.boundPaintVertexBuffers=i,this.boundIndexBuffer=o,this.boundVertexOffset=r,this.boundDynamicVertexBuffer=a,this.boundDynamicVertexBuffer2=n;else {s=c.currentNumAttributes||0;for(var h=l;h<s;h++)u.disableVertexAttribArray(h);}e.enableAttributes(u,t);for(var p=0,d=i;p<d.length;p+=1)d[p].enableAttributes(u,t);a&&a.enableAttributes(u,t),n&&n.enableAttributes(u,t),e.bind(),e.setVertexAttribPointers(u,t,r);for(var _=0,f=i;_<f.length;_+=1){var m=f[_];m.bind(),m.setVertexAttribPointers(u,t,r);}a&&(a.bind(),a.setVertexAttribPointers(u,t,r)),o&&o.bind(),n&&(n.bind(),n.setVertexAttribPointers(u,t,r)),c.currentNumAttributes=l;},yi.prototype.destroy=function(){this.vao&&(this.context.extVertexArrayObject.deleteVertexArrayOES(this.vao),this.vao=null);};var bi=function(t,e,i,o,r,a){var n=t.gl;this.program=n.createProgram();for(var s=xi(i.staticAttributes),l=o?o.getBinderAttributes():[],c=s.concat(l),u=i.staticUniforms?xi(i.staticUniforms):[],h=o?o.getBinderUniforms():[],p=[],d=0,_=u.concat(h);d<_.length;d+=1){var f=_[d];p.indexOf(f)<0&&p.push(f);}var m=o?o.defines():[];a&&m.push("#define OVERDRAW_INSPECTOR;");var g=m.concat(Ge.fragmentSource,i.fragmentSource).join("\n"),v=m.concat(Ge.vertexSource,i.vertexSource).join("\n"),y=n.createShader(n.FRAGMENT_SHADER);if(n.isContextLost())this.failedToCreate=!0;else {n.shaderSource(y,g),n.compileShader(y),n.attachShader(this.program,y);var x=n.createShader(n.VERTEX_SHADER);if(n.isContextLost())this.failedToCreate=!0;else {n.shaderSource(x,v),n.compileShader(x),n.attachShader(this.program,x),this.attributes={};var b={};this.numAttributes=c.length;for(var w=0;w<this.numAttributes;w++)c[w]&&(n.bindAttribLocation(this.program,w,c[w]),this.attributes[c[w]]=w);n.linkProgram(this.program),n.deleteShader(x),n.deleteShader(y);for(var T=0;T<p.length;T++){var E=p[T];if(E&&!b[E]){var I=n.getUniformLocation(this.program,E);I&&(b[E]=I);}}this.fixedUniforms=r(t,b),this.binderUniforms=o?o.getUniforms(t,b):[];}}};function wi(t,e,i){var o=1/pe(i,1,e.transform.tileZoom),r=Math.pow(2,i.tileID.overscaledZ),a=i.tileSize*Math.pow(2,e.transform.tileZoom)/r,n=a*(i.tileID.canonical.x+i.tileID.wrap*r),s=a*i.tileID.canonical.y;return {u_image:0,u_texsize:i.imageAtlasTexture.size,u_scale:[o,t.fromScale,t.toScale],u_fade:t.t,u_pixel_coord_upper:[n>>16,s>>16],u_pixel_coord_lower:[65535&n,65535&s]}}bi.prototype.draw=function(t,e,i,o,r,a,n,s,l,c,u,h,p,d,_,f){var m,g=t.gl;if(!this.failedToCreate){for(var v in t.program.set(this.program),t.setDepthMode(i),t.setStencilMode(o),t.setColorMode(r),t.setCullFace(a),this.fixedUniforms)this.fixedUniforms[v].set(n[v]);d&&d.setUniforms(t,this.binderUniforms,h,{zoom:p});for(var y=(m={},m[g.LINES]=2,m[g.TRIANGLES]=3,m[g.LINE_STRIP]=1,m)[e],x=0,b=u.get();x<b.length;x+=1){var w=b[x],T=w.vaos||(w.vaos={});(T[s]||(T[s]=new yi)).bind(t,this,l,d?d.getPaintVertexBuffers():[],c,w.vertexOffset,_,f),g.drawElements(e,w.primitiveLength*y,g.UNSIGNED_SHORT,w.primitiveOffset*y*2);}}};var Ti=function(e,i,o,r){var a=i.style.light,n=a.properties.get("position"),s=[n.x,n.y,n.z],l=t.create$1();"viewport"===a.properties.get("anchor")&&t.fromRotation(l,-i.transform.angle),t.transformMat3(s,s,l);var c=a.properties.get("color");return {u_matrix:e,u_lightpos:s,u_lightintensity:a.properties.get("intensity"),u_lightcolor:[c.r,c.g,c.b],u_vertical_gradient:+o,u_opacity:r}},Ei=function(e,i,o,r,a,n,s){return t.extend(Ti(e,i,o,r),wi(n,i,s),{u_height_factor:-Math.pow(2,a.overscaledZ)/s.tileSize/8})},Ii=function(t){return {u_matrix:t}},Pi=function(e,i,o,r){return t.extend(Ii(e),wi(o,i,r))},Si=function(t,e){return {u_matrix:t,u_world:e}},Ci=function(e,i,o,r,a){return t.extend(Pi(e,i,o,r),{u_world:a})},zi=function(e,i,o,r){var a,n,s=e.transform;if("map"===r.paint.get("circle-pitch-alignment")){var l=pe(o,1,s.zoom);a=!0,n=[l,l];}else a=!1,n=s.pixelsToGLUnits;return {u_camera_to_center_distance:s.cameraToCenterDistance,u_scale_with_map:+("map"===r.paint.get("circle-pitch-scale")),u_matrix:e.translatePosMatrix(i.posMatrix,o,r.paint.get("circle-translate"),r.paint.get("circle-translate-anchor")),u_pitch_with_map:+a,u_device_pixel_ratio:t.browser.devicePixelRatio,u_extrude_scale:n}},Di=function(t,e,i){var o=pe(i,1,e.zoom),r=Math.pow(2,e.zoom-i.tileID.overscaledZ),a=i.tileID.overscaleFactor();return {u_matrix:t,u_camera_to_center_distance:e.cameraToCenterDistance,u_pixels_to_tile_units:o,u_extrude_scale:[e.pixelsToGLUnits[0]/(o*r),e.pixelsToGLUnits[1]/(o*r)],u_overscale_factor:a}},Mi=function(t,e,i){return {u_matrix:t,u_inv_matrix:e,u_camera_to_center_distance:i.cameraToCenterDistance,u_viewport_size:[i.width,i.height]}},Li=function(t,e,i){return void 0===i&&(i=1),{u_matrix:t,u_color:e,u_overlay:0,u_overlay_scale:i}},Ai=function(t){return {u_matrix:t}},Ri=function(t,e,i,o){return {u_matrix:t,u_extrude_scale:pe(e,1,i),u_intensity:o}},ki=function(e,i,o){var r=e.transform;return {u_matrix:Ni(e,i,o),u_ratio:1/pe(i,1,r.zoom),u_device_pixel_ratio:t.browser.devicePixelRatio,u_units_to_pixels:[1/r.pixelsToGLUnits[0],1/r.pixelsToGLUnits[1]]}},Bi=function(e,i,o,r){return t.extend(ki(e,i,o),{u_image:0,u_image_height:r})},Oi=function(e,i,o,r){var a=e.transform,n=Ui(i,a);return {u_matrix:Ni(e,i,o),u_texsize:i.imageAtlasTexture.size,u_ratio:1/pe(i,1,a.zoom),u_device_pixel_ratio:t.browser.devicePixelRatio,u_image:0,u_scale:[n,r.fromScale,r.toScale],u_fade:r.t,u_units_to_pixels:[1/a.pixelsToGLUnits[0],1/a.pixelsToGLUnits[1]]}},Fi=function(e,i,o,r,a){var n=e.lineAtlas,s=Ui(i,e.transform),l="round"===o.layout.get("line-cap"),c=n.getDash(r.from,l),u=n.getDash(r.to,l),h=c.width*a.fromScale,p=u.width*a.toScale;return t.extend(ki(e,i,o),{u_patternscale_a:[s/h,-c.height/2],u_patternscale_b:[s/p,-u.height/2],u_sdfgamma:n.width/(256*Math.min(h,p)*t.browser.devicePixelRatio)/2,u_image:0,u_tex_y_a:c.y,u_tex_y_b:u.y,u_mix:a.t})};function Ui(t,e){return 1/pe(t,1,e.tileZoom)}function Ni(t,e,i){return t.translatePosMatrix(e.tileID.posMatrix,e,i.paint.get("line-translate"),i.paint.get("line-translate-anchor"))}var Zi=function(t,e,i,o,r){return {u_matrix:t,u_tl_parent:e,u_scale_parent:i,u_buffer_scale:1,u_fade_t:o.mix,u_opacity:o.opacity*r.paint.get("raster-opacity"),u_image0:0,u_image1:1,u_brightness_low:r.paint.get("raster-brightness-min"),u_brightness_high:r.paint.get("raster-brightness-max"),u_saturation_factor:(n=r.paint.get("raster-saturation"),n>0?1-1/(1.001-n):-n),u_contrast_factor:(a=r.paint.get("raster-contrast"),a>0?1/(1-a):1+a),u_spin_weights:qi(r.paint.get("raster-hue-rotate"))};var a,n;};function qi(t){t*=Math.PI/180;var e=Math.sin(t),i=Math.cos(t);return [(2*i+1)/3,(-Math.sqrt(3)*e-i+1)/3,(Math.sqrt(3)*e-i+1)/3]}var ji,Vi=function(t,e,i,o,r,a,n,s,l,c){var u=r.transform;return {u_is_size_zoom_constant:+("constant"===t||"source"===t),u_is_size_feature_constant:+("constant"===t||"camera"===t),u_size_t:e?e.uSizeT:0,u_size:e?e.uSize:0,u_camera_to_center_distance:u.cameraToCenterDistance,u_pitch:u.pitch/360*2*Math.PI,u_rotate_symbol:+i,u_aspect_ratio:u.width/u.height,u_fade_change:r.options.fadeDuration?r.symbolFadeChange:1,u_matrix:a,u_label_plane_matrix:n,u_coord_matrix:s,u_is_text:+l,u_pitch_with_map:+o,u_texsize:c,u_texture:0}},Gi=function(e,i,o,r,a,n,s,l,c,u,h){var p=a.transform;return t.extend(Vi(e,i,o,r,a,n,s,l,c,u),{u_gamma_scale:r?Math.cos(p._pitch)*p.cameraToCenterDistance:1,u_device_pixel_ratio:t.browser.devicePixelRatio,u_is_halo:+h})},Wi=function(e,i,o,r,a,n,s,l,c,u){return t.extend(Gi(e,i,o,r,a,n,s,l,!0,c,!0),{u_texsize_icon:u,u_texture_icon:1})},Xi=function(t,e,i){return {u_matrix:t,u_opacity:e,u_color:i}},Hi=function(e,i,o,r,a,n){return t.extend(function(t,e,i,o){var r=i.imageManager.getPattern(t.from.toString()),a=i.imageManager.getPattern(t.to.toString()),n=i.imageManager.getPixelSize(),s=n.width,l=n.height,c=Math.pow(2,o.tileID.overscaledZ),u=o.tileSize*Math.pow(2,i.transform.tileZoom)/c,h=u*(o.tileID.canonical.x+o.tileID.wrap*c),p=u*o.tileID.canonical.y;return {u_image:0,u_pattern_tl_a:r.tl,u_pattern_br_a:r.br,u_pattern_tl_b:a.tl,u_pattern_br_b:a.br,u_texsize:[s,l],u_mix:e.t,u_pattern_size_a:r.displaySize,u_pattern_size_b:a.displaySize,u_scale_a:e.fromScale,u_scale_b:e.toScale,u_tile_units_to_pixels:1/pe(o,1,i.transform.tileZoom),u_pixel_coord_upper:[h>>16,p>>16],u_pixel_coord_lower:[65535&h,65535&p]}}(r,n,o,a),{u_matrix:e,u_opacity:i})},Ki={fillExtrusion:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_lightpos:new t.Uniform3f(e,i.u_lightpos),u_lightintensity:new t.Uniform1f(e,i.u_lightintensity),u_lightcolor:new t.Uniform3f(e,i.u_lightcolor),u_vertical_gradient:new t.Uniform1f(e,i.u_vertical_gradient),u_opacity:new t.Uniform1f(e,i.u_opacity)}},fillExtrusionPattern:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_lightpos:new t.Uniform3f(e,i.u_lightpos),u_lightintensity:new t.Uniform1f(e,i.u_lightintensity),u_lightcolor:new t.Uniform3f(e,i.u_lightcolor),u_vertical_gradient:new t.Uniform1f(e,i.u_vertical_gradient),u_height_factor:new t.Uniform1f(e,i.u_height_factor),u_image:new t.Uniform1i(e,i.u_image),u_texsize:new t.Uniform2f(e,i.u_texsize),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_scale:new t.Uniform3f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade),u_opacity:new t.Uniform1f(e,i.u_opacity)}},fill:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}},fillPattern:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_image:new t.Uniform1i(e,i.u_image),u_texsize:new t.Uniform2f(e,i.u_texsize),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_scale:new t.Uniform3f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade)}},fillOutline:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_world:new t.Uniform2f(e,i.u_world)}},fillOutlinePattern:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_world:new t.Uniform2f(e,i.u_world),u_image:new t.Uniform1i(e,i.u_image),u_texsize:new t.Uniform2f(e,i.u_texsize),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_scale:new t.Uniform3f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade)}},circle:function(e,i){return {u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_scale_with_map:new t.Uniform1i(e,i.u_scale_with_map),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_extrude_scale:new t.Uniform2f(e,i.u_extrude_scale),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}},collisionBox:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pixels_to_tile_units:new t.Uniform1f(e,i.u_pixels_to_tile_units),u_extrude_scale:new t.Uniform2f(e,i.u_extrude_scale),u_overscale_factor:new t.Uniform1f(e,i.u_overscale_factor)}},collisionCircle:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_inv_matrix:new t.UniformMatrix4f(e,i.u_inv_matrix),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_viewport_size:new t.Uniform2f(e,i.u_viewport_size)}},debug:function(e,i){return {u_color:new t.UniformColor(e,i.u_color),u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_overlay:new t.Uniform1i(e,i.u_overlay),u_overlay_scale:new t.Uniform1f(e,i.u_overlay_scale)}},clippingMask:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}},heatmap:function(e,i){return {u_extrude_scale:new t.Uniform1f(e,i.u_extrude_scale),u_intensity:new t.Uniform1f(e,i.u_intensity),u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}},heatmapTexture:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_world:new t.Uniform2f(e,i.u_world),u_image:new t.Uniform1i(e,i.u_image),u_color_ramp:new t.Uniform1i(e,i.u_color_ramp),u_opacity:new t.Uniform1f(e,i.u_opacity)}},hillshade:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_image:new t.Uniform1i(e,i.u_image),u_latrange:new t.Uniform2f(e,i.u_latrange),u_light:new t.Uniform2f(e,i.u_light),u_shadow:new t.UniformColor(e,i.u_shadow),u_highlight:new t.UniformColor(e,i.u_highlight),u_accent:new t.UniformColor(e,i.u_accent)}},hillshadePrepare:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_image:new t.Uniform1i(e,i.u_image),u_dimension:new t.Uniform2f(e,i.u_dimension),u_zoom:new t.Uniform1f(e,i.u_zoom),u_unpack:new t.Uniform4f(e,i.u_unpack)}},line:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_ratio:new t.Uniform1f(e,i.u_ratio),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_units_to_pixels:new t.Uniform2f(e,i.u_units_to_pixels)}},lineGradient:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_ratio:new t.Uniform1f(e,i.u_ratio),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_units_to_pixels:new t.Uniform2f(e,i.u_units_to_pixels),u_image:new t.Uniform1i(e,i.u_image),u_image_height:new t.Uniform1f(e,i.u_image_height)}},linePattern:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_texsize:new t.Uniform2f(e,i.u_texsize),u_ratio:new t.Uniform1f(e,i.u_ratio),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_image:new t.Uniform1i(e,i.u_image),u_units_to_pixels:new t.Uniform2f(e,i.u_units_to_pixels),u_scale:new t.Uniform3f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade)}},lineSDF:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_ratio:new t.Uniform1f(e,i.u_ratio),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_units_to_pixels:new t.Uniform2f(e,i.u_units_to_pixels),u_patternscale_a:new t.Uniform2f(e,i.u_patternscale_a),u_patternscale_b:new t.Uniform2f(e,i.u_patternscale_b),u_sdfgamma:new t.Uniform1f(e,i.u_sdfgamma),u_image:new t.Uniform1i(e,i.u_image),u_tex_y_a:new t.Uniform1f(e,i.u_tex_y_a),u_tex_y_b:new t.Uniform1f(e,i.u_tex_y_b),u_mix:new t.Uniform1f(e,i.u_mix)}},raster:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_tl_parent:new t.Uniform2f(e,i.u_tl_parent),u_scale_parent:new t.Uniform1f(e,i.u_scale_parent),u_buffer_scale:new t.Uniform1f(e,i.u_buffer_scale),u_fade_t:new t.Uniform1f(e,i.u_fade_t),u_opacity:new t.Uniform1f(e,i.u_opacity),u_image0:new t.Uniform1i(e,i.u_image0),u_image1:new t.Uniform1i(e,i.u_image1),u_brightness_low:new t.Uniform1f(e,i.u_brightness_low),u_brightness_high:new t.Uniform1f(e,i.u_brightness_high),u_saturation_factor:new t.Uniform1f(e,i.u_saturation_factor),u_contrast_factor:new t.Uniform1f(e,i.u_contrast_factor),u_spin_weights:new t.Uniform3f(e,i.u_spin_weights)}},symbolIcon:function(e,i){return {u_is_size_zoom_constant:new t.Uniform1i(e,i.u_is_size_zoom_constant),u_is_size_feature_constant:new t.Uniform1i(e,i.u_is_size_feature_constant),u_size_t:new t.Uniform1f(e,i.u_size_t),u_size:new t.Uniform1f(e,i.u_size),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pitch:new t.Uniform1f(e,i.u_pitch),u_rotate_symbol:new t.Uniform1i(e,i.u_rotate_symbol),u_aspect_ratio:new t.Uniform1f(e,i.u_aspect_ratio),u_fade_change:new t.Uniform1f(e,i.u_fade_change),u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_label_plane_matrix:new t.UniformMatrix4f(e,i.u_label_plane_matrix),u_coord_matrix:new t.UniformMatrix4f(e,i.u_coord_matrix),u_is_text:new t.Uniform1i(e,i.u_is_text),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_texsize:new t.Uniform2f(e,i.u_texsize),u_texture:new t.Uniform1i(e,i.u_texture)}},symbolSDF:function(e,i){return {u_is_size_zoom_constant:new t.Uniform1i(e,i.u_is_size_zoom_constant),u_is_size_feature_constant:new t.Uniform1i(e,i.u_is_size_feature_constant),u_size_t:new t.Uniform1f(e,i.u_size_t),u_size:new t.Uniform1f(e,i.u_size),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pitch:new t.Uniform1f(e,i.u_pitch),u_rotate_symbol:new t.Uniform1i(e,i.u_rotate_symbol),u_aspect_ratio:new t.Uniform1f(e,i.u_aspect_ratio),u_fade_change:new t.Uniform1f(e,i.u_fade_change),u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_label_plane_matrix:new t.UniformMatrix4f(e,i.u_label_plane_matrix),u_coord_matrix:new t.UniformMatrix4f(e,i.u_coord_matrix),u_is_text:new t.Uniform1i(e,i.u_is_text),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_texsize:new t.Uniform2f(e,i.u_texsize),u_texture:new t.Uniform1i(e,i.u_texture),u_gamma_scale:new t.Uniform1f(e,i.u_gamma_scale),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_is_halo:new t.Uniform1i(e,i.u_is_halo)}},symbolTextAndIcon:function(e,i){return {u_is_size_zoom_constant:new t.Uniform1i(e,i.u_is_size_zoom_constant),u_is_size_feature_constant:new t.Uniform1i(e,i.u_is_size_feature_constant),u_size_t:new t.Uniform1f(e,i.u_size_t),u_size:new t.Uniform1f(e,i.u_size),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pitch:new t.Uniform1f(e,i.u_pitch),u_rotate_symbol:new t.Uniform1i(e,i.u_rotate_symbol),u_aspect_ratio:new t.Uniform1f(e,i.u_aspect_ratio),u_fade_change:new t.Uniform1f(e,i.u_fade_change),u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_label_plane_matrix:new t.UniformMatrix4f(e,i.u_label_plane_matrix),u_coord_matrix:new t.UniformMatrix4f(e,i.u_coord_matrix),u_is_text:new t.Uniform1i(e,i.u_is_text),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_texsize:new t.Uniform2f(e,i.u_texsize),u_texsize_icon:new t.Uniform2f(e,i.u_texsize_icon),u_texture:new t.Uniform1i(e,i.u_texture),u_texture_icon:new t.Uniform1i(e,i.u_texture_icon),u_gamma_scale:new t.Uniform1f(e,i.u_gamma_scale),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_is_halo:new t.Uniform1i(e,i.u_is_halo)}},background:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_opacity:new t.Uniform1f(e,i.u_opacity),u_color:new t.UniformColor(e,i.u_color)}},backgroundPattern:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_opacity:new t.Uniform1f(e,i.u_opacity),u_image:new t.Uniform1i(e,i.u_image),u_pattern_tl_a:new t.Uniform2f(e,i.u_pattern_tl_a),u_pattern_br_a:new t.Uniform2f(e,i.u_pattern_br_a),u_pattern_tl_b:new t.Uniform2f(e,i.u_pattern_tl_b),u_pattern_br_b:new t.Uniform2f(e,i.u_pattern_br_b),u_texsize:new t.Uniform2f(e,i.u_texsize),u_mix:new t.Uniform1f(e,i.u_mix),u_pattern_size_a:new t.Uniform2f(e,i.u_pattern_size_a),u_pattern_size_b:new t.Uniform2f(e,i.u_pattern_size_b),u_scale_a:new t.Uniform1f(e,i.u_scale_a),u_scale_b:new t.Uniform1f(e,i.u_scale_b),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_tile_units_to_pixels:new t.Uniform1f(e,i.u_tile_units_to_pixels)}}};function Yi(e,i,o,r,a,n,s){for(var l=e.context,c=l.gl,u=e.useProgram("collisionBox"),h=[],p=0,d=0,_=0;_<r.length;_++){var f=r[_],m=i.getTile(f),g=m.getBucket(o);if(g){var v=f.posMatrix;0===a[0]&&0===a[1]||(v=e.translatePosMatrix(f.posMatrix,m,a,n));var y=s?g.textCollisionBox:g.iconCollisionBox,x=g.collisionCircleArray;if(x.length>0){var b=t.create(),w=v;t.mul(b,g.placementInvProjMatrix,e.transform.glCoordMatrix),t.mul(b,b,g.placementViewportMatrix),h.push({circleArray:x,circleOffset:d,transform:w,invTransform:b}),d=p+=x.length/4;}y&&u.draw(l,c.LINES,It.disabled,Pt.disabled,e.colorModeForRenderPass(),Ct.disabled,Di(v,e.transform,m),o.id,y.layoutVertexBuffer,y.indexBuffer,y.segments,null,e.transform.zoom,null,null,y.collisionVertexBuffer);}}if(s&&h.length){var T=e.useProgram("collisionCircle"),E=new t.StructArrayLayout2f1f2i16;E.resize(4*p),E._trim();for(var I=0,P=0,S=h;P<S.length;P+=1)for(var C=S[P],z=0;z<C.circleArray.length/4;z++){var D=4*z,M=C.circleArray[D+0],L=C.circleArray[D+1],A=C.circleArray[D+2],R=C.circleArray[D+3];E.emplace(I++,M,L,A,R,0),E.emplace(I++,M,L,A,R,1),E.emplace(I++,M,L,A,R,2),E.emplace(I++,M,L,A,R,3);}(!ji||ji.length<2*p)&&(ji=function(e){var i=2*e,o=new t.StructArrayLayout3ui6;o.resize(i),o._trim();for(var r=0;r<i;r++){var a=6*r;o.uint16[a+0]=4*r+0,o.uint16[a+1]=4*r+1,o.uint16[a+2]=4*r+2,o.uint16[a+3]=4*r+2,o.uint16[a+4]=4*r+3,o.uint16[a+5]=4*r+0;}return o}(p));for(var k=l.createIndexBuffer(ji,!0),B=l.createVertexBuffer(E,t.collisionCircleLayout.members,!0),O=0,F=h;O<F.length;O+=1){var U=F[O],N=Mi(U.transform,U.invTransform,e.transform);T.draw(l,c.TRIANGLES,It.disabled,Pt.disabled,e.colorModeForRenderPass(),Ct.disabled,N,o.id,B,k,t.SegmentVector.simpleSegment(0,2*U.circleOffset,U.circleArray.length,U.circleArray.length/2),null,e.transform.zoom,null,null,null);}B.destroy(),k.destroy();}}var Ji=t.identity(new Float32Array(16));function Qi(e,i,o,r,a,n){var s=t.getAnchorAlignment(e),l=-(s.horizontalAlign-.5)*i,c=-(s.verticalAlign-.5)*o,u=t.evaluateVariableOffset(e,r);return new t.Point((l/a+u[0])*n,(c/a+u[1])*n)}function $i(e,i,o,r,a,n,s,l,c,u,h){var p=e.text.placedSymbolArray,d=e.text.dynamicLayoutVertexArray,_=e.icon.dynamicLayoutVertexArray,f={};d.clear();for(var m=0;m<p.length;m++){var g=p.get(m),v=g.hidden||!g.crossTileID||e.allowVerticalPlacement&&!g.placedOrientation?null:r[g.crossTileID];if(v){var y=new t.Point(g.anchorX,g.anchorY),x=$t(y,o?l:s),b=te(n.cameraToCenterDistance,x.signedDistanceFromCamera),w=a.evaluateSizeForFeature(e.textSizeData,u,g)*b/t.ONE_EM;o&&(w*=e.tilePixelRatio/c);for(var T=Qi(v.anchor,v.width,v.height,v.textOffset,v.textBoxScale,w),E=o?$t(y.add(T),s).point:x.point.add(i?T.rotate(-n.angle):T),I=e.allowVerticalPlacement&&g.placedOrientation===t.WritingMode.vertical?Math.PI/2:0,P=0;P<g.numGlyphs;P++)t.addDynamicAttributes(d,E,I);h&&g.associatedIconIndex>=0&&(f[g.associatedIconIndex]={shiftedAnchor:E,angle:I});}else ce(g.numGlyphs,d);}if(h){_.clear();for(var S=e.icon.placedSymbolArray,C=0;C<S.length;C++){var z=S.get(C);if(z.hidden)ce(z.numGlyphs,_);else {var D=f[C];if(D)for(var M=0;M<z.numGlyphs;M++)t.addDynamicAttributes(_,D.shiftedAnchor,D.angle);else ce(z.numGlyphs,_);}}e.icon.dynamicLayoutVertexBuffer.updateData(_);}e.text.dynamicLayoutVertexBuffer.updateData(d);}function to(t,e,i){return i.iconsInText&&e?"symbolTextAndIcon":t?"symbolSDF":"symbolIcon"}function eo(e,i,o,r,a,n,s,l,c,u,h,p){for(var d=e.context,_=d.gl,f=e.transform,m="map"===l,g="map"===c,v=m&&"point"!==o.layout.get("symbol-placement"),y=m&&!g&&!v,x=void 0!==o.layout.get("symbol-sort-key").constantOr(1),b=e.depthModeForSublayer(0,It.ReadOnly),w=o.layout.get("text-variable-anchor"),T=[],E=0,I=r;E<I.length;E+=1){var P=I[E],S=i.getTile(P),C=S.getBucket(o);if(C){var z=a?C.text:C.icon;if(z&&z.segments.get().length){var D=z.programConfigurations.get(o.id),M=a||C.sdfIcons,L=a?C.textSizeData:C.iconSizeData,A=g||0!==f.pitch,R=e.useProgram(to(M,a,C),D),k=t.evaluateSizeForZoom(L,f.zoom),B=void 0,O=[0,0],F=void 0,U=void 0,N=null,Z=void 0;if(a)F=S.glyphAtlasTexture,U=_.LINEAR,B=S.glyphAtlasTexture.size,C.iconsInText&&(O=S.imageAtlasTexture.size,N=S.imageAtlasTexture,Z=A||e.options.rotating||e.options.zooming||"composite"===L.kind||"camera"===L.kind?_.LINEAR:_.NEAREST);else {var q=1!==o.layout.get("icon-size").constantOr(0)||C.iconsNeedLinear;F=S.imageAtlasTexture,U=M||e.options.rotating||e.options.zooming||q||A?_.LINEAR:_.NEAREST,B=S.imageAtlasTexture.size;}var j=pe(S,1,e.transform.zoom),V=Jt(P.posMatrix,g,m,e.transform,j),G=Qt(P.posMatrix,g,m,e.transform,j),W=w&&C.hasTextData(),X="none"!==o.layout.get("icon-text-fit")&&W&&C.hasIconData();v&&ie(C,P.posMatrix,e,a,V,G,g,u);var H=e.translatePosMatrix(P.posMatrix,S,n,s),K=v||a&&w||X?Ji:V,Y=e.translatePosMatrix(G,S,n,s,!0),J=M&&0!==o.paint.get(a?"text-halo-width":"icon-halo-width").constantOr(1),Q={program:R,buffers:z,uniformValues:M?C.iconsInText?Wi(L.kind,k,y,g,e,H,K,Y,B,O):Gi(L.kind,k,y,g,e,H,K,Y,a,B,!0):Vi(L.kind,k,y,g,e,H,K,Y,a,B),atlasTexture:F,atlasTextureIcon:N,atlasInterpolation:U,atlasInterpolationIcon:Z,isSDF:M,hasHalo:J};if(x)for(var $=0,tt=z.segments.get();$<tt.length;$+=1){var et=tt[$];T.push({segments:new t.SegmentVector([et]),sortKey:et.sortKey,state:Q});}else T.push({segments:z.segments,sortKey:0,state:Q});}}}x&&T.sort((function(t,e){return t.sortKey-e.sortKey}));for(var it=0,ot=T;it<ot.length;it+=1){var rt=ot[it],at=rt.state;if(d.activeTexture.set(_.TEXTURE0),at.atlasTexture.bind(at.atlasInterpolation,_.CLAMP_TO_EDGE),at.atlasTextureIcon&&(d.activeTexture.set(_.TEXTURE1),at.atlasTextureIcon&&at.atlasTextureIcon.bind(at.atlasInterpolationIcon,_.CLAMP_TO_EDGE)),at.isSDF){var nt=at.uniformValues;at.hasHalo&&(nt.u_is_halo=1,io(at.buffers,rt.segments,o,e,at.program,b,h,p,nt)),nt.u_is_halo=0;}io(at.buffers,rt.segments,o,e,at.program,b,h,p,at.uniformValues);}}function io(t,e,i,o,r,a,n,s,l){var c=o.context;r.draw(c,c.gl.TRIANGLES,a,n,s,Ct.disabled,l,i.id,t.layoutVertexBuffer,t.indexBuffer,e,i.paint,o.transform.zoom,t.programConfigurations.get(i.id),t.dynamicLayoutVertexBuffer,t.opacityVertexBuffer);}function oo(t,e,i,o,r,a,n){var s,l,c,u,h,p=t.context.gl,d=i.paint.get("fill-pattern"),_=d&&d.constantOr(1),f=i.getCrossfadeParameters();n?(l=_&&!i.getPaintProperty("fill-outline-color")?"fillOutlinePattern":"fillOutline",s=p.LINES):(l=_?"fillPattern":"fill",s=p.TRIANGLES);for(var m=0,g=o;m<g.length;m+=1){var v=g[m],y=e.getTile(v);if(!_||y.patternsLoaded()){var x=y.getBucket(i);if(x){var b=x.programConfigurations.get(i.id),w=t.useProgram(l,b);_&&(t.context.activeTexture.set(p.TEXTURE0),y.imageAtlasTexture.bind(p.LINEAR,p.CLAMP_TO_EDGE),b.updatePaintBuffers(f));var T=d.constantOr(null);if(T&&y.imageAtlas){var E=y.imageAtlas,I=E.patternPositions[T.to.toString()],P=E.patternPositions[T.from.toString()];I&&P&&b.setConstantPatternPositions(I,P);}var S=t.translatePosMatrix(v.posMatrix,y,i.paint.get("fill-translate"),i.paint.get("fill-translate-anchor"));if(n){u=x.indexBuffer2,h=x.segments2;var C=[p.drawingBufferWidth,p.drawingBufferHeight];c="fillOutlinePattern"===l&&_?Ci(S,t,f,y,C):Si(S,C);}else u=x.indexBuffer,h=x.segments,c=_?Pi(S,t,f,y):Ii(S);w.draw(t.context,s,r,t.stencilModeForClipping(v),a,Ct.disabled,c,i.id,x.layoutVertexBuffer,u,h,i.paint,t.transform.zoom,b);}}}}function ro(t,e,i,o,r,a,n){for(var s=t.context,l=s.gl,c=i.paint.get("fill-extrusion-pattern"),u=c.constantOr(1),h=i.getCrossfadeParameters(),p=i.paint.get("fill-extrusion-opacity"),d=0,_=o;d<_.length;d+=1){var f=_[d],m=e.getTile(f),g=m.getBucket(i);if(g){var v=g.programConfigurations.get(i.id),y=t.useProgram(u?"fillExtrusionPattern":"fillExtrusion",v);u&&(t.context.activeTexture.set(l.TEXTURE0),m.imageAtlasTexture.bind(l.LINEAR,l.CLAMP_TO_EDGE),v.updatePaintBuffers(h));var x=c.constantOr(null);if(x&&m.imageAtlas){var b=m.imageAtlas,w=b.patternPositions[x.to.toString()],T=b.patternPositions[x.from.toString()];w&&T&&v.setConstantPatternPositions(w,T);}var E=t.translatePosMatrix(f.posMatrix,m,i.paint.get("fill-extrusion-translate"),i.paint.get("fill-extrusion-translate-anchor")),I=i.paint.get("fill-extrusion-vertical-gradient"),P=u?Ei(E,t,I,p,f,h,m):Ti(E,t,I,p);y.draw(s,s.gl.TRIANGLES,r,a,n,Ct.backCCW,P,i.id,g.layoutVertexBuffer,g.indexBuffer,g.segments,i.paint,t.transform.zoom,v);}}}function ao(e,i,o,r,a,n){var s=e.context,l=s.gl,c=i.fbo;if(c){var u=e.useProgram("hillshade");s.activeTexture.set(l.TEXTURE0),l.bindTexture(l.TEXTURE_2D,c.colorAttachment.get());var h=function(e,i,o){var r=o.paint.get("hillshade-shadow-color"),a=o.paint.get("hillshade-highlight-color"),n=o.paint.get("hillshade-accent-color"),s=o.paint.get("hillshade-illumination-direction")*(Math.PI/180);"viewport"===o.paint.get("hillshade-illumination-anchor")&&(s-=e.transform.angle);var l,c,u,h=!e.options.moving;return {u_matrix:e.transform.calculatePosMatrix(i.tileID.toUnwrapped(),h),u_image:0,u_latrange:(l=i.tileID,c=Math.pow(2,l.canonical.z),u=l.canonical.y,[new t.MercatorCoordinate(0,u/c).toLngLat().lat,new t.MercatorCoordinate(0,(u+1)/c).toLngLat().lat]),u_light:[o.paint.get("hillshade-exaggeration"),s],u_shadow:r,u_highlight:a,u_accent:n}}(e,i,o);u.draw(s,l.TRIANGLES,r,a,n,Ct.disabled,h,o.id,e.rasterBoundsBuffer,e.quadTriangleIndexBuffer,e.rasterBoundsSegments);}}function no(e,i,o,r,a,n){var s=e.context,l=s.gl,c=i.dem;if(c&&c.data){var u=c.dim,h=c.stride,p=c.getPixels();if(s.activeTexture.set(l.TEXTURE1),s.pixelStoreUnpackPremultiplyAlpha.set(!1),i.demTexture=i.demTexture||e.getTileTexture(h),i.demTexture){var d=i.demTexture;d.update(p,{premultiply:!1}),d.bind(l.NEAREST,l.CLAMP_TO_EDGE);}else i.demTexture=new t.Texture(s,p,l.RGBA,{premultiply:!1}),i.demTexture.bind(l.NEAREST,l.CLAMP_TO_EDGE);s.activeTexture.set(l.TEXTURE0);var _=i.fbo;if(!_){var f=new t.Texture(s,{width:u,height:u,data:null},l.RGBA);f.bind(l.LINEAR,l.CLAMP_TO_EDGE),(_=i.fbo=s.createFramebuffer(u,u,!0)).colorAttachment.set(f.texture);}s.bindFramebuffer.set(_.framebuffer),s.viewport.set([0,0,u,u]),e.useProgram("hillshadePrepare").draw(s,l.TRIANGLES,r,a,n,Ct.disabled,function(e,i){var o=i.stride,r=t.create();return t.ortho(r,0,t.EXTENT,-t.EXTENT,0,0,1),t.translate(r,r,[0,-t.EXTENT,0]),{u_matrix:r,u_image:1,u_dimension:[o,o],u_zoom:e.overscaledZ,u_unpack:i.getUnpackVector()}}(i.tileID,c),o.id,e.rasterBoundsBuffer,e.quadTriangleIndexBuffer,e.rasterBoundsSegments),i.needsHillshadePrepare=!1;}}function so(e,i,o,r,a){var n=r.paint.get("raster-fade-duration");if(n>0){var s=t.browser.now(),l=(s-e.timeAdded)/n,c=i?(s-i.timeAdded)/n:-1,u=o.getSource(),h=a.coveringZoomLevel({tileSize:u.tileSize,roundZoom:u.roundZoom}),p=!i||Math.abs(i.tileID.overscaledZ-h)>Math.abs(e.tileID.overscaledZ-h),d=p&&e.refreshedUponExpiration?1:t.clamp(p?l:1-c,0,1);return e.refreshedUponExpiration&&l>=1&&(e.refreshedUponExpiration=!1),i?{opacity:1,mix:1-d}:{opacity:d,mix:0}}return {opacity:1,mix:0}}var lo=new t.Color(1,0,0,1),co=new t.Color(0,1,0,1),uo=new t.Color(0,0,1,1),ho=new t.Color(1,0,1,1),po=new t.Color(0,1,1,1);function _o(t,e,i,o){mo(t,0,e+i/2,t.transform.width,i,o);}function fo(t,e,i,o){mo(t,e-i/2,0,i,t.transform.height,o);}function mo(e,i,o,r,a,n){var s=e.context,l=s.gl;l.enable(l.SCISSOR_TEST),l.scissor(i*t.browser.devicePixelRatio,o*t.browser.devicePixelRatio,r*t.browser.devicePixelRatio,a*t.browser.devicePixelRatio),s.clear({color:n}),l.disable(l.SCISSOR_TEST);}function go(e,i,o){var r=e.context,a=r.gl,n=o.posMatrix,s=e.useProgram("debug"),l=It.disabled,c=Pt.disabled,u=e.colorModeForRenderPass();r.activeTexture.set(a.TEXTURE0),e.emptyTexture.bind(a.LINEAR,a.CLAMP_TO_EDGE),s.draw(r,a.LINE_STRIP,l,c,u,Ct.disabled,Li(n,t.Color.red),"$debug",e.debugBuffer,e.tileBorderIndexBuffer,e.debugSegments);var h=i.getTileByID(o.key).latestRawTileData,p=Math.floor((h&&h.byteLength||0)/1024),d=i.getTile(o).tileSize,_=512/Math.min(d,512)*(o.overscaledZ/e.transform.zoom)*.5,f=o.canonical.toString();o.overscaledZ!==o.canonical.z&&(f+=" => "+o.overscaledZ),function(t,e){t.initDebugOverlayCanvas();var i=t.debugOverlayCanvas,o=t.context.gl,r=t.debugOverlayCanvas.getContext("2d");r.clearRect(0,0,i.width,i.height),r.shadowColor="white",r.shadowBlur=2,r.lineWidth=1.5,r.strokeStyle="white",r.textBaseline="top",r.font="bold 36px Open Sans, sans-serif",r.fillText(e,5,5),r.strokeText(e,5,5),t.debugOverlayTexture.update(i),t.debugOverlayTexture.bind(o.LINEAR,o.CLAMP_TO_EDGE);}(e,f+" "+p+"kb"),s.draw(r,a.TRIANGLES,l,c,St.alphaBlended,Ct.disabled,Li(n,t.Color.transparent,_),"$debug",e.debugBuffer,e.quadTriangleIndexBuffer,e.debugSegments);}var vo={symbol:function(e,i,o,r,a){if("translucent"===e.renderPass){var n=Pt.disabled,s=e.colorModeForRenderPass();o.layout.get("text-variable-anchor")&&function(e,i,o,r,a,n,s){for(var l=i.transform,c="map"===a,u="map"===n,h=0,p=e;h<p.length;h+=1){var d=p[h],_=r.getTile(d),f=_.getBucket(o);if(f&&f.text&&f.text.segments.get().length){var m=t.evaluateSizeForZoom(f.textSizeData,l.zoom),g=pe(_,1,i.transform.zoom),v=Jt(d.posMatrix,u,c,i.transform,g),y="none"!==o.layout.get("icon-text-fit")&&f.hasIconData();if(m){var x=Math.pow(2,l.zoom-_.tileID.overscaledZ);$i(f,c,u,s,t.symbolSize,l,v,d.posMatrix,x,m,y);}}}}(r,e,o,i,o.layout.get("text-rotation-alignment"),o.layout.get("text-pitch-alignment"),a),0!==o.paint.get("icon-opacity").constantOr(1)&&eo(e,i,o,r,!1,o.paint.get("icon-translate"),o.paint.get("icon-translate-anchor"),o.layout.get("icon-rotation-alignment"),o.layout.get("icon-pitch-alignment"),o.layout.get("icon-keep-upright"),n,s),0!==o.paint.get("text-opacity").constantOr(1)&&eo(e,i,o,r,!0,o.paint.get("text-translate"),o.paint.get("text-translate-anchor"),o.layout.get("text-rotation-alignment"),o.layout.get("text-pitch-alignment"),o.layout.get("text-keep-upright"),n,s),i.map.showCollisionBoxes&&(Yi(e,i,o,r,o.paint.get("text-translate"),o.paint.get("text-translate-anchor"),!0),Yi(e,i,o,r,o.paint.get("icon-translate"),o.paint.get("icon-translate-anchor"),!1));}},circle:function(e,i,o,r){if("translucent"===e.renderPass){var a=o.paint.get("circle-opacity"),n=o.paint.get("circle-stroke-width"),s=o.paint.get("circle-stroke-opacity"),l=void 0!==o.layout.get("circle-sort-key").constantOr(1);if(0!==a.constantOr(1)||0!==n.constantOr(1)&&0!==s.constantOr(1)){for(var c=e.context,u=c.gl,h=e.depthModeForSublayer(0,It.ReadOnly),p=Pt.disabled,d=e.colorModeForRenderPass(),_=[],f=0;f<r.length;f++){var m=r[f],g=i.getTile(m),v=g.getBucket(o);if(v){var y=v.programConfigurations.get(o.id),x={programConfiguration:y,program:e.useProgram("circle",y),layoutVertexBuffer:v.layoutVertexBuffer,indexBuffer:v.indexBuffer,uniformValues:zi(e,m,g,o)};if(l)for(var b=0,w=v.segments.get();b<w.length;b+=1){var T=w[b];_.push({segments:new t.SegmentVector([T]),sortKey:T.sortKey,state:x});}else _.push({segments:v.segments,sortKey:0,state:x});}}l&&_.sort((function(t,e){return t.sortKey-e.sortKey}));for(var E=0,I=_;E<I.length;E+=1){var P=I[E],S=P.state;S.program.draw(c,u.TRIANGLES,h,p,d,Ct.disabled,S.uniformValues,o.id,S.layoutVertexBuffer,S.indexBuffer,P.segments,o.paint,e.transform.zoom,S.programConfiguration);}}}},heatmap:function(e,i,o,r){if(0!==o.paint.get("heatmap-opacity"))if("offscreen"===e.renderPass){var a=e.context,n=a.gl,s=Pt.disabled,l=new St([n.ONE,n.ONE],t.Color.transparent,[!0,!0,!0,!0]);!function(t,e,i){var o=t.gl;t.activeTexture.set(o.TEXTURE1),t.viewport.set([0,0,e.width/4,e.height/4]);var r=i.heatmapFbo;if(r)o.bindTexture(o.TEXTURE_2D,r.colorAttachment.get()),t.bindFramebuffer.set(r.framebuffer);else {var a=o.createTexture();o.bindTexture(o.TEXTURE_2D,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),r=i.heatmapFbo=t.createFramebuffer(e.width/4,e.height/4,!1),function(t,e,i,o){var r=t.gl;r.texImage2D(r.TEXTURE_2D,0,r.RGBA,e.width/4,e.height/4,0,r.RGBA,t.extRenderToTextureHalfFloat?t.extTextureHalfFloat.HALF_FLOAT_OES:r.UNSIGNED_BYTE,null),o.colorAttachment.set(i);}(t,e,a,r);}}(a,e,o),a.clear({color:t.Color.transparent});for(var c=0;c<r.length;c++){var u=r[c];if(!i.hasRenderableParent(u)){var h=i.getTile(u),p=h.getBucket(o);if(p){var d=p.programConfigurations.get(o.id);e.useProgram("heatmap",d).draw(a,n.TRIANGLES,It.disabled,s,l,Ct.disabled,Ri(u.posMatrix,h,e.transform.zoom,o.paint.get("heatmap-intensity")),o.id,p.layoutVertexBuffer,p.indexBuffer,p.segments,o.paint,e.transform.zoom,d);}}}a.viewport.set([0,0,e.width,e.height]);}else "translucent"===e.renderPass&&(e.context.setColorMode(e.colorModeForRenderPass()),function(e,i){var o=e.context,r=o.gl,a=i.heatmapFbo;if(a){o.activeTexture.set(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,a.colorAttachment.get()),o.activeTexture.set(r.TEXTURE1);var n=i.colorRampTexture;n||(n=i.colorRampTexture=new t.Texture(o,i.colorRamp,r.RGBA)),n.bind(r.LINEAR,r.CLAMP_TO_EDGE),e.useProgram("heatmapTexture").draw(o,r.TRIANGLES,It.disabled,Pt.disabled,e.colorModeForRenderPass(),Ct.disabled,function(e,i,o,r){var a=t.create();t.ortho(a,0,e.width,e.height,0,0,1);var n=e.context.gl;return {u_matrix:a,u_world:[n.drawingBufferWidth,n.drawingBufferHeight],u_image:0,u_color_ramp:1,u_opacity:i.paint.get("heatmap-opacity")}}(e,i),i.id,e.viewportBuffer,e.quadTriangleIndexBuffer,e.viewportSegments,i.paint,e.transform.zoom);}}(e,o));},line:function(e,i,o,r){if("translucent"===e.renderPass){var a=o.paint.get("line-opacity"),n=o.paint.get("line-width");if(0!==a.constantOr(1)&&0!==n.constantOr(1))for(var s=e.depthModeForSublayer(0,It.ReadOnly),l=e.colorModeForRenderPass(),c=o.paint.get("line-dasharray"),u=o.paint.get("line-pattern"),h=u.constantOr(1),p=o.paint.get("line-gradient"),d=o.getCrossfadeParameters(),_=h?"linePattern":c?"lineSDF":p?"lineGradient":"line",f=e.context,m=f.gl,g=!0,v=0,y=r;v<y.length;v+=1){var x=y[v],b=i.getTile(x);if(!h||b.patternsLoaded()){var w=b.getBucket(o);if(w){var T=w.programConfigurations.get(o.id),E=e.context.program.get(),I=e.useProgram(_,T),P=g||I.program!==E,S=u.constantOr(null);if(S&&b.imageAtlas){var C=b.imageAtlas,z=C.patternPositions[S.to.toString()],D=C.patternPositions[S.from.toString()];z&&D&&T.setConstantPatternPositions(z,D);}var M=h?Oi(e,b,o,d):c?Fi(e,b,o,c,d):p?Bi(e,b,o,w.lineClipsArray.length):ki(e,b,o);if(h)f.activeTexture.set(m.TEXTURE0),b.imageAtlasTexture.bind(m.LINEAR,m.CLAMP_TO_EDGE),T.updatePaintBuffers(d);else if(c&&(P||e.lineAtlas.dirty))f.activeTexture.set(m.TEXTURE0),e.lineAtlas.bind(f);else if(p){var L=w.gradients[o.id],A=L.texture;if(o.gradientVersion!==L.version){var R=256;if(o.stepInterpolant){var k=i.getSource().maxzoom,B=x.canonical.z===k?Math.ceil(1<<e.transform.maxZoom-x.canonical.z):1;R=t.clamp(t.nextPowerOfTwo(w.maxLineLength/t.EXTENT*1024*B),256,f.maxTextureSize);}L.gradient=t.renderColorRamp({expression:o.gradientExpression(),evaluationKey:"lineProgress",resolution:R,image:L.gradient||void 0,clips:w.lineClipsArray}),L.texture?L.texture.update(L.gradient):L.texture=new t.Texture(f,L.gradient,m.RGBA),L.version=o.gradientVersion,A=L.texture;}f.activeTexture.set(m.TEXTURE0),A.bind(o.stepInterpolant?m.NEAREST:m.LINEAR,m.CLAMP_TO_EDGE);}I.draw(f,m.TRIANGLES,s,e.stencilModeForClipping(x),l,Ct.disabled,M,o.id,w.layoutVertexBuffer,w.indexBuffer,w.segments,o.paint,e.transform.zoom,T,w.layoutVertexBuffer2),g=!1;}}}}},fill:function(e,i,o,r){var a=o.paint.get("fill-color"),n=o.paint.get("fill-opacity");if(0!==n.constantOr(1)){var s=e.colorModeForRenderPass(),l=o.paint.get("fill-pattern"),c=e.opaquePassEnabledForLayer()&&!l.constantOr(1)&&1===a.constantOr(t.Color.transparent).a&&1===n.constantOr(0)?"opaque":"translucent";if(e.renderPass===c){var u=e.depthModeForSublayer(1,"opaque"===e.renderPass?It.ReadWrite:It.ReadOnly);oo(e,i,o,r,u,s,!1);}if("translucent"===e.renderPass&&o.paint.get("fill-antialias")){var h=e.depthModeForSublayer(o.getPaintProperty("fill-outline-color")?2:0,It.ReadOnly);oo(e,i,o,r,h,s,!0);}}},"fill-extrusion":function(t,e,i,o){var r=i.paint.get("fill-extrusion-opacity");if(0!==r&&"translucent"===t.renderPass){var a=new It(t.context.gl.LEQUAL,It.ReadWrite,t.depthRangeFor3D);if(1!==r||i.paint.get("fill-extrusion-pattern").constantOr(1))ro(t,e,i,o,a,Pt.disabled,St.disabled),ro(t,e,i,o,a,t.stencilModeFor3D(),t.colorModeForRenderPass());else {var n=t.colorModeForRenderPass();ro(t,e,i,o,a,Pt.disabled,n);}}},hillshade:function(t,e,i,o){if("offscreen"===t.renderPass||"translucent"===t.renderPass){for(var r=t.context,a=t.depthModeForSublayer(0,It.ReadOnly),n=t.colorModeForRenderPass(),s="translucent"===t.renderPass?t.stencilConfigForOverlap(o):[{},o],l=s[0],c=0,u=s[1];c<u.length;c+=1){var h=u[c],p=e.getTile(h);p.needsHillshadePrepare&&"offscreen"===t.renderPass?no(t,p,i,a,Pt.disabled,n):"translucent"===t.renderPass&&ao(t,p,i,a,l[h.overscaledZ],n);}r.viewport.set([0,0,t.width,t.height]);}},raster:function(t,e,i,o){if("translucent"===t.renderPass&&0!==i.paint.get("raster-opacity")&&o.length)for(var r=t.context,a=r.gl,n=e.getSource(),s=t.useProgram("raster"),l=t.colorModeForRenderPass(),c=n instanceof L?[{},o]:t.stencilConfigForOverlap(o),u=c[0],h=c[1],p=h[h.length-1].overscaledZ,d=!t.options.moving,_=0,f=h;_<f.length;_+=1){var m=f[_],g=t.depthModeForSublayer(m.overscaledZ-p,1===i.paint.get("raster-opacity")?It.ReadWrite:It.ReadOnly,a.LESS),v=e.getTile(m),y=t.transform.calculatePosMatrix(m.toUnwrapped(),d);v.registerFadeDuration(i.paint.get("raster-fade-duration"));var x=e.findLoadedParent(m,0),b=so(v,x,e,i,t.transform),w=void 0,T=void 0,E="nearest"===i.paint.get("raster-resampling")?a.NEAREST:a.LINEAR;r.activeTexture.set(a.TEXTURE0),v.texture.bind(E,a.CLAMP_TO_EDGE,a.LINEAR_MIPMAP_NEAREST),r.activeTexture.set(a.TEXTURE1),x?(x.texture.bind(E,a.CLAMP_TO_EDGE,a.LINEAR_MIPMAP_NEAREST),w=Math.pow(2,x.tileID.overscaledZ-v.tileID.overscaledZ),T=[v.tileID.canonical.x*w%1,v.tileID.canonical.y*w%1]):v.texture.bind(E,a.CLAMP_TO_EDGE,a.LINEAR_MIPMAP_NEAREST);var I=Zi(y,T||[0,0],w||1,b,i);n instanceof L?s.draw(r,a.TRIANGLES,g,Pt.disabled,l,Ct.disabled,I,i.id,n.boundsBuffer,t.quadTriangleIndexBuffer,n.boundsSegments):s.draw(r,a.TRIANGLES,g,u[m.overscaledZ],l,Ct.disabled,I,i.id,t.rasterBoundsBuffer,t.quadTriangleIndexBuffer,t.rasterBoundsSegments);}},background:function(t,e,i){var o=i.paint.get("background-color"),r=i.paint.get("background-opacity");if(0!==r){var a=t.context,n=a.gl,s=t.transform,l=s.tileSize,c=i.paint.get("background-pattern");if(!t.isPatternMissing(c)){var u=!c&&1===o.a&&1===r&&t.opaquePassEnabledForLayer()?"opaque":"translucent";if(t.renderPass===u){var h=Pt.disabled,p=t.depthModeForSublayer(0,"opaque"===u?It.ReadWrite:It.ReadOnly),d=t.colorModeForRenderPass(),_=t.useProgram(c?"backgroundPattern":"background"),f=s.coveringTiles({tileSize:l});c&&(a.activeTexture.set(n.TEXTURE0),t.imageManager.bind(t.context));for(var m=i.getCrossfadeParameters(),g=0,v=f;g<v.length;g+=1){var y=v[g],x=t.transform.calculatePosMatrix(y.toUnwrapped()),b=c?Hi(x,r,t,c,{tileID:y,tileSize:l},m):Xi(x,r,o);_.draw(a,n.TRIANGLES,p,h,d,Ct.disabled,b,i.id,t.tileExtentBuffer,t.quadTriangleIndexBuffer,t.tileExtentSegments);}}}}},debug:function(t,e,i){for(var o=0;o<i.length;o++)go(t,e,i[o]);},custom:function(t,e,i){var o=t.context,r=i.implementation;if("offscreen"===t.renderPass){var a=r.prerender;a&&(t.setCustomLayerDefaults(),o.setColorMode(t.colorModeForRenderPass()),a.call(r,o.gl,t.transform.customLayerMatrix()),o.setDirty(),t.setBaseState());}else if("translucent"===t.renderPass){t.setCustomLayerDefaults(),o.setColorMode(t.colorModeForRenderPass()),o.setStencilMode(Pt.disabled);var n="3d"===r.renderingMode?new It(t.context.gl.LEQUAL,It.ReadWrite,t.depthRangeFor3D):t.depthModeForSublayer(0,It.ReadOnly);o.setDepthMode(n),r.render(o.gl,t.transform.customLayerMatrix()),o.setDirty(),t.setBaseState(),o.bindFramebuffer.set(null);}}},yo=function(t,e){this.context=new zt(t),this.transform=e,this._tileTextures={},this.setup(),this.numSublayers=Dt.maxUnderzooming+Dt.maxOverzooming+1,this.depthEpsilon=1/Math.pow(2,16),this.crossTileSymbolIndex=new Fe,this.gpuTimers={};};yo.prototype.resize=function(e,i){if(this.width=e*t.browser.devicePixelRatio,this.height=i*t.browser.devicePixelRatio,this.context.viewport.set([0,0,this.width,this.height]),this.style)for(var o=0,r=this.style._order;o<r.length;o+=1)this.style._layers[r[o]].resize();},yo.prototype.setup=function(){var e=this.context,i=new t.StructArrayLayout2i4;i.emplaceBack(0,0),i.emplaceBack(t.EXTENT,0),i.emplaceBack(0,t.EXTENT),i.emplaceBack(t.EXTENT,t.EXTENT),this.tileExtentBuffer=e.createVertexBuffer(i,Ve.members),this.tileExtentSegments=t.SegmentVector.simpleSegment(0,0,4,2);var o=new t.StructArrayLayout2i4;o.emplaceBack(0,0),o.emplaceBack(t.EXTENT,0),o.emplaceBack(0,t.EXTENT),o.emplaceBack(t.EXTENT,t.EXTENT),this.debugBuffer=e.createVertexBuffer(o,Ve.members),this.debugSegments=t.SegmentVector.simpleSegment(0,0,4,5);var r=new t.StructArrayLayout4i8;r.emplaceBack(0,0,0,0),r.emplaceBack(t.EXTENT,0,t.EXTENT,0),r.emplaceBack(0,t.EXTENT,0,t.EXTENT),r.emplaceBack(t.EXTENT,t.EXTENT,t.EXTENT,t.EXTENT),this.rasterBoundsBuffer=e.createVertexBuffer(r,M.members),this.rasterBoundsSegments=t.SegmentVector.simpleSegment(0,0,4,2);var a=new t.StructArrayLayout2i4;a.emplaceBack(0,0),a.emplaceBack(1,0),a.emplaceBack(0,1),a.emplaceBack(1,1),this.viewportBuffer=e.createVertexBuffer(a,Ve.members),this.viewportSegments=t.SegmentVector.simpleSegment(0,0,4,2);var n=new t.StructArrayLayout1ui2;n.emplaceBack(0),n.emplaceBack(1),n.emplaceBack(3),n.emplaceBack(2),n.emplaceBack(0),this.tileBorderIndexBuffer=e.createIndexBuffer(n);var s=new t.StructArrayLayout3ui6;s.emplaceBack(0,1,2),s.emplaceBack(2,1,3),this.quadTriangleIndexBuffer=e.createIndexBuffer(s),this.emptyTexture=new t.Texture(e,{width:1,height:1,data:new Uint8Array([0,0,0,0])},e.gl.RGBA);var l=this.context.gl;this.stencilClearMode=new Pt({func:l.ALWAYS,mask:0},0,255,l.ZERO,l.ZERO,l.ZERO);},yo.prototype.clearStencil=function(){var e=this.context,i=e.gl;this.nextStencilID=1,this.currentStencilSource=void 0;var o=t.create();t.ortho(o,0,this.width,this.height,0,0,1),t.scale(o,o,[i.drawingBufferWidth,i.drawingBufferHeight,0]),this.useProgram("clippingMask").draw(e,i.TRIANGLES,It.disabled,this.stencilClearMode,St.disabled,Ct.disabled,Ai(o),"$clipping",this.viewportBuffer,this.quadTriangleIndexBuffer,this.viewportSegments);},yo.prototype._renderTileClippingMasks=function(t,e){if(this.currentStencilSource!==t.source&&t.isTileClipped()&&e&&e.length){this.currentStencilSource=t.source;var i=this.context,o=i.gl;this.nextStencilID+e.length>256&&this.clearStencil(),i.setColorMode(St.disabled),i.setDepthMode(It.disabled);var r=this.useProgram("clippingMask");this._tileClippingMaskIDs={};for(var a=0,n=e;a<n.length;a+=1){var s=n[a],l=this._tileClippingMaskIDs[s.key]=this.nextStencilID++;r.draw(i,o.TRIANGLES,It.disabled,new Pt({func:o.ALWAYS,mask:0},l,255,o.KEEP,o.KEEP,o.REPLACE),St.disabled,Ct.disabled,Ai(s.posMatrix),"$clipping",this.tileExtentBuffer,this.quadTriangleIndexBuffer,this.tileExtentSegments);}}},yo.prototype.stencilModeFor3D=function(){this.currentStencilSource=void 0,this.nextStencilID+1>256&&this.clearStencil();var t=this.nextStencilID++,e=this.context.gl;return new Pt({func:e.NOTEQUAL,mask:255},t,255,e.KEEP,e.KEEP,e.REPLACE)},yo.prototype.stencilModeForClipping=function(t){var e=this.context.gl;return new Pt({func:e.EQUAL,mask:255},this._tileClippingMaskIDs[t.key],0,e.KEEP,e.KEEP,e.REPLACE)},yo.prototype.stencilConfigForOverlap=function(t){var e,i=this.context.gl,o=t.sort((function(t,e){return e.overscaledZ-t.overscaledZ})),r=o[o.length-1].overscaledZ,a=o[0].overscaledZ-r+1;if(a>1){this.currentStencilSource=void 0,this.nextStencilID+a>256&&this.clearStencil();for(var n={},s=0;s<a;s++)n[s+r]=new Pt({func:i.GEQUAL,mask:255},s+this.nextStencilID,255,i.KEEP,i.KEEP,i.REPLACE);return this.nextStencilID+=a,[n,o]}return [(e={},e[r]=Pt.disabled,e),o]},yo.prototype.colorModeForRenderPass=function(){var e=this.context.gl;return this._showOverdrawInspector?new St([e.CONSTANT_COLOR,e.ONE],new t.Color(1/8,1/8,1/8,0),[!0,!0,!0,!0]):"opaque"===this.renderPass?St.unblended:St.alphaBlended},yo.prototype.depthModeForSublayer=function(t,e,i){if(!this.opaquePassEnabledForLayer())return It.disabled;var o=1-((1+this.currentLayer)*this.numSublayers+t)*this.depthEpsilon;return new It(i||this.context.gl.LEQUAL,e,[o,o])},yo.prototype.opaquePassEnabledForLayer=function(){return this.currentLayer<this.opaquePassCutoff},yo.prototype.render=function(e,i){var o=this;this.style=e,this.options=i,this.lineAtlas=e.lineAtlas,this.imageManager=e.imageManager,this.glyphManager=e.glyphManager,this.symbolFadeChange=e.placement.symbolFadeChange(t.browser.now()),this.imageManager.beginFrame();var r=this.style._order,a=this.style.sourceCaches;for(var n in a){var s=a[n];s.used&&s.prepare(this.context);}var l,c,u={},h={},p={};for(var d in a){var _=a[d];u[d]=_.getVisibleCoordinates(),h[d]=u[d].slice().reverse(),p[d]=_.getVisibleCoordinates(!0).reverse();}this.opaquePassCutoff=1/0;for(var f=0;f<r.length;f++)if(this.style._layers[r[f]].is3D()){this.opaquePassCutoff=f;break}this.renderPass="offscreen";for(var m=0,g=r;m<g.length;m+=1){var v=this.style._layers[g[m]];if(v.hasOffscreenPass()&&!v.isHidden(this.transform.zoom)){var y=h[v.source];("custom"===v.type||y.length)&&this.renderLayer(this,a[v.source],v,y);}}for(this.context.bindFramebuffer.set(null),this.context.clear({color:i.showOverdrawInspector?t.Color.black:t.Color.transparent,depth:1}),this.clearStencil(),this._showOverdrawInspector=i.showOverdrawInspector,this.depthRangeFor3D=[0,1-(e._order.length+2)*this.numSublayers*this.depthEpsilon],this.renderPass="opaque",this.currentLayer=r.length-1;this.currentLayer>=0;this.currentLayer--){var x=this.style._layers[r[this.currentLayer]],b=a[x.source],w=u[x.source];this._renderTileClippingMasks(x,w),this.renderLayer(this,b,x,w);}for(this.renderPass="translucent",this.currentLayer=0;this.currentLayer<r.length;this.currentLayer++){var T=this.style._layers[r[this.currentLayer]],E=a[T.source],I=("symbol"===T.type?p:h)[T.source];this._renderTileClippingMasks(T,u[T.source]),this.renderLayer(this,E,T,I);}this.options.showTileBoundaries&&(t.values(this.style._layers).forEach((function(t){t.source&&!t.isHidden(o.transform.zoom)&&(t.source!==(c&&c.id)&&(c=o.style.sourceCaches[t.source]),(!l||l.getSource().maxzoom<c.getSource().maxzoom)&&(l=c));})),l&&vo.debug(this,l,l.getVisibleCoordinates())),this.options.showPadding&&function(t){var e=t.transform.padding;_o(t,t.transform.height-(e.top||0),3,lo),_o(t,e.bottom||0,3,co),fo(t,e.left||0,3,uo),fo(t,t.transform.width-(e.right||0),3,ho);var i=t.transform.centerPoint;!function(t,e,i,o){mo(t,e-1,i-10,2,20,o),mo(t,e-10,i-1,20,2,o);}(t,i.x,t.transform.height-i.y,po);}(this),this.context.setDefault();},yo.prototype.renderLayer=function(t,e,i,o){i.isHidden(this.transform.zoom)||("background"===i.type||"custom"===i.type||o.length)&&(this.id=i.id,this.gpuTimingStart(i),vo[i.type](t,e,i,o,this.style.placement.variableOffsets),this.gpuTimingEnd());},yo.prototype.gpuTimingStart=function(t){if(this.options.gpuTiming){var e=this.context.extTimerQuery,i=this.gpuTimers[t.id];i||(i=this.gpuTimers[t.id]={calls:0,cpuTime:0,query:e.createQueryEXT()}),i.calls++,e.beginQueryEXT(e.TIME_ELAPSED_EXT,i.query);}},yo.prototype.gpuTimingEnd=function(){if(this.options.gpuTiming){var t=this.context.extTimerQuery;t.endQueryEXT(t.TIME_ELAPSED_EXT);}},yo.prototype.collectGpuTimers=function(){var t=this.gpuTimers;return this.gpuTimers={},t},yo.prototype.queryGpuTimers=function(t){var e={};for(var i in t){var o=t[i],r=this.context.extTimerQuery,a=r.getQueryObjectEXT(o.query,r.QUERY_RESULT_EXT)/1e6;r.deleteQueryEXT(o.query),e[i]=a;}return e},yo.prototype.translatePosMatrix=function(e,i,o,r,a){if(!o[0]&&!o[1])return e;var n=a?"map"===r?this.transform.angle:0:"viewport"===r?-this.transform.angle:0;if(n){var s=Math.sin(n),l=Math.cos(n);o=[o[0]*l-o[1]*s,o[0]*s+o[1]*l];}var c=[a?o[0]:pe(i,o[0],this.transform.zoom),a?o[1]:pe(i,o[1],this.transform.zoom),0],u=new Float32Array(16);return t.translate(u,e,c),u},yo.prototype.saveTileTexture=function(t){var e=this._tileTextures[t.size[0]];e?e.push(t):this._tileTextures[t.size[0]]=[t];},yo.prototype.getTileTexture=function(t){var e=this._tileTextures[t];return e&&e.length>0?e.pop():null},yo.prototype.isPatternMissing=function(t){if(!t)return !1;if(!t.from||!t.to)return !0;var e=this.imageManager.getPattern(t.from.toString()),i=this.imageManager.getPattern(t.to.toString());return !e||!i},yo.prototype.useProgram=function(t,e){this.cache=this.cache||{};var i=""+t+(e?e.cacheKey:"")+(this._showOverdrawInspector?"/overdraw":"");return this.cache[i]||(this.cache[i]=new bi(this.context,t,vi[t],e,Ki[t],this._showOverdrawInspector)),this.cache[i]},yo.prototype.setCustomLayerDefaults=function(){this.context.unbindVAO(),this.context.cullFace.setDefault(),this.context.activeTexture.setDefault(),this.context.pixelStoreUnpack.setDefault(),this.context.pixelStoreUnpackPremultiplyAlpha.setDefault(),this.context.pixelStoreUnpackFlipY.setDefault();},yo.prototype.setBaseState=function(){var t=this.context.gl;this.context.cullFace.set(!1),this.context.viewport.set([0,0,this.width,this.height]),this.context.blendEquation.set(t.FUNC_ADD);},yo.prototype.initDebugOverlayCanvas=function(){null==this.debugOverlayCanvas&&(this.debugOverlayCanvas=t.window.document.createElement("canvas"),this.debugOverlayCanvas.width=512,this.debugOverlayCanvas.height=512,this.debugOverlayTexture=new t.Texture(this.context,this.debugOverlayCanvas,this.context.gl.RGBA));},yo.prototype.destroy=function(){this.emptyTexture.destroy(),this.debugOverlayTexture&&this.debugOverlayTexture.destroy();};var xo=function(t,e){this.points=t,this.planes=e;};xo.fromInvProjectionMatrix=function(e,i,o){var r=Math.pow(2,o),a=[[-1,1,-1,1],[1,1,-1,1],[1,-1,-1,1],[-1,-1,-1,1],[-1,1,1,1],[1,1,1,1],[1,-1,1,1],[-1,-1,1,1]].map((function(i){return t.transformMat4([],i,e)})).map((function(e){return t.scale$1([],e,1/e[3]/i*r)})),n=[[0,1,2],[6,5,4],[0,3,7],[2,1,5],[3,2,6],[0,4,5]].map((function(e){var i=t.sub([],a[e[0]],a[e[1]]),o=t.sub([],a[e[2]],a[e[1]]),r=t.normalize([],t.cross([],i,o)),n=-t.dot(r,a[e[1]]);return r.concat(n)}));return new xo(a,n)};var bo=function(e,i){this.min=e,this.max=i,this.center=t.scale$2([],t.add([],this.min,this.max),.5);};bo.prototype.quadrant=function(e){for(var i=[e%2==0,e<2],o=t.clone$2(this.min),r=t.clone$2(this.max),a=0;a<i.length;a++)o[a]=i[a]?this.min[a]:this.center[a],r[a]=i[a]?this.center[a]:this.max[a];return r[2]=this.max[2],new bo(o,r)},bo.prototype.distanceX=function(t){return Math.max(Math.min(this.max[0],t[0]),this.min[0])-t[0]},bo.prototype.distanceY=function(t){return Math.max(Math.min(this.max[1],t[1]),this.min[1])-t[1]},bo.prototype.intersects=function(e){for(var i=[[this.min[0],this.min[1],0,1],[this.max[0],this.min[1],0,1],[this.max[0],this.max[1],0,1],[this.min[0],this.max[1],0,1]],o=!0,r=0;r<e.planes.length;r++){for(var a=e.planes[r],n=0,s=0;s<i.length;s++)n+=t.dot$1(a,i[s])>=0;if(0===n)return 0;n!==i.length&&(o=!1);}if(o)return 2;for(var l=0;l<3;l++){for(var c=Number.MAX_VALUE,u=-Number.MAX_VALUE,h=0;h<e.points.length;h++){var p=e.points[h][l]-this.min[l];c=Math.min(c,p),u=Math.max(u,p);}if(u<0||c>this.max[l]-this.min[l])return 0}return 1};var wo=function(t,e,i,o){if(void 0===t&&(t=0),void 0===e&&(e=0),void 0===i&&(i=0),void 0===o&&(o=0),isNaN(t)||t<0||isNaN(e)||e<0||isNaN(i)||i<0||isNaN(o)||o<0)throw new Error("Invalid value for edge-insets, top, bottom, left and right must all be numbers");this.top=t,this.bottom=e,this.left=i,this.right=o;};wo.prototype.interpolate=function(e,i,o){return null!=i.top&&null!=e.top&&(this.top=t.number(e.top,i.top,o)),null!=i.bottom&&null!=e.bottom&&(this.bottom=t.number(e.bottom,i.bottom,o)),null!=i.left&&null!=e.left&&(this.left=t.number(e.left,i.left,o)),null!=i.right&&null!=e.right&&(this.right=t.number(e.right,i.right,o)),this},wo.prototype.getCenter=function(e,i){var o=t.clamp((this.left+e-this.right)/2,0,e),r=t.clamp((this.top+i-this.bottom)/2,0,i);return new t.Point(o,r)},wo.prototype.equals=function(t){return this.top===t.top&&this.bottom===t.bottom&&this.left===t.left&&this.right===t.right},wo.prototype.clone=function(){return new wo(this.top,this.bottom,this.left,this.right)},wo.prototype.toJSON=function(){return {top:this.top,bottom:this.bottom,left:this.left,right:this.right}};var To=function(e,i,o,r,a){this.tileSize=512,this.maxValidLatitude=85.051129,this._renderWorldCopies=void 0===a||a,this._minZoom=e||0,this._maxZoom=i||22,this._minPitch=null==o?0:o,this._maxPitch=null==r?60:r,this.setMaxBounds(),this.width=0,this.height=0,this._center=new t.LngLat(0,0),this.zoom=0,this.angle=0,this._fov=.6435011087932844,this._pitch=0,this._unmodified=!0,this._edgeInsets=new wo,this._posMatrixCache={},this._alignedPosMatrixCache={};},Eo={minZoom:{configurable:!0},maxZoom:{configurable:!0},minPitch:{configurable:!0},maxPitch:{configurable:!0},renderWorldCopies:{configurable:!0},worldSize:{configurable:!0},centerOffset:{configurable:!0},size:{configurable:!0},bearing:{configurable:!0},pitch:{configurable:!0},fov:{configurable:!0},zoom:{configurable:!0},center:{configurable:!0},padding:{configurable:!0},centerPoint:{configurable:!0},unmodified:{configurable:!0},point:{configurable:!0}};To.prototype.clone=function(){var t=new To(this._minZoom,this._maxZoom,this._minPitch,this.maxPitch,this._renderWorldCopies);return t.tileSize=this.tileSize,t.latRange=this.latRange,t.width=this.width,t.height=this.height,t._center=this._center,t.zoom=this.zoom,t.angle=this.angle,t._fov=this._fov,t._pitch=this._pitch,t._unmodified=this._unmodified,t._edgeInsets=this._edgeInsets.clone(),t._calcMatrices(),t},Eo.minZoom.get=function(){return this._minZoom},Eo.minZoom.set=function(t){this._minZoom!==t&&(this._minZoom=t,this.zoom=Math.max(this.zoom,t));},Eo.maxZoom.get=function(){return this._maxZoom},Eo.maxZoom.set=function(t){this._maxZoom!==t&&(this._maxZoom=t,this.zoom=Math.min(this.zoom,t));},Eo.minPitch.get=function(){return this._minPitch},Eo.minPitch.set=function(t){this._minPitch!==t&&(this._minPitch=t,this.pitch=Math.max(this.pitch,t));},Eo.maxPitch.get=function(){return this._maxPitch},Eo.maxPitch.set=function(t){this._maxPitch!==t&&(this._maxPitch=t,this.pitch=Math.min(this.pitch,t));},Eo.renderWorldCopies.get=function(){return this._renderWorldCopies},Eo.renderWorldCopies.set=function(t){void 0===t?t=!0:null===t&&(t=!1),this._renderWorldCopies=t;},Eo.worldSize.get=function(){return this.tileSize*this.scale},Eo.centerOffset.get=function(){return this.centerPoint._sub(this.size._div(2))},Eo.size.get=function(){return new t.Point(this.width,this.height)},Eo.bearing.get=function(){return -this.angle/Math.PI*180},Eo.bearing.set=function(e){var i=-t.wrap(e,-180,180)*Math.PI/180;this.angle!==i&&(this._unmodified=!1,this.angle=i,this._calcMatrices(),this.rotationMatrix=t.create$2(),t.rotate(this.rotationMatrix,this.rotationMatrix,this.angle));},Eo.pitch.get=function(){return this._pitch/Math.PI*180},Eo.pitch.set=function(e){var i=t.clamp(e,this.minPitch,this.maxPitch)/180*Math.PI;this._pitch!==i&&(this._unmodified=!1,this._pitch=i,this._calcMatrices());},Eo.fov.get=function(){return this._fov/Math.PI*180},Eo.fov.set=function(t){t=Math.max(.01,Math.min(60,t)),this._fov!==t&&(this._unmodified=!1,this._fov=t/180*Math.PI,this._calcMatrices());},Eo.zoom.get=function(){return this._zoom},Eo.zoom.set=function(t){var e=Math.min(Math.max(t,this.minZoom),this.maxZoom);this._zoom!==e&&(this._unmodified=!1,this._zoom=e,this.scale=this.zoomScale(e),this.tileZoom=Math.floor(e),this.zoomFraction=e-this.tileZoom,this._constrain(),this._calcMatrices());},Eo.center.get=function(){return this._center},Eo.center.set=function(t){t.lat===this._center.lat&&t.lng===this._center.lng||(this._unmodified=!1,this._center=t,this._constrain(),this._calcMatrices());},Eo.padding.get=function(){return this._edgeInsets.toJSON()},Eo.padding.set=function(t){this._edgeInsets.equals(t)||(this._unmodified=!1,this._edgeInsets.interpolate(this._edgeInsets,t,1),this._calcMatrices());},Eo.centerPoint.get=function(){return this._edgeInsets.getCenter(this.width,this.height)},To.prototype.isPaddingEqual=function(t){return this._edgeInsets.equals(t)},To.prototype.interpolatePadding=function(t,e,i){this._unmodified=!1,this._edgeInsets.interpolate(t,e,i),this._constrain(),this._calcMatrices();},To.prototype.coveringZoomLevel=function(t){var e=(t.roundZoom?Math.round:Math.floor)(this.zoom+this.scaleZoom(this.tileSize/t.tileSize));return Math.max(0,e)},To.prototype.getVisibleUnwrappedCoordinates=function(e){var i=[new t.UnwrappedTileID(0,e)];if(this._renderWorldCopies)for(var o=this.pointCoordinate(new t.Point(0,0)),r=this.pointCoordinate(new t.Point(this.width,0)),a=this.pointCoordinate(new t.Point(this.width,this.height)),n=this.pointCoordinate(new t.Point(0,this.height)),s=Math.floor(Math.min(o.x,r.x,a.x,n.x)),l=Math.floor(Math.max(o.x,r.x,a.x,n.x)),c=s-1;c<=l+1;c++)0!==c&&i.push(new t.UnwrappedTileID(c,e));return i},To.prototype.coveringTiles=function(e){var i=this.coveringZoomLevel(e),o=i;if(void 0!==e.minzoom&&i<e.minzoom)return [];void 0!==e.maxzoom&&i>e.maxzoom&&(i=e.maxzoom);var r=t.MercatorCoordinate.fromLngLat(this.center),a=Math.pow(2,i),n=[a*r.x,a*r.y,0],s=xo.fromInvProjectionMatrix(this.invProjMatrix,this.worldSize,i),l=e.minzoom||0;this.pitch<=60&&this._edgeInsets.top<.1&&(l=i);var c=function(t){return {aabb:new bo([t*a,0,0],[(t+1)*a,a,0]),zoom:0,x:0,y:0,wrap:t,fullyVisible:!1}},u=[],h=[],p=i,d=e.reparseOverscaled?o:i;if(this._renderWorldCopies)for(var _=1;_<=3;_++)u.push(c(-_)),u.push(c(_));for(u.push(c(0));u.length>0;){var f=u.pop(),m=f.x,g=f.y,v=f.fullyVisible;if(!v){var y=f.aabb.intersects(s);if(0===y)continue;v=2===y;}var x=f.aabb.distanceX(n),b=f.aabb.distanceY(n),w=Math.max(Math.abs(x),Math.abs(b));if(f.zoom===p||w>3+(1<<p-f.zoom)-2&&f.zoom>=l)h.push({tileID:new t.OverscaledTileID(f.zoom===p?d:f.zoom,f.wrap,f.zoom,m,g),distanceSq:t.sqrLen([n[0]-.5-m,n[1]-.5-g])});else for(var T=0;T<4;T++){var E=(m<<1)+T%2,I=(g<<1)+(T>>1);u.push({aabb:f.aabb.quadrant(T),zoom:f.zoom+1,x:E,y:I,wrap:f.wrap,fullyVisible:v});}}return h.sort((function(t,e){return t.distanceSq-e.distanceSq})).map((function(t){return t.tileID}))},To.prototype.resize=function(t,e){this.width=t,this.height=e,this.pixelsToGLUnits=[2/t,-2/e],this._constrain(),this._calcMatrices();},Eo.unmodified.get=function(){return this._unmodified},To.prototype.zoomScale=function(t){return Math.pow(2,t)},To.prototype.scaleZoom=function(t){return Math.log(t)/Math.LN2},To.prototype.project=function(e){var i=t.clamp(e.lat,-this.maxValidLatitude,this.maxValidLatitude);return new t.Point(t.mercatorXfromLng(e.lng)*this.worldSize,t.mercatorYfromLat(i)*this.worldSize)},To.prototype.unproject=function(e){return new t.MercatorCoordinate(e.x/this.worldSize,e.y/this.worldSize).toLngLat()},Eo.point.get=function(){return this.project(this.center)},To.prototype.setLocationAtPoint=function(e,i){var o=this.pointCoordinate(i),r=this.pointCoordinate(this.centerPoint),a=this.locationCoordinate(e),n=new t.MercatorCoordinate(a.x-(o.x-r.x),a.y-(o.y-r.y));this.center=this.coordinateLocation(n),this._renderWorldCopies&&(this.center=this.center.wrap());},To.prototype.locationPoint=function(t){return this.coordinatePoint(this.locationCoordinate(t))},To.prototype.pointLocation=function(t){return this.coordinateLocation(this.pointCoordinate(t))},To.prototype.locationCoordinate=function(e){return t.MercatorCoordinate.fromLngLat(e)},To.prototype.coordinateLocation=function(t){return t.toLngLat()},To.prototype.pointCoordinate=function(e){var i=[e.x,e.y,0,1],o=[e.x,e.y,1,1];t.transformMat4(i,i,this.pixelMatrixInverse),t.transformMat4(o,o,this.pixelMatrixInverse);var r=i[3],a=o[3],n=i[1]/r,s=o[1]/a,l=i[2]/r,c=o[2]/a,u=l===c?0:(0-l)/(c-l);return new t.MercatorCoordinate(t.number(i[0]/r,o[0]/a,u)/this.worldSize,t.number(n,s,u)/this.worldSize)},To.prototype.coordinatePoint=function(e){var i=[e.x*this.worldSize,e.y*this.worldSize,0,1];return t.transformMat4(i,i,this.pixelMatrix),new t.Point(i[0]/i[3],i[1]/i[3])},To.prototype.getBounds=function(){return (new t.LngLatBounds).extend(this.pointLocation(new t.Point(0,0))).extend(this.pointLocation(new t.Point(this.width,0))).extend(this.pointLocation(new t.Point(this.width,this.height))).extend(this.pointLocation(new t.Point(0,this.height)))},To.prototype.getMaxBounds=function(){return this.latRange&&2===this.latRange.length&&this.lngRange&&2===this.lngRange.length?new t.LngLatBounds([this.lngRange[0],this.latRange[0]],[this.lngRange[1],this.latRange[1]]):null},To.prototype.setMaxBounds=function(t){t?(this.lngRange=[t.getWest(),t.getEast()],this.latRange=[t.getSouth(),t.getNorth()],this._constrain()):(this.lngRange=null,this.latRange=[-this.maxValidLatitude,this.maxValidLatitude]);},To.prototype.calculatePosMatrix=function(e,i){void 0===i&&(i=!1);var o=e.key,r=i?this._alignedPosMatrixCache:this._posMatrixCache;if(r[o])return r[o];var a=e.canonical,n=this.worldSize/this.zoomScale(a.z),s=a.x+Math.pow(2,a.z)*e.wrap,l=t.identity(new Float64Array(16));return t.translate(l,l,[s*n,a.y*n,0]),t.scale(l,l,[n/t.EXTENT,n/t.EXTENT,1]),t.multiply(l,i?this.alignedProjMatrix:this.projMatrix,l),r[o]=new Float32Array(l),r[o]},To.prototype.customLayerMatrix=function(){return this.mercatorMatrix.slice()},To.prototype._constrain=function(){if(this.center&&this.width&&this.height&&!this._constraining){this._constraining=!0;var e,i,o,r,a=-90,n=90,s=-180,l=180,c=this.size,u=this._unmodified;if(this.latRange){var h=this.latRange;a=t.mercatorYfromLat(h[1])*this.worldSize,e=(n=t.mercatorYfromLat(h[0])*this.worldSize)-a<c.y?c.y/(n-a):0;}if(this.lngRange){var p=this.lngRange;s=t.mercatorXfromLng(p[0])*this.worldSize,i=(l=t.mercatorXfromLng(p[1])*this.worldSize)-s<c.x?c.x/(l-s):0;}var d=this.point,_=Math.max(i||0,e||0);if(_)return this.center=this.unproject(new t.Point(i?(l+s)/2:d.x,e?(n+a)/2:d.y)),this.zoom+=this.scaleZoom(_),this._unmodified=u,void(this._constraining=!1);if(this.latRange){var f=d.y,m=c.y/2;f-m<a&&(r=a+m),f+m>n&&(r=n-m);}if(this.lngRange){var g=d.x,v=c.x/2;g-v<s&&(o=s+v),g+v>l&&(o=l-v);}void 0===o&&void 0===r||(this.center=this.unproject(new t.Point(void 0!==o?o:d.x,void 0!==r?r:d.y))),this._unmodified=u,this._constraining=!1;}},To.prototype._calcMatrices=function(){if(this.height){var e=this.centerOffset;this.cameraToCenterDistance=.5/Math.tan(this._fov/2)*this.height;var i=Math.PI/2+this._pitch,o=this._fov*(.5+e.y/this.height),r=Math.sin(o)*this.cameraToCenterDistance/Math.sin(t.clamp(Math.PI-i-o,.01,Math.PI-.01)),a=this.point,n=a.x,s=a.y,l=1.01*(Math.cos(Math.PI/2-this._pitch)*r+this.cameraToCenterDistance),c=this.height/50,u=new Float64Array(16);t.perspective(u,this._fov,this.width/this.height,c,l),u[8]=2*-e.x/this.width,u[9]=2*e.y/this.height,t.scale(u,u,[1,-1,1]),t.translate(u,u,[0,0,-this.cameraToCenterDistance]),t.rotateX(u,u,this._pitch),t.rotateZ(u,u,this.angle),t.translate(u,u,[-n,-s,0]),this.mercatorMatrix=t.scale([],u,[this.worldSize,this.worldSize,this.worldSize]),t.scale(u,u,[1,1,t.mercatorZfromAltitude(1,this.center.lat)*this.worldSize,1]),this.projMatrix=u,this.invProjMatrix=t.invert([],this.projMatrix);var h=this.width%2/2,p=this.height%2/2,d=Math.cos(this.angle),_=Math.sin(this.angle),f=n-Math.round(n)+d*h+_*p,m=s-Math.round(s)+d*p+_*h,g=new Float64Array(u);if(t.translate(g,g,[f>.5?f-1:f,m>.5?m-1:m,0]),this.alignedProjMatrix=g,u=t.create(),t.scale(u,u,[this.width/2,-this.height/2,1]),t.translate(u,u,[1,-1,0]),this.labelPlaneMatrix=u,u=t.create(),t.scale(u,u,[1,-1,1]),t.translate(u,u,[-1,-1,0]),t.scale(u,u,[2/this.width,2/this.height,1]),this.glCoordMatrix=u,this.pixelMatrix=t.multiply(new Float64Array(16),this.labelPlaneMatrix,this.projMatrix),!(u=t.invert(new Float64Array(16),this.pixelMatrix)))throw new Error("failed to invert matrix");this.pixelMatrixInverse=u,this._posMatrixCache={},this._alignedPosMatrixCache={};}},To.prototype.maxPitchScaleFactor=function(){if(!this.pixelMatrixInverse)return 1;var e=this.pointCoordinate(new t.Point(0,0)),i=[e.x*this.worldSize,e.y*this.worldSize,0,1];return t.transformMat4(i,i,this.pixelMatrix)[3]/this.cameraToCenterDistance},To.prototype.getCameraPoint=function(){var e=Math.tan(this._pitch)*(this.cameraToCenterDistance||1);return this.centerPoint.add(new t.Point(0,e))},To.prototype.getCameraQueryGeometry=function(e){var i=this.getCameraPoint();if(1===e.length)return [e[0],i];for(var o=i.x,r=i.y,a=i.x,n=i.y,s=0,l=e;s<l.length;s+=1){var c=l[s];o=Math.min(o,c.x),r=Math.min(r,c.y),a=Math.max(a,c.x),n=Math.max(n,c.y);}return [new t.Point(o,r),new t.Point(a,r),new t.Point(a,n),new t.Point(o,n),new t.Point(o,r)]},Object.defineProperties(To.prototype,Eo);var Io=function(e){var i,o,r,a;this._hashName=e&&encodeURIComponent(e),t.bindAll(["_getCurrentHash","_onHashChange","_updateHash"],this),this._updateHash=(i=this._updateHashUnthrottled.bind(this),o=!1,r=null,a=function(){r=null,o&&(i(),r=setTimeout(a,300),o=!1);},function(){return o=!0,r||a(),r});};Io.prototype.addTo=function(e){return this._map=e,t.window.addEventListener("hashchange",this._onHashChange,!1),this._map.on("moveend",this._updateHash),this},Io.prototype.remove=function(){return t.window.removeEventListener("hashchange",this._onHashChange,!1),this._map.off("moveend",this._updateHash),clearTimeout(this._updateHash()),delete this._map,this},Io.prototype.getHashString=function(e){var i=this._map.getCenter(),o=Math.round(100*this._map.getZoom())/100,r=Math.ceil((o*Math.LN2+Math.log(512/360/.5))/Math.LN10),a=Math.pow(10,r),n=Math.round(i.lng*a)/a,s=Math.round(i.lat*a)/a,l=this._map.getBearing(),c=this._map.getPitch(),u="";if(u+=e?"/"+n+"/"+s+"/"+o:o+"/"+s+"/"+n,(l||c)&&(u+="/"+Math.round(10*l)/10),c&&(u+="/"+Math.round(c)),this._hashName){var h=this._hashName,p=!1,d=t.window.location.hash.slice(1).split("&").map((function(t){var e=t.split("=")[0];return e===h?(p=!0,e+"="+u):t})).filter((function(t){return t}));return p||d.push(h+"="+u),"#"+d.join("&")}return "#"+u},Io.prototype._getCurrentHash=function(){var e,i=this,o=t.window.location.hash.replace("#","");return this._hashName?(o.split("&").map((function(t){return t.split("=")})).forEach((function(t){t[0]===i._hashName&&(e=t);})),(e&&e[1]||"").split("/")):o.split("/")},Io.prototype._onHashChange=function(){var t=this._getCurrentHash();if(t.length>=3&&!t.some((function(t){return isNaN(t)}))){var e=this._map.dragRotate.isEnabled()&&this._map.touchZoomRotate.isEnabled()?+(t[3]||0):this._map.getBearing();return this._map.jumpTo({center:[+t[2],+t[1]],zoom:+t[0],bearing:e,pitch:+(t[4]||0)}),!0}return !1},Io.prototype._updateHashUnthrottled=function(){var e=this.getHashString();try{t.window.history.replaceState(t.window.history.state,"",e);}catch(t){}};var Po={linearity:.3,easing:t.bezier(0,0,.3,1)},So=t.extend({deceleration:2500,maxSpeed:1400},Po),Co=t.extend({deceleration:20,maxSpeed:1400},Po),zo=t.extend({deceleration:1e3,maxSpeed:360},Po),Do=t.extend({deceleration:1e3,maxSpeed:90},Po),Mo=function(t){this._map=t,this.clear();};function Lo(t,e){(!t.duration||t.duration<e.duration)&&(t.duration=e.duration,t.easing=e.easing);}function Ao(e,i,o){var r=o.maxSpeed,a=o.linearity,n=o.deceleration,s=t.clamp(e*a/(i/1e3),-r,r),l=Math.abs(s)/(n*a);return {easing:o.easing,duration:1e3*l,amount:s*(l/2)}}Mo.prototype.clear=function(){this._inertiaBuffer=[];},Mo.prototype.record=function(e){this._drainInertiaBuffer(),this._inertiaBuffer.push({time:t.browser.now(),settings:e});},Mo.prototype._drainInertiaBuffer=function(){for(var e=this._inertiaBuffer,i=t.browser.now();e.length>0&&i-e[0].time>160;)e.shift();},Mo.prototype._onMoveEnd=function(e){if(this._drainInertiaBuffer(),!(this._inertiaBuffer.length<2)){for(var i={zoom:0,bearing:0,pitch:0,pan:new t.Point(0,0),pinchAround:void 0,around:void 0},o=0,r=this._inertiaBuffer;o<r.length;o+=1){var a=r[o].settings;i.zoom+=a.zoomDelta||0,i.bearing+=a.bearingDelta||0,i.pitch+=a.pitchDelta||0,a.panDelta&&i.pan._add(a.panDelta),a.around&&(i.around=a.around),a.pinchAround&&(i.pinchAround=a.pinchAround);}var n=this._inertiaBuffer[this._inertiaBuffer.length-1].time-this._inertiaBuffer[0].time,s={};if(i.pan.mag()){var l=Ao(i.pan.mag(),n,t.extend({},So,e||{}));s.offset=i.pan.mult(l.amount/i.pan.mag()),s.center=this._map.transform.center,Lo(s,l);}if(i.zoom){var c=Ao(i.zoom,n,Co);s.zoom=this._map.transform.zoom+c.amount,Lo(s,c);}if(i.bearing){var u=Ao(i.bearing,n,zo);s.bearing=this._map.transform.bearing+t.clamp(u.amount,-179,179),Lo(s,u);}if(i.pitch){var h=Ao(i.pitch,n,Do);s.pitch=this._map.transform.pitch+h.amount,Lo(s,h);}if(s.zoom||s.bearing){var p=void 0===i.pinchAround?i.around:i.pinchAround;s.around=p?this._map.unproject(p):this._map.getCenter();}return this.clear(),t.extend(s,{noMoveStart:!0})}};var Ro=function(e){function o(o,r,a,n){void 0===n&&(n={});var s=i.mousePos(r.getCanvasContainer(),a),l=r.unproject(s);e.call(this,o,t.extend({point:s,lngLat:l,originalEvent:a},n)),this._defaultPrevented=!1,this.target=r;}e&&(o.__proto__=e),(o.prototype=Object.create(e&&e.prototype)).constructor=o;var r={defaultPrevented:{configurable:!0}};return o.prototype.preventDefault=function(){this._defaultPrevented=!0;},r.defaultPrevented.get=function(){return this._defaultPrevented},Object.defineProperties(o.prototype,r),o}(t.Event),ko=function(e){function o(o,r,a){var n="touchend"===o?a.changedTouches:a.touches,s=i.touchPos(r.getCanvasContainer(),n),l=s.map((function(t){return r.unproject(t)})),c=s.reduce((function(t,e,i,o){return t.add(e.div(o.length))}),new t.Point(0,0)),u=r.unproject(c);e.call(this,o,{points:s,point:c,lngLats:l,lngLat:u,originalEvent:a}),this._defaultPrevented=!1;}e&&(o.__proto__=e),(o.prototype=Object.create(e&&e.prototype)).constructor=o;var r={defaultPrevented:{configurable:!0}};return o.prototype.preventDefault=function(){this._defaultPrevented=!0;},r.defaultPrevented.get=function(){return this._defaultPrevented},Object.defineProperties(o.prototype,r),o}(t.Event),Bo=function(t){function e(e,i,o){t.call(this,e,{originalEvent:o}),this._defaultPrevented=!1;}t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e;var i={defaultPrevented:{configurable:!0}};return e.prototype.preventDefault=function(){this._defaultPrevented=!0;},i.defaultPrevented.get=function(){return this._defaultPrevented},Object.defineProperties(e.prototype,i),e}(t.Event),Oo=function(t,e){this._map=t,this._clickTolerance=e.clickTolerance;};Oo.prototype.reset=function(){delete this._mousedownPos;},Oo.prototype.wheel=function(t){return this._firePreventable(new Bo(t.type,this._map,t))},Oo.prototype.mousedown=function(t,e){return this._mousedownPos=e,this._firePreventable(new Ro(t.type,this._map,t))},Oo.prototype.mouseup=function(t){this._map.fire(new Ro(t.type,this._map,t));},Oo.prototype.click=function(t,e){this._mousedownPos&&this._mousedownPos.dist(e)>=this._clickTolerance||this._map.fire(new Ro(t.type,this._map,t));},Oo.prototype.dblclick=function(t){return this._firePreventable(new Ro(t.type,this._map,t))},Oo.prototype.mouseover=function(t){this._map.fire(new Ro(t.type,this._map,t));},Oo.prototype.mouseout=function(t){this._map.fire(new Ro(t.type,this._map,t));},Oo.prototype.touchstart=function(t){return this._firePreventable(new ko(t.type,this._map,t))},Oo.prototype.touchmove=function(t){this._map.fire(new ko(t.type,this._map,t));},Oo.prototype.touchend=function(t){this._map.fire(new ko(t.type,this._map,t));},Oo.prototype.touchcancel=function(t){this._map.fire(new ko(t.type,this._map,t));},Oo.prototype._firePreventable=function(t){if(this._map.fire(t),t.defaultPrevented)return {}},Oo.prototype.isEnabled=function(){return !0},Oo.prototype.isActive=function(){return !1},Oo.prototype.enable=function(){},Oo.prototype.disable=function(){};var Fo=function(t){this._map=t;};Fo.prototype.reset=function(){this._delayContextMenu=!1,delete this._contextMenuEvent;},Fo.prototype.mousemove=function(t){this._map.fire(new Ro(t.type,this._map,t));},Fo.prototype.mousedown=function(){this._delayContextMenu=!0;},Fo.prototype.mouseup=function(){this._delayContextMenu=!1,this._contextMenuEvent&&(this._map.fire(new Ro("contextmenu",this._map,this._contextMenuEvent)),delete this._contextMenuEvent);},Fo.prototype.contextmenu=function(t){this._delayContextMenu?this._contextMenuEvent=t:this._map.fire(new Ro(t.type,this._map,t)),this._map.listens("contextmenu")&&t.preventDefault();},Fo.prototype.isEnabled=function(){return !0},Fo.prototype.isActive=function(){return !1},Fo.prototype.enable=function(){},Fo.prototype.disable=function(){};var Uo=function(t,e){this._map=t,this._el=t.getCanvasContainer(),this._container=t.getContainer(),this._clickTolerance=e.clickTolerance||1;};function No(t,e){for(var i={},o=0;o<t.length;o++)i[t[o].identifier]=e[o];return i}Uo.prototype.isEnabled=function(){return !!this._enabled},Uo.prototype.isActive=function(){return !!this._active},Uo.prototype.enable=function(){this.isEnabled()||(this._enabled=!0);},Uo.prototype.disable=function(){this.isEnabled()&&(this._enabled=!1);},Uo.prototype.mousedown=function(t,e){this.isEnabled()&&t.shiftKey&&0===t.button&&(i.disableDrag(),this._startPos=this._lastPos=e,this._active=!0);},Uo.prototype.mousemoveWindow=function(t,e){if(this._active){var o=e;if(!(this._lastPos.equals(o)||!this._box&&o.dist(this._startPos)<this._clickTolerance)){var r=this._startPos;this._lastPos=o,this._box||(this._box=i.create("div","mapboxgl-boxzoom",this._container),this._container.classList.add("mapboxgl-crosshair"),this._fireEvent("boxzoomstart",t));var a=Math.min(r.x,o.x),n=Math.max(r.x,o.x),s=Math.min(r.y,o.y),l=Math.max(r.y,o.y);i.setTransform(this._box,"translate("+a+"px,"+s+"px)"),this._box.style.width=n-a+"px",this._box.style.height=l-s+"px";}}},Uo.prototype.mouseupWindow=function(e,o){var r=this;if(this._active&&0===e.button){var a=this._startPos,n=o;if(this.reset(),i.suppressClick(),a.x!==n.x||a.y!==n.y)return this._map.fire(new t.Event("boxzoomend",{originalEvent:e})),{cameraAnimation:function(t){return t.fitScreenCoordinates(a,n,r._map.getBearing(),{linear:!0})}};this._fireEvent("boxzoomcancel",e);}},Uo.prototype.keydown=function(t){this._active&&27===t.keyCode&&(this.reset(),this._fireEvent("boxzoomcancel",t));},Uo.prototype.reset=function(){this._active=!1,this._container.classList.remove("mapboxgl-crosshair"),this._box&&(i.remove(this._box),this._box=null),i.enableDrag(),delete this._startPos,delete this._lastPos;},Uo.prototype._fireEvent=function(e,i){return this._map.fire(new t.Event(e,{originalEvent:i}))};var Zo=function(t){this.reset(),this.numTouches=t.numTouches;};Zo.prototype.reset=function(){delete this.centroid,delete this.startTime,delete this.touches,this.aborted=!1;},Zo.prototype.touchstart=function(e,i,o){(this.centroid||o.length>this.numTouches)&&(this.aborted=!0),this.aborted||(void 0===this.startTime&&(this.startTime=e.timeStamp),o.length===this.numTouches&&(this.centroid=function(e){for(var i=new t.Point(0,0),o=0,r=e;o<r.length;o+=1)i._add(r[o]);return i.div(e.length)}(i),this.touches=No(o,i)));},Zo.prototype.touchmove=function(t,e,i){if(!this.aborted&&this.centroid){var o=No(i,e);for(var r in this.touches){var a=o[r];(!a||a.dist(this.touches[r])>30)&&(this.aborted=!0);}}},Zo.prototype.touchend=function(t,e,i){if((!this.centroid||t.timeStamp-this.startTime>500)&&(this.aborted=!0),0===i.length){var o=!this.aborted&&this.centroid;if(this.reset(),o)return o}};var qo=function(t){this.singleTap=new Zo(t),this.numTaps=t.numTaps,this.reset();};qo.prototype.reset=function(){this.lastTime=1/0,delete this.lastTap,this.count=0,this.singleTap.reset();},qo.prototype.touchstart=function(t,e,i){this.singleTap.touchstart(t,e,i);},qo.prototype.touchmove=function(t,e,i){this.singleTap.touchmove(t,e,i);},qo.prototype.touchend=function(t,e,i){var o=this.singleTap.touchend(t,e,i);if(o){var r=t.timeStamp-this.lastTime<500,a=!this.lastTap||this.lastTap.dist(o)<30;if(r&&a||this.reset(),this.count++,this.lastTime=t.timeStamp,this.lastTap=o,this.count===this.numTaps)return this.reset(),o}};var jo=function(){this._zoomIn=new qo({numTouches:1,numTaps:2}),this._zoomOut=new qo({numTouches:2,numTaps:1}),this.reset();};jo.prototype.reset=function(){this._active=!1,this._zoomIn.reset(),this._zoomOut.reset();},jo.prototype.touchstart=function(t,e,i){this._zoomIn.touchstart(t,e,i),this._zoomOut.touchstart(t,e,i);},jo.prototype.touchmove=function(t,e,i){this._zoomIn.touchmove(t,e,i),this._zoomOut.touchmove(t,e,i);},jo.prototype.touchend=function(t,e,i){var o=this,r=this._zoomIn.touchend(t,e,i),a=this._zoomOut.touchend(t,e,i);return r?(this._active=!0,t.preventDefault(),setTimeout((function(){return o.reset()}),0),{cameraAnimation:function(e){return e.easeTo({duration:300,zoom:e.getZoom()+1,around:e.unproject(r)},{originalEvent:t})}}):a?(this._active=!0,t.preventDefault(),setTimeout((function(){return o.reset()}),0),{cameraAnimation:function(e){return e.easeTo({duration:300,zoom:e.getZoom()-1,around:e.unproject(a)},{originalEvent:t})}}):void 0},jo.prototype.touchcancel=function(){this.reset();},jo.prototype.enable=function(){this._enabled=!0;},jo.prototype.disable=function(){this._enabled=!1,this.reset();},jo.prototype.isEnabled=function(){return this._enabled},jo.prototype.isActive=function(){return this._active};var Vo={0:1,2:2},Go=function(t){this.reset(),this._clickTolerance=t.clickTolerance||1;};Go.prototype.reset=function(){this._active=!1,this._moved=!1,delete this._lastPoint,delete this._eventButton;},Go.prototype._correctButton=function(t,e){return !1},Go.prototype._move=function(t,e){return {}},Go.prototype.mousedown=function(t,e){if(!this._lastPoint){var o=i.mouseButton(t);this._correctButton(t,o)&&(this._lastPoint=e,this._eventButton=o);}},Go.prototype.mousemoveWindow=function(t,e){var i=this._lastPoint;if(i)if(t.preventDefault(),function(t,e){var i=Vo[e];return void 0===t.buttons||(t.buttons&i)!==i}(t,this._eventButton))this.reset();else if(this._moved||!(e.dist(i)<this._clickTolerance))return this._moved=!0,this._lastPoint=e,this._move(i,e)},Go.prototype.mouseupWindow=function(t){this._lastPoint&&i.mouseButton(t)===this._eventButton&&(this._moved&&i.suppressClick(),this.reset());},Go.prototype.enable=function(){this._enabled=!0;},Go.prototype.disable=function(){this._enabled=!1,this.reset();},Go.prototype.isEnabled=function(){return this._enabled},Go.prototype.isActive=function(){return this._active};var Wo=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.mousedown=function(e,i){t.prototype.mousedown.call(this,e,i),this._lastPoint&&(this._active=!0);},e.prototype._correctButton=function(t,e){return 0===e&&!t.ctrlKey},e.prototype._move=function(t,e){return {around:e,panDelta:e.sub(t)}},e}(Go),Xo=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._correctButton=function(t,e){return 0===e&&t.ctrlKey||2===e},e.prototype._move=function(t,e){var i=.8*(e.x-t.x);if(i)return this._active=!0,{bearingDelta:i}},e.prototype.contextmenu=function(t){t.preventDefault();},e}(Go),Ho=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype._correctButton=function(t,e){return 0===e&&t.ctrlKey||2===e},e.prototype._move=function(t,e){var i=-.5*(e.y-t.y);if(i)return this._active=!0,{pitchDelta:i}},e.prototype.contextmenu=function(t){t.preventDefault();},e}(Go),Ko=function(t){this._minTouches=1,this._clickTolerance=t.clickTolerance||1,this.reset();};Ko.prototype.reset=function(){this._active=!1,this._touches={},this._sum=new t.Point(0,0);},Ko.prototype.touchstart=function(t,e,i){return this._calculateTransform(t,e,i)},Ko.prototype.touchmove=function(t,e,i){if(this._active&&!(i.length<this._minTouches))return t.preventDefault(),this._calculateTransform(t,e,i)},Ko.prototype.touchend=function(t,e,i){this._calculateTransform(t,e,i),this._active&&i.length<this._minTouches&&this.reset();},Ko.prototype.touchcancel=function(){this.reset();},Ko.prototype._calculateTransform=function(e,i,o){o.length>0&&(this._active=!0);var r=No(o,i),a=new t.Point(0,0),n=new t.Point(0,0),s=0;for(var l in r){var c=r[l],u=this._touches[l];u&&(a._add(c),n._add(c.sub(u)),s++,r[l]=c);}if(this._touches=r,!(s<this._minTouches)&&n.mag()){var h=n.div(s);if(this._sum._add(h),!(this._sum.mag()<this._clickTolerance))return {around:a.div(s),panDelta:h}}},Ko.prototype.enable=function(){this._enabled=!0;},Ko.prototype.disable=function(){this._enabled=!1,this.reset();},Ko.prototype.isEnabled=function(){return this._enabled},Ko.prototype.isActive=function(){return this._active};var Yo=function(){this.reset();};function Jo(t,e,i){for(var o=0;o<t.length;o++)if(t[o].identifier===i)return e[o]}function Qo(t,e){return Math.log(t/e)/Math.LN2}Yo.prototype.reset=function(){this._active=!1,delete this._firstTwoTouches;},Yo.prototype._start=function(t){},Yo.prototype._move=function(t,e,i){return {}},Yo.prototype.touchstart=function(t,e,i){this._firstTwoTouches||i.length<2||(this._firstTwoTouches=[i[0].identifier,i[1].identifier],this._start([e[0],e[1]]));},Yo.prototype.touchmove=function(t,e,i){if(this._firstTwoTouches){t.preventDefault();var o=this._firstTwoTouches,r=o[1],a=Jo(i,e,o[0]),n=Jo(i,e,r);if(a&&n){var s=this._aroundCenter?null:a.add(n).div(2);return this._move([a,n],s,t)}}},Yo.prototype.touchend=function(t,e,o){if(this._firstTwoTouches){var r=this._firstTwoTouches,a=r[1],n=Jo(o,e,r[0]),s=Jo(o,e,a);n&&s||(this._active&&i.suppressClick(),this.reset());}},Yo.prototype.touchcancel=function(){this.reset();},Yo.prototype.enable=function(t){this._enabled=!0,this._aroundCenter=!!t&&"center"===t.around;},Yo.prototype.disable=function(){this._enabled=!1,this.reset();},Yo.prototype.isEnabled=function(){return this._enabled},Yo.prototype.isActive=function(){return this._active};var $o=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.reset=function(){t.prototype.reset.call(this),delete this._distance,delete this._startDistance;},e.prototype._start=function(t){this._startDistance=this._distance=t[0].dist(t[1]);},e.prototype._move=function(t,e){var i=this._distance;if(this._distance=t[0].dist(t[1]),this._active||!(Math.abs(Qo(this._distance,this._startDistance))<.1))return this._active=!0,{zoomDelta:Qo(this._distance,i),pinchAround:e}},e}(Yo);function tr(t,e){return 180*t.angleWith(e)/Math.PI}var er=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.reset=function(){t.prototype.reset.call(this),delete this._minDiameter,delete this._startVector,delete this._vector;},e.prototype._start=function(t){this._startVector=this._vector=t[0].sub(t[1]),this._minDiameter=t[0].dist(t[1]);},e.prototype._move=function(t,e){var i=this._vector;if(this._vector=t[0].sub(t[1]),this._active||!this._isBelowThreshold(this._vector))return this._active=!0,{bearingDelta:tr(this._vector,i),pinchAround:e}},e.prototype._isBelowThreshold=function(t){this._minDiameter=Math.min(this._minDiameter,t.mag());var e=25/(Math.PI*this._minDiameter)*360,i=tr(t,this._startVector);return Math.abs(i)<e},e}(Yo);function ir(t){return Math.abs(t.y)>Math.abs(t.x)}var or=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.reset=function(){t.prototype.reset.call(this),this._valid=void 0,delete this._firstMove,delete this._lastPoints;},e.prototype._start=function(t){this._lastPoints=t,ir(t[0].sub(t[1]))&&(this._valid=!1);},e.prototype._move=function(t,e,i){var o=t[0].sub(this._lastPoints[0]),r=t[1].sub(this._lastPoints[1]);if(this._valid=this.gestureBeginsVertically(o,r,i.timeStamp),this._valid)return this._lastPoints=t,this._active=!0,{pitchDelta:(o.y+r.y)/2*-.5}},e.prototype.gestureBeginsVertically=function(t,e,i){if(void 0!==this._valid)return this._valid;var o=t.mag()>=2,r=e.mag()>=2;if(o||r){if(!o||!r)return void 0===this._firstMove&&(this._firstMove=i),i-this._firstMove<100&&void 0;var a=t.y>0==e.y>0;return ir(t)&&ir(e)&&a}},e}(Yo),rr={panStep:100,bearingStep:15,pitchStep:10},ar=function(){var t=rr;this._panStep=t.panStep,this._bearingStep=t.bearingStep,this._pitchStep=t.pitchStep;};function nr(t){return t*(2-t)}ar.prototype.reset=function(){this._active=!1;},ar.prototype.keydown=function(t){var e=this;if(!(t.altKey||t.ctrlKey||t.metaKey)){var i=0,o=0,r=0,a=0,n=0;switch(t.keyCode){case 61:case 107:case 171:case 187:i=1;break;case 189:case 109:case 173:i=-1;break;case 37:t.shiftKey?o=-1:(t.preventDefault(),a=-1);break;case 39:t.shiftKey?o=1:(t.preventDefault(),a=1);break;case 38:t.shiftKey?r=1:(t.preventDefault(),n=-1);break;case 40:t.shiftKey?r=-1:(t.preventDefault(),n=1);break;default:return}return {cameraAnimation:function(s){var l=s.getZoom();s.easeTo({duration:300,easeId:"keyboardHandler",easing:nr,zoom:i?Math.round(l)+i*(t.shiftKey?2:1):l,bearing:s.getBearing()+o*e._bearingStep,pitch:s.getPitch()+r*e._pitchStep,offset:[-a*e._panStep,-n*e._panStep],center:s.getCenter()},{originalEvent:t});}}}},ar.prototype.enable=function(){this._enabled=!0;},ar.prototype.disable=function(){this._enabled=!1,this.reset();},ar.prototype.isEnabled=function(){return this._enabled},ar.prototype.isActive=function(){return this._active};var sr=function(e,i){this._map=e,this._el=e.getCanvasContainer(),this._handler=i,this._delta=0,this._defaultZoomRate=.01,this._wheelZoomRate=1/450,t.bindAll(["_onTimeout"],this);};sr.prototype.setZoomRate=function(t){this._defaultZoomRate=t;},sr.prototype.setWheelZoomRate=function(t){this._wheelZoomRate=t;},sr.prototype.isEnabled=function(){return !!this._enabled},sr.prototype.isActive=function(){return !!this._active||void 0!==this._finishTimeout},sr.prototype.isZooming=function(){return !!this._zooming},sr.prototype.enable=function(t){this.isEnabled()||(this._enabled=!0,this._aroundCenter=t&&"center"===t.around);},sr.prototype.disable=function(){this.isEnabled()&&(this._enabled=!1);},sr.prototype.wheel=function(e){if(this.isEnabled()){var i=e.deltaMode===t.window.WheelEvent.DOM_DELTA_LINE?40*e.deltaY:e.deltaY,o=t.browser.now(),r=o-(this._lastWheelEventTime||0);this._lastWheelEventTime=o,0!==i&&i%4.000244140625==0?this._type="wheel":0!==i&&Math.abs(i)<4?this._type="trackpad":r>400?(this._type=null,this._lastValue=i,this._timeout=setTimeout(this._onTimeout,40,e)):this._type||(this._type=Math.abs(r*i)<200?"trackpad":"wheel",this._timeout&&(clearTimeout(this._timeout),this._timeout=null,i+=this._lastValue)),e.shiftKey&&i&&(i/=4),this._type&&(this._lastWheelEvent=e,this._delta-=i,this._active||this._start(e)),e.preventDefault();}},sr.prototype._onTimeout=function(t){this._type="wheel",this._delta-=this._lastValue,this._active||this._start(t);},sr.prototype._start=function(e){if(this._delta){this._frameId&&(this._frameId=null),this._active=!0,this.isZooming()||(this._zooming=!0),this._finishTimeout&&(clearTimeout(this._finishTimeout),delete this._finishTimeout);var o=i.mousePos(this._el,e);this._around=t.LngLat.convert(this._aroundCenter?this._map.getCenter():this._map.unproject(o)),this._aroundPoint=this._map.transform.locationPoint(this._around),this._frameId||(this._frameId=!0,this._handler._triggerRenderFrame());}},sr.prototype.renderFrame=function(){var e=this;if(this._frameId&&(this._frameId=null,this.isActive())){var i=this._map.transform;if(0!==this._delta){var o="wheel"===this._type&&Math.abs(this._delta)>4.000244140625?this._wheelZoomRate:this._defaultZoomRate,r=2/(1+Math.exp(-Math.abs(this._delta*o)));this._delta<0&&0!==r&&(r=1/r);var a="number"==typeof this._targetZoom?i.zoomScale(this._targetZoom):i.scale;this._targetZoom=Math.min(i.maxZoom,Math.max(i.minZoom,i.scaleZoom(a*r))),"wheel"===this._type&&(this._startZoom=i.zoom,this._easing=this._smoothOutEasing(200)),this._delta=0;}var n,s="number"==typeof this._targetZoom?this._targetZoom:i.zoom,l=this._startZoom,c=this._easing,u=!1;if("wheel"===this._type&&l&&c){var h=Math.min((t.browser.now()-this._lastWheelEventTime)/200,1),p=c(h);n=t.number(l,s,p),h<1?this._frameId||(this._frameId=!0):u=!0;}else n=s,u=!0;return this._active=!0,u&&(this._active=!1,this._finishTimeout=setTimeout((function(){e._zooming=!1,e._handler._triggerRenderFrame(),delete e._targetZoom,delete e._finishTimeout;}),200)),{noInertia:!0,needsRenderFrame:!u,zoomDelta:n-i.zoom,around:this._aroundPoint,originalEvent:this._lastWheelEvent}}},sr.prototype._smoothOutEasing=function(e){var i=t.ease;if(this._prevEase){var o=this._prevEase,r=(t.browser.now()-o.start)/o.duration,a=o.easing(r+.01)-o.easing(r),n=.27/Math.sqrt(a*a+1e-4)*.01,s=Math.sqrt(.0729-n*n);i=t.bezier(n,s,.25,1);}return this._prevEase={start:t.browser.now(),duration:e,easing:i},i},sr.prototype.reset=function(){this._active=!1;};var lr=function(t,e){this._clickZoom=t,this._tapZoom=e;};lr.prototype.enable=function(){this._clickZoom.enable(),this._tapZoom.enable();},lr.prototype.disable=function(){this._clickZoom.disable(),this._tapZoom.disable();},lr.prototype.isEnabled=function(){return this._clickZoom.isEnabled()&&this._tapZoom.isEnabled()},lr.prototype.isActive=function(){return this._clickZoom.isActive()||this._tapZoom.isActive()};var cr=function(){this.reset();};cr.prototype.reset=function(){this._active=!1;},cr.prototype.dblclick=function(t,e){return t.preventDefault(),{cameraAnimation:function(i){i.easeTo({duration:300,zoom:i.getZoom()+(t.shiftKey?-1:1),around:i.unproject(e)},{originalEvent:t});}}},cr.prototype.enable=function(){this._enabled=!0;},cr.prototype.disable=function(){this._enabled=!1,this.reset();},cr.prototype.isEnabled=function(){return this._enabled},cr.prototype.isActive=function(){return this._active};var ur=function(){this._tap=new qo({numTouches:1,numTaps:1}),this.reset();};ur.prototype.reset=function(){this._active=!1,delete this._swipePoint,delete this._swipeTouch,delete this._tapTime,this._tap.reset();},ur.prototype.touchstart=function(t,e,i){this._swipePoint||(this._tapTime&&t.timeStamp-this._tapTime>500&&this.reset(),this._tapTime?i.length>0&&(this._swipePoint=e[0],this._swipeTouch=i[0].identifier):this._tap.touchstart(t,e,i));},ur.prototype.touchmove=function(t,e,i){if(this._tapTime){if(this._swipePoint){if(i[0].identifier!==this._swipeTouch)return;var o=e[0],r=o.y-this._swipePoint.y;return this._swipePoint=o,t.preventDefault(),this._active=!0,{zoomDelta:r/128}}}else this._tap.touchmove(t,e,i);},ur.prototype.touchend=function(t,e,i){this._tapTime?this._swipePoint&&0===i.length&&this.reset():this._tap.touchend(t,e,i)&&(this._tapTime=t.timeStamp);},ur.prototype.touchcancel=function(){this.reset();},ur.prototype.enable=function(){this._enabled=!0;},ur.prototype.disable=function(){this._enabled=!1,this.reset();},ur.prototype.isEnabled=function(){return this._enabled},ur.prototype.isActive=function(){return this._active};var hr=function(t,e,i){this._el=t,this._mousePan=e,this._touchPan=i;};hr.prototype.enable=function(t){this._inertiaOptions=t||{},this._mousePan.enable(),this._touchPan.enable(),this._el.classList.add("mapboxgl-touch-drag-pan");},hr.prototype.disable=function(){this._mousePan.disable(),this._touchPan.disable(),this._el.classList.remove("mapboxgl-touch-drag-pan");},hr.prototype.isEnabled=function(){return this._mousePan.isEnabled()&&this._touchPan.isEnabled()},hr.prototype.isActive=function(){return this._mousePan.isActive()||this._touchPan.isActive()};var pr=function(t,e,i){this._pitchWithRotate=t.pitchWithRotate,this._mouseRotate=e,this._mousePitch=i;};pr.prototype.enable=function(){this._mouseRotate.enable(),this._pitchWithRotate&&this._mousePitch.enable();},pr.prototype.disable=function(){this._mouseRotate.disable(),this._mousePitch.disable();},pr.prototype.isEnabled=function(){return this._mouseRotate.isEnabled()&&(!this._pitchWithRotate||this._mousePitch.isEnabled())},pr.prototype.isActive=function(){return this._mouseRotate.isActive()||this._mousePitch.isActive()};var dr=function(t,e,i,o){this._el=t,this._touchZoom=e,this._touchRotate=i,this._tapDragZoom=o,this._rotationDisabled=!1,this._enabled=!0;};dr.prototype.enable=function(t){this._touchZoom.enable(t),this._rotationDisabled||this._touchRotate.enable(t),this._tapDragZoom.enable(),this._el.classList.add("mapboxgl-touch-zoom-rotate");},dr.prototype.disable=function(){this._touchZoom.disable(),this._touchRotate.disable(),this._tapDragZoom.disable(),this._el.classList.remove("mapboxgl-touch-zoom-rotate");},dr.prototype.isEnabled=function(){return this._touchZoom.isEnabled()&&(this._rotationDisabled||this._touchRotate.isEnabled())&&this._tapDragZoom.isEnabled()},dr.prototype.isActive=function(){return this._touchZoom.isActive()||this._touchRotate.isActive()||this._tapDragZoom.isActive()},dr.prototype.disableRotation=function(){this._rotationDisabled=!0,this._touchRotate.disable();},dr.prototype.enableRotation=function(){this._rotationDisabled=!1,this._touchZoom.isEnabled()&&this._touchRotate.enable();};var _r=function(t){return t.zoom||t.drag||t.pitch||t.rotate},fr=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(t.Event);function mr(t){return t.panDelta&&t.panDelta.mag()||t.zoomDelta||t.bearingDelta||t.pitchDelta}var gr=function(e,o){this._map=e,this._el=this._map.getCanvasContainer(),this._handlers=[],this._handlersById={},this._changes=[],this._inertia=new Mo(e),this._bearingSnap=o.bearingSnap,this._previousActiveHandlers={},this._eventsInProgress={},this._addDefaultHandlers(o),t.bindAll(["handleEvent","handleWindowEvent"],this);var r=this._el;this._listeners=[[r,"touchstart",{passive:!0}],[r,"touchmove",{passive:!1}],[r,"touchend",void 0],[r,"touchcancel",void 0],[r,"mousedown",void 0],[r,"mousemove",void 0],[r,"mouseup",void 0],[t.window.document,"mousemove",{capture:!0}],[t.window.document,"mouseup",void 0],[r,"mouseover",void 0],[r,"mouseout",void 0],[r,"dblclick",void 0],[r,"click",void 0],[r,"keydown",{capture:!1}],[r,"keyup",void 0],[r,"wheel",{passive:!1}],[r,"contextmenu",void 0],[t.window,"blur",void 0]];for(var a=0,n=this._listeners;a<n.length;a+=1){var s=n[a],l=s[0];i.addEventListener(l,s[1],l===t.window.document?this.handleWindowEvent:this.handleEvent,s[2]);}};gr.prototype.destroy=function(){for(var e=0,o=this._listeners;e<o.length;e+=1){var r=o[e],a=r[0];i.removeEventListener(a,r[1],a===t.window.document?this.handleWindowEvent:this.handleEvent,r[2]);}},gr.prototype._addDefaultHandlers=function(t){var e=this._map,i=e.getCanvasContainer();this._add("mapEvent",new Oo(e,t));var o=e.boxZoom=new Uo(e,t);this._add("boxZoom",o);var r=new jo,a=new cr;e.doubleClickZoom=new lr(a,r),this._add("tapZoom",r),this._add("clickZoom",a);var n=new ur;this._add("tapDragZoom",n);var s=e.touchPitch=new or;this._add("touchPitch",s);var l=new Xo(t),c=new Ho(t);e.dragRotate=new pr(t,l,c),this._add("mouseRotate",l,["mousePitch"]),this._add("mousePitch",c,["mouseRotate"]);var u=new Wo(t),h=new Ko(t);e.dragPan=new hr(i,u,h),this._add("mousePan",u),this._add("touchPan",h,["touchZoom","touchRotate"]);var p=new er,d=new $o;e.touchZoomRotate=new dr(i,d,p,n),this._add("touchRotate",p,["touchPan","touchZoom"]),this._add("touchZoom",d,["touchPan","touchRotate"]);var _=e.scrollZoom=new sr(e,this);this._add("scrollZoom",_,["mousePan"]);var f=e.keyboard=new ar;this._add("keyboard",f),this._add("blockableMapEvent",new Fo(e));for(var m=0,g=["boxZoom","doubleClickZoom","tapDragZoom","touchPitch","dragRotate","dragPan","touchZoomRotate","scrollZoom","keyboard"];m<g.length;m+=1){var v=g[m];t.interactive&&t[v]&&e[v].enable(t[v]);}},gr.prototype._add=function(t,e,i){this._handlers.push({handlerName:t,handler:e,allowed:i}),this._handlersById[t]=e;},gr.prototype.stop=function(t){if(!this._updatingCamera){for(var e=0,i=this._handlers;e<i.length;e+=1)i[e].handler.reset();this._inertia.clear(),this._fireEvents({},{},t),this._changes=[];}},gr.prototype.isActive=function(){for(var t=0,e=this._handlers;t<e.length;t+=1)if(e[t].handler.isActive())return !0;return !1},gr.prototype.isZooming=function(){return !!this._eventsInProgress.zoom||this._map.scrollZoom.isZooming()},gr.prototype.isRotating=function(){return !!this._eventsInProgress.rotate},gr.prototype.isMoving=function(){return Boolean(_r(this._eventsInProgress))||this.isZooming()},gr.prototype._blockedByActive=function(t,e,i){for(var o in t)if(o!==i&&(!e||e.indexOf(o)<0))return !0;return !1},gr.prototype.handleWindowEvent=function(t){this.handleEvent(t,t.type+"Window");},gr.prototype._getMapTouches=function(t){for(var e=[],i=0,o=t;i<o.length;i+=1){var r=o[i];this._el.contains(r.target)&&e.push(r);}return e},gr.prototype.handleEvent=function(t,e){if("blur"!==t.type){this._updatingCamera=!0;for(var o="renderFrame"===t.type?void 0:t,r={needsRenderFrame:!1},a={},n={},s=t.touches?this._getMapTouches(t.touches):void 0,l=s?i.touchPos(this._el,s):i.mousePos(this._el,t),c=0,u=this._handlers;c<u.length;c+=1){var h=u[c],p=h.handlerName,d=h.handler,_=h.allowed;if(d.isEnabled()){var f=void 0;this._blockedByActive(n,_,p)?d.reset():d[e||t.type]&&(f=d[e||t.type](t,l,s),this.mergeHandlerResult(r,a,f,p,o),f&&f.needsRenderFrame&&this._triggerRenderFrame()),(f||d.isActive())&&(n[p]=d);}}var m={};for(var g in this._previousActiveHandlers)n[g]||(m[g]=o);this._previousActiveHandlers=n,(Object.keys(m).length||mr(r))&&(this._changes.push([r,a,m]),this._triggerRenderFrame()),(Object.keys(n).length||mr(r))&&this._map._stop(!0),this._updatingCamera=!1;var v=r.cameraAnimation;v&&(this._inertia.clear(),this._fireEvents({},{},!0),this._changes=[],v(this._map));}else this.stop(!0);},gr.prototype.mergeHandlerResult=function(e,i,o,r,a){if(o){t.extend(e,o);var n={handlerName:r,originalEvent:o.originalEvent||a};void 0!==o.zoomDelta&&(i.zoom=n),void 0!==o.panDelta&&(i.drag=n),void 0!==o.pitchDelta&&(i.pitch=n),void 0!==o.bearingDelta&&(i.rotate=n);}},gr.prototype._applyChanges=function(){for(var e={},i={},o={},r=0,a=this._changes;r<a.length;r+=1){var n=a[r],s=n[0],l=n[1],c=n[2];s.panDelta&&(e.panDelta=(e.panDelta||new t.Point(0,0))._add(s.panDelta)),s.zoomDelta&&(e.zoomDelta=(e.zoomDelta||0)+s.zoomDelta),s.bearingDelta&&(e.bearingDelta=(e.bearingDelta||0)+s.bearingDelta),s.pitchDelta&&(e.pitchDelta=(e.pitchDelta||0)+s.pitchDelta),void 0!==s.around&&(e.around=s.around),void 0!==s.pinchAround&&(e.pinchAround=s.pinchAround),s.noInertia&&(e.noInertia=s.noInertia),t.extend(i,l),t.extend(o,c);}this._updateMapTransform(e,i,o),this._changes=[];},gr.prototype._updateMapTransform=function(t,e,i){var o=this._map,r=o.transform;if(!mr(t))return this._fireEvents(e,i,!0);var a=t.panDelta,n=t.zoomDelta,s=t.bearingDelta,l=t.pitchDelta,c=t.around,u=t.pinchAround;void 0!==u&&(c=u),o._stop(!0),c=c||o.transform.centerPoint;var h=r.pointLocation(a?c.sub(a):c);s&&(r.bearing+=s),l&&(r.pitch+=l),n&&(r.zoom+=n),r.setLocationAtPoint(h,c),this._map._update(),t.noInertia||this._inertia.record(t),this._fireEvents(e,i,!0);},gr.prototype._fireEvents=function(e,i,o){var r=this,a=_r(this._eventsInProgress),n=_r(e),s={};for(var l in e)this._eventsInProgress[l]||(s[l+"start"]=e[l].originalEvent),this._eventsInProgress[l]=e[l];for(var c in !a&&n&&this._fireEvent("movestart",n.originalEvent),s)this._fireEvent(c,s[c]);for(var u in n&&this._fireEvent("move",n.originalEvent),e)this._fireEvent(u,e[u].originalEvent);var h,p={};for(var d in this._eventsInProgress){var _=this._eventsInProgress[d],f=_.handlerName,m=_.originalEvent;this._handlersById[f].isActive()||(delete this._eventsInProgress[d],p[d+"end"]=h=i[f]||m);}for(var g in p)this._fireEvent(g,p[g]);var v=_r(this._eventsInProgress);if(o&&(a||n)&&!v){this._updatingCamera=!0;var y=this._inertia._onMoveEnd(this._map.dragPan._inertiaOptions),x=function(t){return 0!==t&&-r._bearingSnap<t&&t<r._bearingSnap};y?(x(y.bearing||this._map.getBearing())&&(y.bearing=0),this._map.easeTo(y,{originalEvent:h})):(this._map.fire(new t.Event("moveend",{originalEvent:h})),x(this._map.getBearing())&&this._map.resetNorth()),this._updatingCamera=!1;}},gr.prototype._fireEvent=function(e,i){this._map.fire(new t.Event(e,i?{originalEvent:i}:{}));},gr.prototype._requestFrame=function(){var t=this;return this._map.triggerRepaint(),this._map._renderTaskQueue.add((function(e){delete t._frameId,t.handleEvent(new fr("renderFrame",{timeStamp:e})),t._applyChanges();}))},gr.prototype._triggerRenderFrame=function(){void 0===this._frameId&&(this._frameId=this._requestFrame());};var vr=function(e){function i(i,o){e.call(this),this._moving=!1,this._zooming=!1,this.transform=i,this._bearingSnap=o.bearingSnap,t.bindAll(["_renderFrameCallback"],this);}return e&&(i.__proto__=e),(i.prototype=Object.create(e&&e.prototype)).constructor=i,i.prototype.getCenter=function(){return new t.LngLat(this.transform.center.lng,this.transform.center.lat)},i.prototype.setCenter=function(t,e){return this.jumpTo({center:t},e)},i.prototype.panBy=function(e,i,o){return e=t.Point.convert(e).mult(-1),this.panTo(this.transform.center,t.extend({offset:e},i),o)},i.prototype.panTo=function(e,i,o){return this.easeTo(t.extend({center:e},i),o)},i.prototype.getZoom=function(){return this.transform.zoom},i.prototype.setZoom=function(t,e){return this.jumpTo({zoom:t},e),this},i.prototype.zoomTo=function(e,i,o){return this.easeTo(t.extend({zoom:e},i),o)},i.prototype.zoomIn=function(t,e){return this.zoomTo(this.getZoom()+1,t,e),this},i.prototype.zoomOut=function(t,e){return this.zoomTo(this.getZoom()-1,t,e),this},i.prototype.getBearing=function(){return this.transform.bearing},i.prototype.setBearing=function(t,e){return this.jumpTo({bearing:t},e),this},i.prototype.getPadding=function(){return this.transform.padding},i.prototype.setPadding=function(t,e){return this.jumpTo({padding:t},e),this},i.prototype.rotateTo=function(e,i,o){return this.easeTo(t.extend({bearing:e},i),o)},i.prototype.resetNorth=function(e,i){return this.rotateTo(0,t.extend({duration:1e3},e),i),this},i.prototype.resetNorthPitch=function(e,i){return this.easeTo(t.extend({bearing:0,pitch:0,duration:1e3},e),i),this},i.prototype.snapToNorth=function(t,e){return Math.abs(this.getBearing())<this._bearingSnap?this.resetNorth(t,e):this},i.prototype.getPitch=function(){return this.transform.pitch},i.prototype.setPitch=function(t,e){return this.jumpTo({pitch:t},e),this},i.prototype.cameraForBounds=function(e,i){return e=t.LngLatBounds.convert(e),this._cameraForBoxAndBearing(e.getNorthWest(),e.getSouthEast(),0,i)},i.prototype._cameraForBoxAndBearing=function(e,i,o,r){var a={top:0,bottom:0,right:0,left:0};if("number"==typeof(r=t.extend({padding:a,offset:[0,0],maxZoom:this.transform.maxZoom},r)).padding){var n=r.padding;r.padding={top:n,bottom:n,right:n,left:n};}r.padding=t.extend(a,r.padding);var s=this.transform,l=s.padding,c=s.project(t.LngLat.convert(e)),u=s.project(t.LngLat.convert(i)),h=c.rotate(-o*Math.PI/180),p=u.rotate(-o*Math.PI/180),d=new t.Point(Math.max(h.x,p.x),Math.max(h.y,p.y)),_=new t.Point(Math.min(h.x,p.x),Math.min(h.y,p.y)),f=d.sub(_),m=(s.width-(l.left+l.right+r.padding.left+r.padding.right))/f.x,g=(s.height-(l.top+l.bottom+r.padding.top+r.padding.bottom))/f.y;if(!(g<0||m<0)){var v=Math.min(s.scaleZoom(s.scale*Math.min(m,g)),r.maxZoom),y=t.Point.convert(r.offset),x=new t.Point(y.x+(r.padding.left-r.padding.right)/2,y.y+(r.padding.top-r.padding.bottom)/2).mult(s.scale/s.zoomScale(v));return {center:s.unproject(c.add(u).div(2).sub(x)),zoom:v,bearing:o}}t.warnOnce("Map cannot fit within canvas with the given bounds, padding, and/or offset.");},i.prototype.fitBounds=function(t,e,i){return this._fitInternal(this.cameraForBounds(t,e),e,i)},i.prototype.fitScreenCoordinates=function(e,i,o,r,a){return this._fitInternal(this._cameraForBoxAndBearing(this.transform.pointLocation(t.Point.convert(e)),this.transform.pointLocation(t.Point.convert(i)),o,r),r,a)},i.prototype._fitInternal=function(e,i,o){return e?(delete(i=t.extend(e,i)).padding,i.linear?this.easeTo(i,o):this.flyTo(i,o)):this},i.prototype.jumpTo=function(e,i){this.stop();var o=this.transform,r=!1,a=!1,n=!1;return "zoom"in e&&o.zoom!==+e.zoom&&(r=!0,o.zoom=+e.zoom),void 0!==e.center&&(o.center=t.LngLat.convert(e.center)),"bearing"in e&&o.bearing!==+e.bearing&&(a=!0,o.bearing=+e.bearing),"pitch"in e&&o.pitch!==+e.pitch&&(n=!0,o.pitch=+e.pitch),null==e.padding||o.isPaddingEqual(e.padding)||(o.padding=e.padding),this.fire(new t.Event("movestart",i)).fire(new t.Event("move",i)),r&&this.fire(new t.Event("zoomstart",i)).fire(new t.Event("zoom",i)).fire(new t.Event("zoomend",i)),a&&this.fire(new t.Event("rotatestart",i)).fire(new t.Event("rotate",i)).fire(new t.Event("rotateend",i)),n&&this.fire(new t.Event("pitchstart",i)).fire(new t.Event("pitch",i)).fire(new t.Event("pitchend",i)),this.fire(new t.Event("moveend",i))},i.prototype.easeTo=function(e,i){var o=this;this._stop(!1,e.easeId),(!1===(e=t.extend({offset:[0,0],duration:500,easing:t.ease},e)).animate||!e.essential&&t.browser.prefersReducedMotion)&&(e.duration=0);var r=this.transform,a=this.getZoom(),n=this.getBearing(),s=this.getPitch(),l=this.getPadding(),c="zoom"in e?+e.zoom:a,u="bearing"in e?this._normalizeBearing(e.bearing,n):n,h="pitch"in e?+e.pitch:s,p="padding"in e?e.padding:r.padding,d=t.Point.convert(e.offset),_=r.centerPoint.add(d),f=r.pointLocation(_),m=t.LngLat.convert(e.center||f);this._normalizeCenter(m);var g,v,y=r.project(f),x=r.project(m).sub(y),b=r.zoomScale(c-a);e.around&&(g=t.LngLat.convert(e.around),v=r.locationPoint(g));var w={moving:this._moving,zooming:this._zooming,rotating:this._rotating,pitching:this._pitching};return this._zooming=this._zooming||c!==a,this._rotating=this._rotating||n!==u,this._pitching=this._pitching||h!==s,this._padding=!r.isPaddingEqual(p),this._easeId=e.easeId,this._prepareEase(i,e.noMoveStart,w),this._ease((function(e){if(o._zooming&&(r.zoom=t.number(a,c,e)),o._rotating&&(r.bearing=t.number(n,u,e)),o._pitching&&(r.pitch=t.number(s,h,e)),o._padding&&(r.interpolatePadding(l,p,e),_=r.centerPoint.add(d)),g)r.setLocationAtPoint(g,v);else {var f=r.zoomScale(r.zoom-a),m=c>a?Math.min(2,b):Math.max(.5,b),w=Math.pow(m,1-e),T=r.unproject(y.add(x.mult(e*w)).mult(f));r.setLocationAtPoint(r.renderWorldCopies?T.wrap():T,_);}o._fireMoveEvents(i);}),(function(t){o._afterEase(i,t);}),e),this},i.prototype._prepareEase=function(e,i,o){void 0===o&&(o={}),this._moving=!0,i||o.moving||this.fire(new t.Event("movestart",e)),this._zooming&&!o.zooming&&this.fire(new t.Event("zoomstart",e)),this._rotating&&!o.rotating&&this.fire(new t.Event("rotatestart",e)),this._pitching&&!o.pitching&&this.fire(new t.Event("pitchstart",e));},i.prototype._fireMoveEvents=function(e){this.fire(new t.Event("move",e)),this._zooming&&this.fire(new t.Event("zoom",e)),this._rotating&&this.fire(new t.Event("rotate",e)),this._pitching&&this.fire(new t.Event("pitch",e));},i.prototype._afterEase=function(e,i){if(!this._easeId||!i||this._easeId!==i){delete this._easeId;var o=this._zooming,r=this._rotating,a=this._pitching;this._moving=!1,this._zooming=!1,this._rotating=!1,this._pitching=!1,this._padding=!1,o&&this.fire(new t.Event("zoomend",e)),r&&this.fire(new t.Event("rotateend",e)),a&&this.fire(new t.Event("pitchend",e)),this.fire(new t.Event("moveend",e));}},i.prototype.flyTo=function(e,i){var o=this;if(!e.essential&&t.browser.prefersReducedMotion){var r=t.pick(e,["center","zoom","bearing","pitch","around"]);return this.jumpTo(r,i)}this.stop(),e=t.extend({offset:[0,0],speed:1.2,curve:1.42,easing:t.ease},e);var a=this.transform,n=this.getZoom(),s=this.getBearing(),l=this.getPitch(),c=this.getPadding(),u="zoom"in e?t.clamp(+e.zoom,a.minZoom,a.maxZoom):n,h="bearing"in e?this._normalizeBearing(e.bearing,s):s,p="pitch"in e?+e.pitch:l,d="padding"in e?e.padding:a.padding,_=a.zoomScale(u-n),f=t.Point.convert(e.offset),m=a.centerPoint.add(f),g=a.pointLocation(m),v=t.LngLat.convert(e.center||g);this._normalizeCenter(v);var y=a.project(g),x=a.project(v).sub(y),b=e.curve,w=Math.max(a.width,a.height),T=w/_,E=x.mag();if("minZoom"in e){var I=t.clamp(Math.min(e.minZoom,n,u),a.minZoom,a.maxZoom),P=w/a.zoomScale(I-n);b=Math.sqrt(P/E*2);}var S=b*b;function C(t){var e=(T*T-w*w+(t?-1:1)*S*S*E*E)/(2*(t?T:w)*S*E);return Math.log(Math.sqrt(e*e+1)-e)}function z(t){return (Math.exp(t)-Math.exp(-t))/2}function D(t){return (Math.exp(t)+Math.exp(-t))/2}var M=C(0),L=function(t){return D(M)/D(M+b*t)},A=function(t){return w*((D(M)*(z(e=M+b*t)/D(e))-z(M))/S)/E;var e;},R=(C(1)-M)/b;if(Math.abs(E)<1e-6||!isFinite(R)){if(Math.abs(w-T)<1e-6)return this.easeTo(e,i);var k=T<w?-1:1;R=Math.abs(Math.log(T/w))/b,A=function(){return 0},L=function(t){return Math.exp(k*b*t)};}return e.duration="duration"in e?+e.duration:1e3*R/("screenSpeed"in e?+e.screenSpeed/b:+e.speed),e.maxDuration&&e.duration>e.maxDuration&&(e.duration=0),this._zooming=!0,this._rotating=s!==h,this._pitching=p!==l,this._padding=!a.isPaddingEqual(d),this._prepareEase(i,!1),this._ease((function(e){var r=e*R,_=1/L(r);a.zoom=1===e?u:n+a.scaleZoom(_),o._rotating&&(a.bearing=t.number(s,h,e)),o._pitching&&(a.pitch=t.number(l,p,e)),o._padding&&(a.interpolatePadding(c,d,e),m=a.centerPoint.add(f));var g=1===e?v:a.unproject(y.add(x.mult(A(r))).mult(_));a.setLocationAtPoint(a.renderWorldCopies?g.wrap():g,m),o._fireMoveEvents(i);}),(function(){return o._afterEase(i)}),e),this},i.prototype.isEasing=function(){return !!this._easeFrameId},i.prototype.stop=function(){return this._stop()},i.prototype._stop=function(t,e){if(this._easeFrameId&&(this._cancelRenderFrame(this._easeFrameId),delete this._easeFrameId,delete this._onEaseFrame),this._onEaseEnd){var i=this._onEaseEnd;delete this._onEaseEnd,i.call(this,e);}if(!t){var o=this.handlers;o&&o.stop(!1);}return this},i.prototype._ease=function(e,i,o){!1===o.animate||0===o.duration?(e(1),i()):(this._easeStart=t.browser.now(),this._easeOptions=o,this._onEaseFrame=e,this._onEaseEnd=i,this._easeFrameId=this._requestRenderFrame(this._renderFrameCallback));},i.prototype._renderFrameCallback=function(){var e=Math.min((t.browser.now()-this._easeStart)/this._easeOptions.duration,1);this._onEaseFrame(this._easeOptions.easing(e)),e<1?this._easeFrameId=this._requestRenderFrame(this._renderFrameCallback):this.stop();},i.prototype._normalizeBearing=function(e,i){e=t.wrap(e,-180,180);var o=Math.abs(e-i);return Math.abs(e-360-i)<o&&(e-=360),Math.abs(e+360-i)<o&&(e+=360),e},i.prototype._normalizeCenter=function(t){var e=this.transform;if(e.renderWorldCopies&&!e.lngRange){var i=t.lng-e.center.lng;t.lng+=i>180?-360:i<-180?360:0;}},i}(t.Evented),yr=function(e){void 0===e&&(e={}),this.options=e,t.bindAll(["_updateEditLink","_updateData","_updateCompact"],this);};yr.prototype.getDefaultPosition=function(){return "bottom-right"},yr.prototype.onAdd=function(t){var e=this.options&&this.options.compact;return this._map=t,this._container=i.create("div","mapboxgl-ctrl mapboxgl-ctrl-attrib"),this._innerContainer=i.create("div","mapboxgl-ctrl-attrib-inner",this._container),e&&this._container.classList.add("mapboxgl-compact"),this._updateAttributions(),this._updateEditLink(),this._map.on("styledata",this._updateData),this._map.on("sourcedata",this._updateData),this._map.on("moveend",this._updateEditLink),void 0===e&&(this._map.on("resize",this._updateCompact),this._updateCompact()),this._container},yr.prototype.onRemove=function(){i.remove(this._container),this._map.off("styledata",this._updateData),this._map.off("sourcedata",this._updateData),this._map.off("moveend",this._updateEditLink),this._map.off("resize",this._updateCompact),this._map=void 0,this._attribHTML=void 0;},yr.prototype._updateEditLink=function(){var e=this._editLink;e||(e=this._editLink=this._container.querySelector(".mapbox-improve-map"));var i=[{key:"owner",value:this.styleOwner},{key:"id",value:this.styleId},{key:"access_token",value:this._map._requestManager._customAccessToken||t.config.ACCESS_TOKEN}];if(e){var o=i.reduce((function(t,e,o){return e.value&&(t+=e.key+"="+e.value+(o<i.length-1?"&":"")),t}),"?");e.href=t.config.FEEDBACK_URL+"/"+o+(this._map._hash?this._map._hash.getHashString(!0):""),e.rel="noopener nofollow";}},yr.prototype._updateData=function(t){!t||"metadata"!==t.sourceDataType&&"style"!==t.dataType||(this._updateAttributions(),this._updateEditLink());},yr.prototype._updateAttributions=function(){if(this._map.style){var t=[];if(this.options.customAttribution&&(Array.isArray(this.options.customAttribution)?t=t.concat(this.options.customAttribution.map((function(t){return "string"!=typeof t?"":t}))):"string"==typeof this.options.customAttribution&&t.push(this.options.customAttribution)),this._map.style.stylesheet){var e=this._map.style.stylesheet;this.styleOwner=e.owner,this.styleId=e.id;}var i=this._map.style.sourceCaches;for(var o in i){var r=i[o];if(r.used){var a=r.getSource();a.attribution&&t.indexOf(a.attribution)<0&&t.push(a.attribution);}}t.sort((function(t,e){return t.length-e.length}));var n=(t=t.filter((function(e,i){for(var o=i+1;o<t.length;o++)if(t[o].indexOf(e)>=0)return !1;return !0}))).join(" | ");n!==this._attribHTML&&(this._attribHTML=n,t.length?(this._innerContainer.innerHTML=n,this._container.classList.remove("mapboxgl-attrib-empty")):this._container.classList.add("mapboxgl-attrib-empty"),this._editLink=null);}},yr.prototype._updateCompact=function(){this._map.getCanvasContainer().offsetWidth<=640?this._container.classList.add("mapboxgl-compact"):this._container.classList.remove("mapboxgl-compact");};var xr=function(){t.bindAll(["_updateLogo"],this),t.bindAll(["_updateCompact"],this);};xr.prototype.onAdd=function(t){this._map=t,this._container=i.create("div","mapboxgl-ctrl");var e=i.create("a","mapboxgl-ctrl-logo");return e.target="_blank",e.rel="noopener nofollow",e.href="https://www.mapbox.com/",e.setAttribute("aria-label",this._map._getUIString("LogoControl.Title")),e.setAttribute("rel","noopener nofollow"),this._container.appendChild(e),this._container.style.display="none",this._map.on("sourcedata",this._updateLogo),this._updateLogo(),this._map.on("resize",this._updateCompact),this._updateCompact(),this._container},xr.prototype.onRemove=function(){i.remove(this._container),this._map.off("sourcedata",this._updateLogo),this._map.off("resize",this._updateCompact);},xr.prototype.getDefaultPosition=function(){return "bottom-left"},xr.prototype._updateLogo=function(t){t&&"metadata"!==t.sourceDataType||(this._container.style.display=this._logoRequired()?"block":"none");},xr.prototype._logoRequired=function(){if(this._map.style){var t=this._map.style.sourceCaches;for(var e in t)if(t[e].getSource().mapbox_logo)return !0;return !1}},xr.prototype._updateCompact=function(){var t=this._container.children;if(t.length){var e=t[0];this._map.getCanvasContainer().offsetWidth<250?e.classList.add("mapboxgl-compact"):e.classList.remove("mapboxgl-compact");}};var br=function(){this._queue=[],this._id=0,this._cleared=!1,this._currentlyRunning=!1;};br.prototype.add=function(t){var e=++this._id;return this._queue.push({callback:t,id:e,cancelled:!1}),e},br.prototype.remove=function(t){for(var e=this._currentlyRunning,i=0,o=e?this._queue.concat(e):this._queue;i<o.length;i+=1){var r=o[i];if(r.id===t)return void(r.cancelled=!0)}},br.prototype.run=function(t){void 0===t&&(t=0);var e=this._currentlyRunning=this._queue;this._queue=[];for(var i=0,o=e;i<o.length;i+=1){var r=o[i];if(!r.cancelled&&(r.callback(t),this._cleared))break}this._cleared=!1,this._currentlyRunning=!1;},br.prototype.clear=function(){this._currentlyRunning&&(this._cleared=!0),this._queue=[];};var wr={"FullscreenControl.Enter":"Enter fullscreen","FullscreenControl.Exit":"Exit fullscreen","GeolocateControl.FindMyLocation":"Find my location","GeolocateControl.LocationNotAvailable":"Location not available","LogoControl.Title":"Mapbox logo","NavigationControl.ResetBearing":"Reset bearing to north","NavigationControl.ZoomIn":"Zoom in","NavigationControl.ZoomOut":"Zoom out","ScaleControl.Feet":"ft","ScaleControl.Meters":"m","ScaleControl.Kilometers":"km","ScaleControl.Miles":"mi","ScaleControl.NauticalMiles":"nm"},Tr=t.window.HTMLImageElement,Er=t.window.HTMLElement,Ir=t.window.ImageBitmap,Pr={center:[0,0],zoom:0,bearing:0,pitch:0,minZoom:-2,maxZoom:22,minPitch:0,maxPitch:60,interactive:!0,scrollZoom:!0,boxZoom:!0,dragRotate:!0,dragPan:!0,keyboard:!0,doubleClickZoom:!0,touchZoomRotate:!0,touchPitch:!0,bearingSnap:7,clickTolerance:3,pitchWithRotate:!0,hash:!1,attributionControl:!0,failIfMajorPerformanceCaveat:!1,preserveDrawingBuffer:!1,trackResize:!0,renderWorldCopies:!0,refreshExpiredTiles:!0,maxTileCacheSize:null,localIdeographFontFamily:"sans-serif",transformRequest:null,accessToken:null,fadeDuration:300,crossSourceCollisions:!0},Sr=function(o){function r(e){var i=this;if(null!=(e=t.extend({},Pr,e)).minZoom&&null!=e.maxZoom&&e.minZoom>e.maxZoom)throw new Error("maxZoom must be greater than or equal to minZoom");if(null!=e.minPitch&&null!=e.maxPitch&&e.minPitch>e.maxPitch)throw new Error("maxPitch must be greater than or equal to minPitch");if(null!=e.minPitch&&e.minPitch<0)throw new Error("minPitch must be greater than or equal to 0");if(null!=e.maxPitch&&e.maxPitch>60)throw new Error("maxPitch must be less than or equal to 60");var r=new To(e.minZoom,e.maxZoom,e.minPitch,e.maxPitch,e.renderWorldCopies);if(o.call(this,r,e),this._interactive=e.interactive,this._maxTileCacheSize=e.maxTileCacheSize,this._failIfMajorPerformanceCaveat=e.failIfMajorPerformanceCaveat,this._preserveDrawingBuffer=e.preserveDrawingBuffer,this._antialias=e.antialias,this._trackResize=e.trackResize,this._bearingSnap=e.bearingSnap,this._refreshExpiredTiles=e.refreshExpiredTiles,this._fadeDuration=e.fadeDuration,this._crossSourceCollisions=e.crossSourceCollisions,this._crossFadingFactor=1,this._collectResourceTiming=e.collectResourceTiming,this._renderTaskQueue=new br,this._controls=[],this._mapId=t.uniqueId(),this._locale=t.extend({},wr,e.locale),this._requestManager=new t.RequestManager(e.transformRequest,e.accessToken),"string"==typeof e.container){if(this._container=t.window.document.getElementById(e.container),!this._container)throw new Error("Container '"+e.container+"' not found.")}else {if(!(e.container instanceof Er))throw new Error("Invalid type: 'container' must be a String or HTMLElement.");this._container=e.container;}if(e.maxBounds&&this.setMaxBounds(e.maxBounds),t.bindAll(["_onWindowOnline","_onWindowResize","_contextLost","_contextRestored"],this),this._setupContainer(),this._setupPainter(),void 0===this.painter)throw new Error("Failed to initialize WebGL.");this.on("move",(function(){return i._update(!1)})),this.on("moveend",(function(){return i._update(!1)})),this.on("zoom",(function(){return i._update(!0)})),void 0!==t.window&&(t.window.addEventListener("online",this._onWindowOnline,!1),t.window.addEventListener("resize",this._onWindowResize,!1),t.window.addEventListener("orientationchange",this._onWindowResize,!1)),this.handlers=new gr(this,e),this._hash=e.hash&&new Io("string"==typeof e.hash&&e.hash||void 0).addTo(this),this._hash&&this._hash._onHashChange()||(this.jumpTo({center:e.center,zoom:e.zoom,bearing:e.bearing,pitch:e.pitch}),e.bounds&&(this.resize(),this.fitBounds(e.bounds,t.extend({},e.fitBoundsOptions,{duration:0})))),this.resize(),this._localIdeographFontFamily=e.localIdeographFontFamily,e.style&&this.setStyle(e.style,{localIdeographFontFamily:e.localIdeographFontFamily}),e.attributionControl&&this.addControl(new yr({customAttribution:e.customAttribution})),this.addControl(new xr,e.logoPosition),this.on("style.load",(function(){i.transform.unmodified&&i.jumpTo(i.style.stylesheet);})),this.on("data",(function(e){i._update("style"===e.dataType),i.fire(new t.Event(e.dataType+"data",e));})),this.on("dataloading",(function(e){i.fire(new t.Event(e.dataType+"dataloading",e));}));}o&&(r.__proto__=o),(r.prototype=Object.create(o&&o.prototype)).constructor=r;var a={showTileBoundaries:{configurable:!0},showPadding:{configurable:!0},showCollisionBoxes:{configurable:!0},showOverdrawInspector:{configurable:!0},repaint:{configurable:!0},vertices:{configurable:!0},version:{configurable:!0}};return r.prototype._getMapId=function(){return this._mapId},r.prototype.addControl=function(e,i){if(void 0===i&&e.getDefaultPosition&&(i=e.getDefaultPosition()),void 0===i&&(i="top-right"),!e||!e.onAdd)return this.fire(new t.ErrorEvent(new Error("Invalid argument to map.addControl(). Argument must be a control with onAdd and onRemove methods.")));var o=e.onAdd(this);this._controls.push(e);var r=this._controlPositions[i];return -1!==i.indexOf("bottom")?r.insertBefore(o,r.firstChild):r.appendChild(o),this},r.prototype.removeControl=function(e){if(!e||!e.onRemove)return this.fire(new t.ErrorEvent(new Error("Invalid argument to map.removeControl(). Argument must be a control with onAdd and onRemove methods.")));var i=this._controls.indexOf(e);return i>-1&&this._controls.splice(i,1),e.onRemove(this),this},r.prototype.resize=function(e){var i=this._containerDimensions(),o=i[0],r=i[1];this._resizeCanvas(o,r),this.transform.resize(o,r),this.painter.resize(o,r);var a=!this._moving;return a&&(this.stop(),this.fire(new t.Event("movestart",e)).fire(new t.Event("move",e))),this.fire(new t.Event("resize",e)),a&&this.fire(new t.Event("moveend",e)),this},r.prototype.getBounds=function(){return this.transform.getBounds()},r.prototype.getMaxBounds=function(){return this.transform.getMaxBounds()},r.prototype.setMaxBounds=function(e){return this.transform.setMaxBounds(t.LngLatBounds.convert(e)),this._update()},r.prototype.setMinZoom=function(t){if((t=null==t?-2:t)>=-2&&t<=this.transform.maxZoom)return this.transform.minZoom=t,this._update(),this.getZoom()<t&&this.setZoom(t),this;throw new Error("minZoom must be between -2 and the current maxZoom, inclusive")},r.prototype.getMinZoom=function(){return this.transform.minZoom},r.prototype.setMaxZoom=function(t){if((t=null==t?22:t)>=this.transform.minZoom)return this.transform.maxZoom=t,this._update(),this.getZoom()>t&&this.setZoom(t),this;throw new Error("maxZoom must be greater than the current minZoom")},r.prototype.getMaxZoom=function(){return this.transform.maxZoom},r.prototype.setMinPitch=function(t){if((t=null==t?0:t)<0)throw new Error("minPitch must be greater than or equal to 0");if(t>=0&&t<=this.transform.maxPitch)return this.transform.minPitch=t,this._update(),this.getPitch()<t&&this.setPitch(t),this;throw new Error("minPitch must be between 0 and the current maxPitch, inclusive")},r.prototype.getMinPitch=function(){return this.transform.minPitch},r.prototype.setMaxPitch=function(t){if((t=null==t?60:t)>60)throw new Error("maxPitch must be less than or equal to 60");if(t>=this.transform.minPitch)return this.transform.maxPitch=t,this._update(),this.getPitch()>t&&this.setPitch(t),this;throw new Error("maxPitch must be greater than the current minPitch")},r.prototype.getMaxPitch=function(){return this.transform.maxPitch},r.prototype.getRenderWorldCopies=function(){return this.transform.renderWorldCopies},r.prototype.setRenderWorldCopies=function(t){return this.transform.renderWorldCopies=t,this._update()},r.prototype.project=function(e){return this.transform.locationPoint(t.LngLat.convert(e))},r.prototype.unproject=function(e){return this.transform.pointLocation(t.Point.convert(e))},r.prototype.isMoving=function(){return this._moving||this.handlers.isMoving()},r.prototype.isZooming=function(){return this._zooming||this.handlers.isZooming()},r.prototype.isRotating=function(){return this._rotating||this.handlers.isRotating()},r.prototype._createDelegatedListener=function(t,e,i){var o,r=this;if("mouseenter"===t||"mouseover"===t){var a=!1;return {layer:e,listener:i,delegates:{mousemove:function(o){var n=r.getLayer(e)?r.queryRenderedFeatures(o.point,{layers:[e]}):[];n.length?a||(a=!0,i.call(r,new Ro(t,r,o.originalEvent,{features:n}))):a=!1;},mouseout:function(){a=!1;}}}}if("mouseleave"===t||"mouseout"===t){var n=!1;return {layer:e,listener:i,delegates:{mousemove:function(o){(r.getLayer(e)?r.queryRenderedFeatures(o.point,{layers:[e]}):[]).length?n=!0:n&&(n=!1,i.call(r,new Ro(t,r,o.originalEvent)));},mouseout:function(e){n&&(n=!1,i.call(r,new Ro(t,r,e.originalEvent)));}}}}return {layer:e,listener:i,delegates:(o={},o[t]=function(t){var o=r.getLayer(e)?r.queryRenderedFeatures(t.point,{layers:[e]}):[];o.length&&(t.features=o,i.call(r,t),delete t.features);},o)}},r.prototype.on=function(t,e,i){if(void 0===i)return o.prototype.on.call(this,t,e);var r=this._createDelegatedListener(t,e,i);for(var a in this._delegatedListeners=this._delegatedListeners||{},this._delegatedListeners[t]=this._delegatedListeners[t]||[],this._delegatedListeners[t].push(r),r.delegates)this.on(a,r.delegates[a]);return this},r.prototype.once=function(t,e,i){if(void 0===i)return o.prototype.once.call(this,t,e);var r=this._createDelegatedListener(t,e,i);for(var a in r.delegates)this.once(a,r.delegates[a]);return this},r.prototype.off=function(t,e,i){var r=this;return void 0===i?o.prototype.off.call(this,t,e):(this._delegatedListeners&&this._delegatedListeners[t]&&function(o){for(var a=o[t],n=0;n<a.length;n++){var s=a[n];if(s.layer===e&&s.listener===i){for(var l in s.delegates)r.off(l,s.delegates[l]);return a.splice(n,1),r}}}(this._delegatedListeners),this)},r.prototype.queryRenderedFeatures=function(e,i){if(!this.style)return [];var o;if(void 0!==i||void 0===e||e instanceof t.Point||Array.isArray(e)||(i=e,e=void 0),i=i||{},(e=e||[[0,0],[this.transform.width,this.transform.height]])instanceof t.Point||"number"==typeof e[0])o=[t.Point.convert(e)];else {var r=t.Point.convert(e[0]),a=t.Point.convert(e[1]);o=[r,new t.Point(a.x,r.y),a,new t.Point(r.x,a.y),r];}return this.style.queryRenderedFeatures(o,i,this.transform)},r.prototype.querySourceFeatures=function(t,e){return this.style.querySourceFeatures(t,e)},r.prototype.setStyle=function(e,i){return !1!==(i=t.extend({},{localIdeographFontFamily:this._localIdeographFontFamily},i)).diff&&i.localIdeographFontFamily===this._localIdeographFontFamily&&this.style&&e?(this._diffStyle(e,i),this):(this._localIdeographFontFamily=i.localIdeographFontFamily,this._updateStyle(e,i))},r.prototype._getUIString=function(t){var e=this._locale[t];if(null==e)throw new Error("Missing UI string '"+t+"'");return e},r.prototype._updateStyle=function(t,e){return this.style&&(this.style.setEventedParent(null),this.style._remove()),t?(this.style=new je(this,e||{}),this.style.setEventedParent(this,{style:this.style}),"string"==typeof t?this.style.loadURL(t):this.style.loadJSON(t),this):(delete this.style,this)},r.prototype._lazyInitEmptyStyle=function(){this.style||(this.style=new je(this,{}),this.style.setEventedParent(this,{style:this.style}),this.style.loadEmpty());},r.prototype._diffStyle=function(e,i){var o=this;if("string"==typeof e){var r=this._requestManager.normalizeStyleURL(e),a=this._requestManager.transformRequest(r,t.ResourceType.Style);t.getJSON(a,(function(e,r){e?o.fire(new t.ErrorEvent(e)):r&&o._updateDiff(r,i);}));}else "object"==typeof e&&this._updateDiff(e,i);},r.prototype._updateDiff=function(e,i){try{this.style.setState(e)&&this._update(!0);}catch(o){t.warnOnce("Unable to perform style diff: "+(o.message||o.error||o)+".  Rebuilding the style from scratch."),this._updateStyle(e,i);}},r.prototype.getStyle=function(){if(this.style)return this.style.serialize()},r.prototype.isStyleLoaded=function(){return this.style?this.style.loaded():t.warnOnce("There is no style added to the map.")},r.prototype.addSource=function(t,e){return this._lazyInitEmptyStyle(),this.style.addSource(t,e),this._update(!0)},r.prototype.isSourceLoaded=function(e){var i=this.style&&this.style.sourceCaches[e];if(void 0!==i)return i.loaded();this.fire(new t.ErrorEvent(new Error("There is no source with ID '"+e+"'")));},r.prototype.areTilesLoaded=function(){var t=this.style&&this.style.sourceCaches;for(var e in t){var i=t[e]._tiles;for(var o in i){var r=i[o];if("loaded"!==r.state&&"errored"!==r.state)return !1}}return !0},r.prototype.addSourceType=function(t,e,i){return this._lazyInitEmptyStyle(),this.style.addSourceType(t,e,i)},r.prototype.removeSource=function(t){return this.style.removeSource(t),this._update(!0)},r.prototype.getSource=function(t){return this.style.getSource(t)},r.prototype.addImage=function(e,i,o){void 0===o&&(o={});var r=o.pixelRatio;void 0===r&&(r=1);var a=o.sdf;void 0===a&&(a=!1);var n=o.stretchX,s=o.stretchY,l=o.content;if(this._lazyInitEmptyStyle(),i instanceof Tr||Ir&&i instanceof Ir){var c=t.browser.getImageData(i);this.style.addImage(e,{data:new t.RGBAImage({width:c.width,height:c.height},c.data),pixelRatio:r,stretchX:n,stretchY:s,content:l,sdf:a,version:0});}else {if(void 0===i.width||void 0===i.height)return this.fire(new t.ErrorEvent(new Error("Invalid arguments to map.addImage(). The second argument must be an `HTMLImageElement`, `ImageData`, `ImageBitmap`, or object with `width`, `height`, and `data` properties with the same format as `ImageData`")));var u=i;this.style.addImage(e,{data:new t.RGBAImage({width:i.width,height:i.height},new Uint8Array(i.data)),pixelRatio:r,stretchX:n,stretchY:s,content:l,sdf:a,version:0,userImage:u}),u.onAdd&&u.onAdd(this,e);}},r.prototype.updateImage=function(e,i){var o=this.style.getImage(e);if(!o)return this.fire(new t.ErrorEvent(new Error("The map has no image with that id. If you are adding a new image use `map.addImage(...)` instead.")));var r=i instanceof Tr||Ir&&i instanceof Ir?t.browser.getImageData(i):i,a=r.width,n=r.height,s=r.data;return void 0===a||void 0===n?this.fire(new t.ErrorEvent(new Error("Invalid arguments to map.updateImage(). The second argument must be an `HTMLImageElement`, `ImageData`, `ImageBitmap`, or object with `width`, `height`, and `data` properties with the same format as `ImageData`"))):a!==o.data.width||n!==o.data.height?this.fire(new t.ErrorEvent(new Error("The width and height of the updated image must be that same as the previous version of the image"))):(o.data.replace(s,!(i instanceof Tr||Ir&&i instanceof Ir)),void this.style.updateImage(e,o))},r.prototype.hasImage=function(e){return e?!!this.style.getImage(e):(this.fire(new t.ErrorEvent(new Error("Missing required image id"))),!1)},r.prototype.removeImage=function(t){this.style.removeImage(t);},r.prototype.loadImage=function(e,i){t.getImage(this._requestManager.transformRequest(e,t.ResourceType.Image),i);},r.prototype.listImages=function(){return this.style.listImages()},r.prototype.addLayer=function(t,e){return this._lazyInitEmptyStyle(),this.style.addLayer(t,e),this._update(!0)},r.prototype.moveLayer=function(t,e){return this.style.moveLayer(t,e),this._update(!0)},r.prototype.removeLayer=function(t){return this.style.removeLayer(t),this._update(!0)},r.prototype.getLayer=function(t){return this.style.getLayer(t)},r.prototype.setLayerZoomRange=function(t,e,i){return this.style.setLayerZoomRange(t,e,i),this._update(!0)},r.prototype.setFilter=function(t,e,i){return void 0===i&&(i={}),this.style.setFilter(t,e,i),this._update(!0)},r.prototype.getFilter=function(t){return this.style.getFilter(t)},r.prototype.setPaintProperty=function(t,e,i,o){return void 0===o&&(o={}),this.style.setPaintProperty(t,e,i,o),this._update(!0)},r.prototype.getPaintProperty=function(t,e){return this.style.getPaintProperty(t,e)},r.prototype.setLayoutProperty=function(t,e,i,o){return void 0===o&&(o={}),this.style.setLayoutProperty(t,e,i,o),this._update(!0)},r.prototype.getLayoutProperty=function(t,e){return this.style.getLayoutProperty(t,e)},r.prototype.setLight=function(t,e){return void 0===e&&(e={}),this._lazyInitEmptyStyle(),this.style.setLight(t,e),this._update(!0)},r.prototype.getLight=function(){return this.style.getLight()},r.prototype.setFeatureState=function(t,e){return this.style.setFeatureState(t,e),this._update()},r.prototype.removeFeatureState=function(t,e){return this.style.removeFeatureState(t,e),this._update()},r.prototype.getFeatureState=function(t){return this.style.getFeatureState(t)},r.prototype.getContainer=function(){return this._container},r.prototype.getCanvasContainer=function(){return this._canvasContainer},r.prototype.getCanvas=function(){return this._canvas},r.prototype._containerDimensions=function(){var t=0,e=0;return this._container&&(t=this._container.clientWidth||400,e=this._container.clientHeight||300),[t,e]},r.prototype._detectMissingCSS=function(){"rgb(250, 128, 114)"!==t.window.getComputedStyle(this._missingCSSCanary).getPropertyValue("background-color")&&t.warnOnce("This page appears to be missing CSS declarations for Mapbox GL JS, which may cause the map to display incorrectly. Please ensure your page includes mapbox-gl.css, as described in https://www.mapbox.com/mapbox-gl-js/api/.");},r.prototype._setupContainer=function(){var t=this._container;t.classList.add("mapboxgl-map"),(this._missingCSSCanary=i.create("div","mapboxgl-canary",t)).style.visibility="hidden",this._detectMissingCSS();var e=this._canvasContainer=i.create("div","mapboxgl-canvas-container",t);this._interactive&&e.classList.add("mapboxgl-interactive"),this._canvas=i.create("canvas","mapboxgl-canvas",e),this._canvas.addEventListener("webglcontextlost",this._contextLost,!1),this._canvas.addEventListener("webglcontextrestored",this._contextRestored,!1),this._canvas.setAttribute("tabindex","0"),this._canvas.setAttribute("aria-label","Map");var o=this._containerDimensions();this._resizeCanvas(o[0],o[1]);var r=this._controlContainer=i.create("div","mapboxgl-control-container",t),a=this._controlPositions={};["top-left","top-right","bottom-left","bottom-right"].forEach((function(t){a[t]=i.create("div","mapboxgl-ctrl-"+t,r);}));},r.prototype._resizeCanvas=function(e,i){var o=t.browser.devicePixelRatio||1;this._canvas.width=o*e,this._canvas.height=o*i,this._canvas.style.width=e+"px",this._canvas.style.height=i+"px";},r.prototype._setupPainter=function(){var i=t.extend({},e.webGLContextAttributes,{failIfMajorPerformanceCaveat:this._failIfMajorPerformanceCaveat,preserveDrawingBuffer:this._preserveDrawingBuffer,antialias:this._antialias||!1}),o=this._canvas.getContext("webgl",i)||this._canvas.getContext("experimental-webgl",i);o?(this.painter=new yo(o,this.transform),t.webpSupported.testSupport(o)):this.fire(new t.ErrorEvent(new Error("Failed to initialize WebGL")));},r.prototype._contextLost=function(e){e.preventDefault(),this._frame&&(this._frame.cancel(),this._frame=null),this.fire(new t.Event("webglcontextlost",{originalEvent:e}));},r.prototype._contextRestored=function(e){this._setupPainter(),this.resize(),this._update(),this.fire(new t.Event("webglcontextrestored",{originalEvent:e}));},r.prototype.loaded=function(){return !this._styleDirty&&!this._sourcesDirty&&!!this.style&&this.style.loaded()},r.prototype._update=function(t){return this.style?(this._styleDirty=this._styleDirty||t,this._sourcesDirty=!0,this.triggerRepaint(),this):this},r.prototype._requestRenderFrame=function(t){return this._update(),this._renderTaskQueue.add(t)},r.prototype._cancelRenderFrame=function(t){this._renderTaskQueue.remove(t);},r.prototype._render=function(e){var i,o=this,r=0,a=this.painter.context.extTimerQuery;if(this.listens("gpu-timing-frame")&&(i=a.createQueryEXT(),a.beginQueryEXT(a.TIME_ELAPSED_EXT,i),r=t.browser.now()),this.painter.context.setDirty(),this.painter.setBaseState(),this._renderTaskQueue.run(e),!this._removed){var n=!1;if(this.style&&this._styleDirty){this._styleDirty=!1;var s=this.transform.zoom,l=t.browser.now();this.style.zoomHistory.update(s,l);var c=new t.EvaluationParameters(s,{now:l,fadeDuration:this._fadeDuration,zoomHistory:this.style.zoomHistory,transition:this.style.getTransition()}),u=c.crossFadingFactor();1===u&&u===this._crossFadingFactor||(n=!0,this._crossFadingFactor=u),this.style.update(c);}if(this.style&&this._sourcesDirty&&(this._sourcesDirty=!1,this.style._updateSources(this.transform)),this._placementDirty=this.style&&this.style._updatePlacement(this.painter.transform,this.showCollisionBoxes,this._fadeDuration,this._crossSourceCollisions),this.painter.render(this.style,{showTileBoundaries:this.showTileBoundaries,showOverdrawInspector:this._showOverdrawInspector,rotating:this.isRotating(),zooming:this.isZooming(),moving:this.isMoving(),fadeDuration:this._fadeDuration,showPadding:this.showPadding,gpuTiming:!!this.listens("gpu-timing-layer")}),this.fire(new t.Event("render")),this.loaded()&&!this._loaded&&(this._loaded=!0,this.fire(new t.Event("load"))),this.style&&(this.style.hasTransitions()||n)&&(this._styleDirty=!0),this.style&&!this._placementDirty&&this.style._releaseSymbolFadeTiles(),this.listens("gpu-timing-frame")){var h=t.browser.now()-r;a.endQueryEXT(a.TIME_ELAPSED_EXT,i),setTimeout((function(){var e=a.getQueryObjectEXT(i,a.QUERY_RESULT_EXT)/1e6;a.deleteQueryEXT(i),o.fire(new t.Event("gpu-timing-frame",{cpuTime:h,gpuTime:e}));}),50);}if(this.listens("gpu-timing-layer")){var p=this.painter.collectGpuTimers();setTimeout((function(){var e=o.painter.queryGpuTimers(p);o.fire(new t.Event("gpu-timing-layer",{layerTimes:e}));}),50);}var d=this._sourcesDirty||this._styleDirty||this._placementDirty;return d||this._repaint?this.triggerRepaint():!this.isMoving()&&this.loaded()&&this.fire(new t.Event("idle")),!this._loaded||this._fullyLoaded||d||(this._fullyLoaded=!0),this}},r.prototype.remove=function(){this._hash&&this._hash.remove();for(var e=0,i=this._controls;e<i.length;e+=1)i[e].onRemove(this);this._controls=[],this._frame&&(this._frame.cancel(),this._frame=null),this._renderTaskQueue.clear(),this.painter.destroy(),this.handlers.destroy(),delete this.handlers,this.setStyle(null),void 0!==t.window&&(t.window.removeEventListener("resize",this._onWindowResize,!1),t.window.removeEventListener("orientationchange",this._onWindowResize,!1),t.window.removeEventListener("online",this._onWindowOnline,!1));var o=this.painter.context.gl.getExtension("WEBGL_lose_context");o&&o.loseContext(),Cr(this._canvasContainer),Cr(this._controlContainer),Cr(this._missingCSSCanary),this._container.classList.remove("mapboxgl-map"),this._removed=!0,this.fire(new t.Event("remove"));},r.prototype.triggerRepaint=function(){var e=this;this.style&&!this._frame&&(this._frame=t.browser.frame((function(t){e._frame=null,e._render(t);})));},r.prototype._onWindowOnline=function(){this._update();},r.prototype._onWindowResize=function(t){this._trackResize&&this.resize({originalEvent:t})._update();},a.showTileBoundaries.get=function(){return !!this._showTileBoundaries},a.showTileBoundaries.set=function(t){this._showTileBoundaries!==t&&(this._showTileBoundaries=t,this._update());},a.showPadding.get=function(){return !!this._showPadding},a.showPadding.set=function(t){this._showPadding!==t&&(this._showPadding=t,this._update());},a.showCollisionBoxes.get=function(){return !!this._showCollisionBoxes},a.showCollisionBoxes.set=function(t){this._showCollisionBoxes!==t&&(this._showCollisionBoxes=t,t?this.style._generateCollisionBoxes():this._update());},a.showOverdrawInspector.get=function(){return !!this._showOverdrawInspector},a.showOverdrawInspector.set=function(t){this._showOverdrawInspector!==t&&(this._showOverdrawInspector=t,this._update());},a.repaint.get=function(){return !!this._repaint},a.repaint.set=function(t){this._repaint!==t&&(this._repaint=t,this.triggerRepaint());},a.vertices.get=function(){return !!this._vertices},a.vertices.set=function(t){this._vertices=t,this._update();},r.prototype._setCacheLimits=function(e,i){t.setCacheLimits(e,i);},a.version.get=function(){return t.version},Object.defineProperties(r.prototype,a),r}(vr);function Cr(t){t.parentNode&&t.parentNode.removeChild(t);}var zr={showCompass:!0,showZoom:!0,visualizePitch:!1},Dr=function(e){var o=this;this.options=t.extend({},zr,e),this._container=i.create("div","mapboxgl-ctrl mapboxgl-ctrl-group"),this._container.addEventListener("contextmenu",(function(t){return t.preventDefault()})),this.options.showZoom&&(t.bindAll(["_setButtonTitle","_updateZoomButtons"],this),this._zoomInButton=this._createButton("mapboxgl-ctrl-zoom-in",(function(t){return o._map.zoomIn({},{originalEvent:t})})),i.create("span","mapboxgl-ctrl-icon",this._zoomInButton).setAttribute("aria-hidden",!0),this._zoomOutButton=this._createButton("mapboxgl-ctrl-zoom-out",(function(t){return o._map.zoomOut({},{originalEvent:t})})),i.create("span","mapboxgl-ctrl-icon",this._zoomOutButton).setAttribute("aria-hidden",!0)),this.options.showCompass&&(t.bindAll(["_rotateCompassArrow"],this),this._compass=this._createButton("mapboxgl-ctrl-compass",(function(t){o.options.visualizePitch?o._map.resetNorthPitch({},{originalEvent:t}):o._map.resetNorth({},{originalEvent:t});})),this._compassIcon=i.create("span","mapboxgl-ctrl-icon",this._compass),this._compassIcon.setAttribute("aria-hidden",!0));};Dr.prototype._updateZoomButtons=function(){var t=this._map.getZoom();this._zoomInButton.disabled=t===this._map.getMaxZoom(),this._zoomOutButton.disabled=t===this._map.getMinZoom();},Dr.prototype._rotateCompassArrow=function(){var t=this.options.visualizePitch?"scale("+1/Math.pow(Math.cos(this._map.transform.pitch*(Math.PI/180)),.5)+") rotateX("+this._map.transform.pitch+"deg) rotateZ("+this._map.transform.angle*(180/Math.PI)+"deg)":"rotate("+this._map.transform.angle*(180/Math.PI)+"deg)";this._compassIcon.style.transform=t;},Dr.prototype.onAdd=function(t){return this._map=t,this.options.showZoom&&(this._setButtonTitle(this._zoomInButton,"ZoomIn"),this._setButtonTitle(this._zoomOutButton,"ZoomOut"),this._map.on("zoom",this._updateZoomButtons),this._updateZoomButtons()),this.options.showCompass&&(this._setButtonTitle(this._compass,"ResetBearing"),this.options.visualizePitch&&this._map.on("pitch",this._rotateCompassArrow),this._map.on("rotate",this._rotateCompassArrow),this._rotateCompassArrow(),this._handler=new Mr(this._map,this._compass,this.options.visualizePitch)),this._container},Dr.prototype.onRemove=function(){i.remove(this._container),this.options.showZoom&&this._map.off("zoom",this._updateZoomButtons),this.options.showCompass&&(this.options.visualizePitch&&this._map.off("pitch",this._rotateCompassArrow),this._map.off("rotate",this._rotateCompassArrow),this._handler.off(),delete this._handler),delete this._map;},Dr.prototype._createButton=function(t,e){var o=i.create("button",t,this._container);return o.type="button",o.addEventListener("click",e),o},Dr.prototype._setButtonTitle=function(t,e){var i=this._map._getUIString("NavigationControl."+e);t.title=i,t.setAttribute("aria-label",i);};var Mr=function(e,o,r){void 0===r&&(r=!1),this._clickTolerance=10,this.element=o,this.mouseRotate=new Xo({clickTolerance:e.dragRotate._mouseRotate._clickTolerance}),this.map=e,r&&(this.mousePitch=new Ho({clickTolerance:e.dragRotate._mousePitch._clickTolerance})),t.bindAll(["mousedown","mousemove","mouseup","touchstart","touchmove","touchend","reset"],this),i.addEventListener(o,"mousedown",this.mousedown),i.addEventListener(o,"touchstart",this.touchstart,{passive:!1}),i.addEventListener(o,"touchmove",this.touchmove),i.addEventListener(o,"touchend",this.touchend),i.addEventListener(o,"touchcancel",this.reset);};function Lr(e,i,o){if(e=new t.LngLat(e.lng,e.lat),i){var r=new t.LngLat(e.lng-360,e.lat),a=new t.LngLat(e.lng+360,e.lat),n=o.locationPoint(e).distSqr(i);o.locationPoint(r).distSqr(i)<n?e=r:o.locationPoint(a).distSqr(i)<n&&(e=a);}for(;Math.abs(e.lng-o.center.lng)>180;){var s=o.locationPoint(e);if(s.x>=0&&s.y>=0&&s.x<=o.width&&s.y<=o.height)break;e.lng>o.center.lng?e.lng-=360:e.lng+=360;}return e}Mr.prototype.down=function(t,e){this.mouseRotate.mousedown(t,e),this.mousePitch&&this.mousePitch.mousedown(t,e),i.disableDrag();},Mr.prototype.move=function(t,e){var i=this.map,o=this.mouseRotate.mousemoveWindow(t,e);if(o&&o.bearingDelta&&i.setBearing(i.getBearing()+o.bearingDelta),this.mousePitch){var r=this.mousePitch.mousemoveWindow(t,e);r&&r.pitchDelta&&i.setPitch(i.getPitch()+r.pitchDelta);}},Mr.prototype.off=function(){var t=this.element;i.removeEventListener(t,"mousedown",this.mousedown),i.removeEventListener(t,"touchstart",this.touchstart,{passive:!1}),i.removeEventListener(t,"touchmove",this.touchmove),i.removeEventListener(t,"touchend",this.touchend),i.removeEventListener(t,"touchcancel",this.reset),this.offTemp();},Mr.prototype.offTemp=function(){i.enableDrag(),i.removeEventListener(t.window,"mousemove",this.mousemove),i.removeEventListener(t.window,"mouseup",this.mouseup);},Mr.prototype.mousedown=function(e){this.down(t.extend({},e,{ctrlKey:!0,preventDefault:function(){return e.preventDefault()}}),i.mousePos(this.element,e)),i.addEventListener(t.window,"mousemove",this.mousemove),i.addEventListener(t.window,"mouseup",this.mouseup);},Mr.prototype.mousemove=function(t){this.move(t,i.mousePos(this.element,t));},Mr.prototype.mouseup=function(t){this.mouseRotate.mouseupWindow(t),this.mousePitch&&this.mousePitch.mouseupWindow(t),this.offTemp();},Mr.prototype.touchstart=function(t){1!==t.targetTouches.length?this.reset():(this._startPos=this._lastPos=i.touchPos(this.element,t.targetTouches)[0],this.down({type:"mousedown",button:0,ctrlKey:!0,preventDefault:function(){return t.preventDefault()}},this._startPos));},Mr.prototype.touchmove=function(t){1!==t.targetTouches.length?this.reset():(this._lastPos=i.touchPos(this.element,t.targetTouches)[0],this.move({preventDefault:function(){return t.preventDefault()}},this._lastPos));},Mr.prototype.touchend=function(t){0===t.targetTouches.length&&this._startPos&&this._lastPos&&this._startPos.dist(this._lastPos)<this._clickTolerance&&this.element.click(),this.reset();},Mr.prototype.reset=function(){this.mouseRotate.reset(),this.mousePitch&&this.mousePitch.reset(),delete this._startPos,delete this._lastPos,this.offTemp();};var Ar={center:"translate(-50%,-50%)",top:"translate(-50%,0)","top-left":"translate(0,0)","top-right":"translate(-100%,0)",bottom:"translate(-50%,-100%)","bottom-left":"translate(0,-100%)","bottom-right":"translate(-100%,-100%)",left:"translate(0,-50%)",right:"translate(-100%,-50%)"};function Rr(t,e,i){var o=t.classList;for(var r in Ar)o.remove("mapboxgl-"+i+"-anchor-"+r);o.add("mapboxgl-"+i+"-anchor-"+e);}var kr,Br=function(e){function o(o,r){var a=this;if(e.call(this),(o instanceof t.window.HTMLElement||r)&&(o=t.extend({element:o},r)),t.bindAll(["_update","_onMove","_onUp","_addDragHandler","_onMapClick","_onKeyPress"],this),this._anchor=o&&o.anchor||"center",this._color=o&&o.color||"#3FB1CE",this._scale=o&&o.scale||1,this._draggable=o&&o.draggable||!1,this._state="inactive",this._rotation=o&&o.rotation||0,this._rotationAlignment=o&&o.rotationAlignment||"auto",this._pitchAlignment=o&&o.pitchAlignment&&"auto"!==o.pitchAlignment?o.pitchAlignment:this._rotationAlignment,o&&o.element)this._element=o.element,this._offset=t.Point.convert(o&&o.offset||[0,0]);else {this._defaultMarker=!0,this._element=i.create("div"),this._element.setAttribute("aria-label","Map marker");var n=i.createNS("http://www.w3.org/2000/svg","svg");n.setAttributeNS(null,"display","block"),n.setAttributeNS(null,"height","41px"),n.setAttributeNS(null,"width","27px"),n.setAttributeNS(null,"viewBox","0 0 27 41");var s=i.createNS("http://www.w3.org/2000/svg","g");s.setAttributeNS(null,"stroke","none"),s.setAttributeNS(null,"stroke-width","1"),s.setAttributeNS(null,"fill","none"),s.setAttributeNS(null,"fill-rule","evenodd");var l=i.createNS("http://www.w3.org/2000/svg","g");l.setAttributeNS(null,"fill-rule","nonzero");var c=i.createNS("http://www.w3.org/2000/svg","g");c.setAttributeNS(null,"transform","translate(3.0, 29.0)"),c.setAttributeNS(null,"fill","#000000");for(var u=0,h=[{rx:"10.5",ry:"5.25002273"},{rx:"10.5",ry:"5.25002273"},{rx:"9.5",ry:"4.77275007"},{rx:"8.5",ry:"4.29549936"},{rx:"7.5",ry:"3.81822308"},{rx:"6.5",ry:"3.34094679"},{rx:"5.5",ry:"2.86367051"},{rx:"4.5",ry:"2.38636864"}];u<h.length;u+=1){var p=h[u],d=i.createNS("http://www.w3.org/2000/svg","ellipse");d.setAttributeNS(null,"opacity","0.04"),d.setAttributeNS(null,"cx","10.5"),d.setAttributeNS(null,"cy","5.80029008"),d.setAttributeNS(null,"rx",p.rx),d.setAttributeNS(null,"ry",p.ry),c.appendChild(d);}var _=i.createNS("http://www.w3.org/2000/svg","g");_.setAttributeNS(null,"fill",this._color);var f=i.createNS("http://www.w3.org/2000/svg","path");f.setAttributeNS(null,"d","M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z"),_.appendChild(f);var m=i.createNS("http://www.w3.org/2000/svg","g");m.setAttributeNS(null,"opacity","0.25"),m.setAttributeNS(null,"fill","#000000");var g=i.createNS("http://www.w3.org/2000/svg","path");g.setAttributeNS(null,"d","M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z"),m.appendChild(g);var v=i.createNS("http://www.w3.org/2000/svg","g");v.setAttributeNS(null,"transform","translate(6.0, 7.0)"),v.setAttributeNS(null,"fill","#FFFFFF");var y=i.createNS("http://www.w3.org/2000/svg","g");y.setAttributeNS(null,"transform","translate(8.0, 8.0)");var x=i.createNS("http://www.w3.org/2000/svg","circle");x.setAttributeNS(null,"fill","#000000"),x.setAttributeNS(null,"opacity","0.25"),x.setAttributeNS(null,"cx","5.5"),x.setAttributeNS(null,"cy","5.5"),x.setAttributeNS(null,"r","5.4999962");var b=i.createNS("http://www.w3.org/2000/svg","circle");b.setAttributeNS(null,"fill","#FFFFFF"),b.setAttributeNS(null,"cx","5.5"),b.setAttributeNS(null,"cy","5.5"),b.setAttributeNS(null,"r","5.4999962"),y.appendChild(x),y.appendChild(b),l.appendChild(c),l.appendChild(_),l.appendChild(m),l.appendChild(v),l.appendChild(y),n.appendChild(l),n.setAttributeNS(null,"height",41*this._scale+"px"),n.setAttributeNS(null,"width",27*this._scale+"px"),this._element.appendChild(n),this._offset=t.Point.convert(o&&o.offset||[0,-14]);}this._element.classList.add("mapboxgl-marker"),this._element.addEventListener("dragstart",(function(t){t.preventDefault();})),this._element.addEventListener("mousedown",(function(t){t.preventDefault();})),this._element.addEventListener("focus",(function(){var t=a._map.getContainer();t.scrollTop=0,t.scrollLeft=0;})),Rr(this._element,this._anchor,"marker"),this._popup=null;}return e&&(o.__proto__=e),(o.prototype=Object.create(e&&e.prototype)).constructor=o,o.prototype.addTo=function(t){return this.remove(),this._map=t,t.getCanvasContainer().appendChild(this._element),t.on("move",this._update),t.on("moveend",this._update),this.setDraggable(this._draggable),this._update(),this._map.on("click",this._onMapClick),this},o.prototype.remove=function(){return this._map&&(this._map.off("click",this._onMapClick),this._map.off("move",this._update),this._map.off("moveend",this._update),this._map.off("mousedown",this._addDragHandler),this._map.off("touchstart",this._addDragHandler),this._map.off("mouseup",this._onUp),this._map.off("touchend",this._onUp),this._map.off("mousemove",this._onMove),this._map.off("touchmove",this._onMove),delete this._map),i.remove(this._element),this._popup&&this._popup.remove(),this},o.prototype.getLngLat=function(){return this._lngLat},o.prototype.setLngLat=function(e){return this._lngLat=t.LngLat.convert(e),this._pos=null,this._popup&&this._popup.setLngLat(this._lngLat),this._update(),this},o.prototype.getElement=function(){return this._element},o.prototype.setPopup=function(t){if(this._popup&&(this._popup.remove(),this._popup=null,this._element.removeEventListener("keypress",this._onKeyPress),this._originalTabIndex||this._element.removeAttribute("tabindex")),t){if(!("offset"in t.options)){var e=Math.sqrt(Math.pow(13.5,2)/2);t.options.offset=this._defaultMarker?{top:[0,0],"top-left":[0,0],"top-right":[0,0],bottom:[0,-38.1],"bottom-left":[e,-1*(24.6+e)],"bottom-right":[-e,-1*(24.6+e)],left:[13.5,-24.6],right:[-13.5,-24.6]}:this._offset;}this._popup=t,this._lngLat&&this._popup.setLngLat(this._lngLat),this._originalTabIndex=this._element.getAttribute("tabindex"),this._originalTabIndex||this._element.setAttribute("tabindex","0"),this._element.addEventListener("keypress",this._onKeyPress);}return this},o.prototype._onKeyPress=function(t){var e=t.code,i=t.charCode||t.keyCode;"Space"!==e&&"Enter"!==e&&32!==i&&13!==i||this.togglePopup();},o.prototype._onMapClick=function(t){var e=t.originalEvent.target,i=this._element;this._popup&&(e===i||i.contains(e))&&this.togglePopup();},o.prototype.getPopup=function(){return this._popup},o.prototype.togglePopup=function(){var t=this._popup;return t?(t.isOpen()?t.remove():t.addTo(this._map),this):this},o.prototype._update=function(t){if(this._map){this._map.transform.renderWorldCopies&&(this._lngLat=Lr(this._lngLat,this._pos,this._map.transform)),this._pos=this._map.project(this._lngLat)._add(this._offset);var e="";"viewport"===this._rotationAlignment||"auto"===this._rotationAlignment?e="rotateZ("+this._rotation+"deg)":"map"===this._rotationAlignment&&(e="rotateZ("+(this._rotation-this._map.getBearing())+"deg)");var o="";"viewport"===this._pitchAlignment||"auto"===this._pitchAlignment?o="rotateX(0deg)":"map"===this._pitchAlignment&&(o="rotateX("+this._map.getPitch()+"deg)"),t&&"moveend"!==t.type||(this._pos=this._pos.round()),i.setTransform(this._element,Ar[this._anchor]+" translate("+this._pos.x+"px, "+this._pos.y+"px) "+o+" "+e);}},o.prototype.getOffset=function(){return this._offset},o.prototype.setOffset=function(e){return this._offset=t.Point.convert(e),this._update(),this},o.prototype._onMove=function(e){this._pos=e.point.sub(this._positionDelta),this._lngLat=this._map.unproject(this._pos),this.setLngLat(this._lngLat),this._element.style.pointerEvents="none","pending"===this._state&&(this._state="active",this.fire(new t.Event("dragstart"))),this.fire(new t.Event("drag"));},o.prototype._onUp=function(){this._element.style.pointerEvents="auto",this._positionDelta=null,this._map.off("mousemove",this._onMove),this._map.off("touchmove",this._onMove),"active"===this._state&&this.fire(new t.Event("dragend")),this._state="inactive";},o.prototype._addDragHandler=function(t){this._element.contains(t.originalEvent.target)&&(t.preventDefault(),this._positionDelta=t.point.sub(this._pos).add(this._offset),this._state="pending",this._map.on("mousemove",this._onMove),this._map.on("touchmove",this._onMove),this._map.once("mouseup",this._onUp),this._map.once("touchend",this._onUp));},o.prototype.setDraggable=function(t){return this._draggable=!!t,this._map&&(t?(this._map.on("mousedown",this._addDragHandler),this._map.on("touchstart",this._addDragHandler)):(this._map.off("mousedown",this._addDragHandler),this._map.off("touchstart",this._addDragHandler))),this},o.prototype.isDraggable=function(){return this._draggable},o.prototype.setRotation=function(t){return this._rotation=t||0,this._update(),this},o.prototype.getRotation=function(){return this._rotation},o.prototype.setRotationAlignment=function(t){return this._rotationAlignment=t||"auto",this._update(),this},o.prototype.getRotationAlignment=function(){return this._rotationAlignment},o.prototype.setPitchAlignment=function(t){return this._pitchAlignment=t&&"auto"!==t?t:this._rotationAlignment,this._update(),this},o.prototype.getPitchAlignment=function(){return this._pitchAlignment},o}(t.Evented),Or={positionOptions:{enableHighAccuracy:!1,maximumAge:0,timeout:6e3},fitBoundsOptions:{maxZoom:15},trackUserLocation:!1,showAccuracyCircle:!0,showUserLocation:!0},Fr=0,Ur=!1,Nr=function(e){function o(i){e.call(this),this.options=t.extend({},Or,i),t.bindAll(["_onSuccess","_onError","_onZoom","_finish","_setupUI","_updateCamera","_updateMarker"],this);}return e&&(o.__proto__=e),(o.prototype=Object.create(e&&e.prototype)).constructor=o,o.prototype.onAdd=function(e){var o;return this._map=e,this._container=i.create("div","mapboxgl-ctrl mapboxgl-ctrl-group"),o=this._setupUI,void 0!==kr?o(kr):void 0!==t.window.navigator.permissions?t.window.navigator.permissions.query({name:"geolocation"}).then((function(t){o(kr="denied"!==t.state);})):o(kr=!!t.window.navigator.geolocation),this._container},o.prototype.onRemove=function(){void 0!==this._geolocationWatchID&&(t.window.navigator.geolocation.clearWatch(this._geolocationWatchID),this._geolocationWatchID=void 0),this.options.showUserLocation&&this._userLocationDotMarker&&this._userLocationDotMarker.remove(),this.options.showAccuracyCircle&&this._accuracyCircleMarker&&this._accuracyCircleMarker.remove(),i.remove(this._container),this._map.off("zoom",this._onZoom),this._map=void 0,Fr=0,Ur=!1;},o.prototype._isOutOfMapMaxBounds=function(t){var e=this._map.getMaxBounds(),i=t.coords;return e&&(i.longitude<e.getWest()||i.longitude>e.getEast()||i.latitude<e.getSouth()||i.latitude>e.getNorth())},o.prototype._setErrorState=function(){switch(this._watchState){case"WAITING_ACTIVE":this._watchState="ACTIVE_ERROR",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error");break;case"ACTIVE_LOCK":this._watchState="ACTIVE_ERROR",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting");break;case"BACKGROUND":this._watchState="BACKGROUND_ERROR",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background-error"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting");}},o.prototype._onSuccess=function(e){if(this._map){if(this._isOutOfMapMaxBounds(e))return this._setErrorState(),this.fire(new t.Event("outofmaxbounds",e)),this._updateMarker(),void this._finish();if(this.options.trackUserLocation)switch(this._lastKnownPosition=e,this._watchState){case"WAITING_ACTIVE":case"ACTIVE_LOCK":case"ACTIVE_ERROR":this._watchState="ACTIVE_LOCK",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");break;case"BACKGROUND":case"BACKGROUND_ERROR":this._watchState="BACKGROUND",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background");}this.options.showUserLocation&&"OFF"!==this._watchState&&this._updateMarker(e),this.options.trackUserLocation&&"ACTIVE_LOCK"!==this._watchState||this._updateCamera(e),this.options.showUserLocation&&this._dotElement.classList.remove("mapboxgl-user-location-dot-stale"),this.fire(new t.Event("geolocate",e)),this._finish();}},o.prototype._updateCamera=function(e){var i=new t.LngLat(e.coords.longitude,e.coords.latitude),o=e.coords.accuracy,r=this._map.getBearing(),a=t.extend({bearing:r},this.options.fitBoundsOptions);this._map.fitBounds(i.toBounds(o),a,{geolocateSource:!0});},o.prototype._updateMarker=function(e){if(e){var i=new t.LngLat(e.coords.longitude,e.coords.latitude);this._accuracyCircleMarker.setLngLat(i).addTo(this._map),this._userLocationDotMarker.setLngLat(i).addTo(this._map),this._accuracy=e.coords.accuracy,this.options.showUserLocation&&this.options.showAccuracyCircle&&this._updateCircleRadius();}else this._userLocationDotMarker.remove(),this._accuracyCircleMarker.remove();},o.prototype._updateCircleRadius=function(){var t=this._map._container.clientHeight/2,e=this._map.unproject([0,t]),i=this._map.unproject([1,t]),o=e.distanceTo(i),r=Math.ceil(2*this._accuracy/o);this._circleElement.style.width=r+"px",this._circleElement.style.height=r+"px";},o.prototype._onZoom=function(){this.options.showUserLocation&&this.options.showAccuracyCircle&&this._updateCircleRadius();},o.prototype._onError=function(e){if(this._map){if(this.options.trackUserLocation)if(1===e.code){this._watchState="OFF",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"),this._geolocateButton.disabled=!0;var i=this._map._getUIString("GeolocateControl.LocationNotAvailable");this._geolocateButton.title=i,this._geolocateButton.setAttribute("aria-label",i),void 0!==this._geolocationWatchID&&this._clearWatch();}else {if(3===e.code&&Ur)return;this._setErrorState();}"OFF"!==this._watchState&&this.options.showUserLocation&&this._dotElement.classList.add("mapboxgl-user-location-dot-stale"),this.fire(new t.Event("error",e)),this._finish();}},o.prototype._finish=function(){this._timeoutId&&clearTimeout(this._timeoutId),this._timeoutId=void 0;},o.prototype._setupUI=function(e){var o=this;if(this._container.addEventListener("contextmenu",(function(t){return t.preventDefault()})),this._geolocateButton=i.create("button","mapboxgl-ctrl-geolocate",this._container),i.create("span","mapboxgl-ctrl-icon",this._geolocateButton).setAttribute("aria-hidden",!0),this._geolocateButton.type="button",!1===e){t.warnOnce("Geolocation support is not available so the GeolocateControl will be disabled.");var r=this._map._getUIString("GeolocateControl.LocationNotAvailable");this._geolocateButton.disabled=!0,this._geolocateButton.title=r,this._geolocateButton.setAttribute("aria-label",r);}else {var a=this._map._getUIString("GeolocateControl.FindMyLocation");this._geolocateButton.title=a,this._geolocateButton.setAttribute("aria-label",a);}this.options.trackUserLocation&&(this._geolocateButton.setAttribute("aria-pressed","false"),this._watchState="OFF"),this.options.showUserLocation&&(this._dotElement=i.create("div","mapboxgl-user-location-dot"),this._userLocationDotMarker=new Br(this._dotElement),this._circleElement=i.create("div","mapboxgl-user-location-accuracy-circle"),this._accuracyCircleMarker=new Br({element:this._circleElement,pitchAlignment:"map"}),this.options.trackUserLocation&&(this._watchState="OFF"),this._map.on("zoom",this._onZoom)),this._geolocateButton.addEventListener("click",this.trigger.bind(this)),this._setup=!0,this.options.trackUserLocation&&this._map.on("movestart",(function(e){e.geolocateSource||"ACTIVE_LOCK"!==o._watchState||e.originalEvent&&"resize"===e.originalEvent.type||(o._watchState="BACKGROUND",o._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background"),o._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"),o.fire(new t.Event("trackuserlocationend")));}));},o.prototype.trigger=function(){if(!this._setup)return t.warnOnce("Geolocate control triggered before added to a map"),!1;if(this.options.trackUserLocation){switch(this._watchState){case"OFF":this._watchState="WAITING_ACTIVE",this.fire(new t.Event("trackuserlocationstart"));break;case"WAITING_ACTIVE":case"ACTIVE_LOCK":case"ACTIVE_ERROR":case"BACKGROUND_ERROR":Fr--,Ur=!1,this._watchState="OFF",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"),this.fire(new t.Event("trackuserlocationend"));break;case"BACKGROUND":this._watchState="ACTIVE_LOCK",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"),this._lastKnownPosition&&this._updateCamera(this._lastKnownPosition),this.fire(new t.Event("trackuserlocationstart"));}switch(this._watchState){case"WAITING_ACTIVE":this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");break;case"ACTIVE_LOCK":this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");break;case"ACTIVE_ERROR":this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error");break;case"BACKGROUND":this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background");break;case"BACKGROUND_ERROR":this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background-error");}if("OFF"===this._watchState&&void 0!==this._geolocationWatchID)this._clearWatch();else if(void 0===this._geolocationWatchID){var e;this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.setAttribute("aria-pressed","true"),++Fr>1?(e={maximumAge:6e5,timeout:0},Ur=!0):(e=this.options.positionOptions,Ur=!1),this._geolocationWatchID=t.window.navigator.geolocation.watchPosition(this._onSuccess,this._onError,e);}}else t.window.navigator.geolocation.getCurrentPosition(this._onSuccess,this._onError,this.options.positionOptions),this._timeoutId=setTimeout(this._finish,1e4);return !0},o.prototype._clearWatch=function(){t.window.navigator.geolocation.clearWatch(this._geolocationWatchID),this._geolocationWatchID=void 0,this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.setAttribute("aria-pressed","false"),this.options.showUserLocation&&this._updateMarker(null);},o}(t.Evented),Zr={maxWidth:100,unit:"metric"},qr=function(e){this.options=t.extend({},Zr,e),t.bindAll(["_onMove","setUnit"],this);};function jr(t,e,i){var o=i&&i.maxWidth||100,r=t._container.clientHeight/2,a=t.unproject([0,r]),n=t.unproject([o,r]),s=a.distanceTo(n);if(i&&"imperial"===i.unit){var l=3.2808*s;l>5280?Vr(e,o,l/5280,t._getUIString("ScaleControl.Miles")):Vr(e,o,l,t._getUIString("ScaleControl.Feet"));}else i&&"nautical"===i.unit?Vr(e,o,s/1852,t._getUIString("ScaleControl.NauticalMiles")):s>=1e3?Vr(e,o,s/1e3,t._getUIString("ScaleControl.Kilometers")):Vr(e,o,s,t._getUIString("ScaleControl.Meters"));}function Vr(t,e,i,o){var r,a,n,s=(r=i,(a=Math.pow(10,(""+Math.floor(r)).length-1))*(n=(n=r/a)>=10?10:n>=5?5:n>=3?3:n>=2?2:n>=1?1:function(t){var e=Math.pow(10,Math.ceil(-Math.log(t)/Math.LN10));return Math.round(t*e)/e}(n)));t.style.width=e*(s/i)+"px",t.innerHTML=s+"&nbsp;"+o;}qr.prototype.getDefaultPosition=function(){return "bottom-left"},qr.prototype._onMove=function(){jr(this._map,this._container,this.options);},qr.prototype.onAdd=function(t){return this._map=t,this._container=i.create("div","mapboxgl-ctrl mapboxgl-ctrl-scale",t.getContainer()),this._map.on("move",this._onMove),this._onMove(),this._container},qr.prototype.onRemove=function(){i.remove(this._container),this._map.off("move",this._onMove),this._map=void 0;},qr.prototype.setUnit=function(t){this.options.unit=t,jr(this._map,this._container,this.options);};var Gr=function(e){this._fullscreen=!1,e&&e.container&&(e.container instanceof t.window.HTMLElement?this._container=e.container:t.warnOnce("Full screen control 'container' must be a DOM element.")),t.bindAll(["_onClickFullscreen","_changeIcon"],this),"onfullscreenchange"in t.window.document?this._fullscreenchange="fullscreenchange":"onmozfullscreenchange"in t.window.document?this._fullscreenchange="mozfullscreenchange":"onwebkitfullscreenchange"in t.window.document?this._fullscreenchange="webkitfullscreenchange":"onmsfullscreenchange"in t.window.document&&(this._fullscreenchange="MSFullscreenChange");};Gr.prototype.onAdd=function(e){return this._map=e,this._container||(this._container=this._map.getContainer()),this._controlContainer=i.create("div","mapboxgl-ctrl mapboxgl-ctrl-group"),this._checkFullscreenSupport()?this._setupUI():(this._controlContainer.style.display="none",t.warnOnce("This device does not support fullscreen mode.")),this._controlContainer},Gr.prototype.onRemove=function(){i.remove(this._controlContainer),this._map=null,t.window.document.removeEventListener(this._fullscreenchange,this._changeIcon);},Gr.prototype._checkFullscreenSupport=function(){return !!(t.window.document.fullscreenEnabled||t.window.document.mozFullScreenEnabled||t.window.document.msFullscreenEnabled||t.window.document.webkitFullscreenEnabled)},Gr.prototype._setupUI=function(){var e=this._fullscreenButton=i.create("button","mapboxgl-ctrl-fullscreen",this._controlContainer);i.create("span","mapboxgl-ctrl-icon",e).setAttribute("aria-hidden",!0),e.type="button",this._updateTitle(),this._fullscreenButton.addEventListener("click",this._onClickFullscreen),t.window.document.addEventListener(this._fullscreenchange,this._changeIcon);},Gr.prototype._updateTitle=function(){var t=this._getTitle();this._fullscreenButton.setAttribute("aria-label",t),this._fullscreenButton.title=t;},Gr.prototype._getTitle=function(){return this._map._getUIString(this._isFullscreen()?"FullscreenControl.Exit":"FullscreenControl.Enter")},Gr.prototype._isFullscreen=function(){return this._fullscreen},Gr.prototype._changeIcon=function(){(t.window.document.fullscreenElement||t.window.document.mozFullScreenElement||t.window.document.webkitFullscreenElement||t.window.document.msFullscreenElement)===this._container!==this._fullscreen&&(this._fullscreen=!this._fullscreen,this._fullscreenButton.classList.toggle("mapboxgl-ctrl-shrink"),this._fullscreenButton.classList.toggle("mapboxgl-ctrl-fullscreen"),this._updateTitle());},Gr.prototype._onClickFullscreen=function(){this._isFullscreen()?t.window.document.exitFullscreen?t.window.document.exitFullscreen():t.window.document.mozCancelFullScreen?t.window.document.mozCancelFullScreen():t.window.document.msExitFullscreen?t.window.document.msExitFullscreen():t.window.document.webkitCancelFullScreen&&t.window.document.webkitCancelFullScreen():this._container.requestFullscreen?this._container.requestFullscreen():this._container.mozRequestFullScreen?this._container.mozRequestFullScreen():this._container.msRequestFullscreen?this._container.msRequestFullscreen():this._container.webkitRequestFullscreen&&this._container.webkitRequestFullscreen();};var Wr={closeButton:!0,closeOnClick:!0,className:"",maxWidth:"240px"},Xr=function(e){function o(i){e.call(this),this.options=t.extend(Object.create(Wr),i),t.bindAll(["_update","_onClose","remove","_onMouseMove","_onMouseUp","_onDrag"],this);}return e&&(o.__proto__=e),(o.prototype=Object.create(e&&e.prototype)).constructor=o,o.prototype.addTo=function(e){return this._map&&this.remove(),this._map=e,this.options.closeOnClick&&this._map.on("click",this._onClose),this.options.closeOnMove&&this._map.on("move",this._onClose),this._map.on("remove",this.remove),this._update(),this._trackPointer?(this._map.on("mousemove",this._onMouseMove),this._map.on("mouseup",this._onMouseUp),this._container&&this._container.classList.add("mapboxgl-popup-track-pointer"),this._map._canvasContainer.classList.add("mapboxgl-track-pointer")):this._map.on("move",this._update),this.fire(new t.Event("open")),this},o.prototype.isOpen=function(){return !!this._map},o.prototype.remove=function(){return this._content&&i.remove(this._content),this._container&&(i.remove(this._container),delete this._container),this._map&&(this._map.off("move",this._update),this._map.off("move",this._onClose),this._map.off("click",this._onClose),this._map.off("remove",this.remove),this._map.off("mousemove",this._onMouseMove),this._map.off("mouseup",this._onMouseUp),this._map.off("drag",this._onDrag),delete this._map),this.fire(new t.Event("close")),this},o.prototype.getLngLat=function(){return this._lngLat},o.prototype.setLngLat=function(e){return this._lngLat=t.LngLat.convert(e),this._pos=null,this._trackPointer=!1,this._update(),this._map&&(this._map.on("move",this._update),this._map.off("mousemove",this._onMouseMove),this._container&&this._container.classList.remove("mapboxgl-popup-track-pointer"),this._map._canvasContainer.classList.remove("mapboxgl-track-pointer")),this},o.prototype.trackPointer=function(){return this._trackPointer=!0,this._pos=null,this._update(),this._map&&(this._map.off("move",this._update),this._map.on("mousemove",this._onMouseMove),this._map.on("drag",this._onDrag),this._container&&this._container.classList.add("mapboxgl-popup-track-pointer"),this._map._canvasContainer.classList.add("mapboxgl-track-pointer")),this},o.prototype.getElement=function(){return this._container},o.prototype.setText=function(e){return this.setDOMContent(t.window.document.createTextNode(e))},o.prototype.setHTML=function(e){var i,o=t.window.document.createDocumentFragment(),r=t.window.document.createElement("body");for(r.innerHTML=e;i=r.firstChild;)o.appendChild(i);return this.setDOMContent(o)},o.prototype.getMaxWidth=function(){return this._container&&this._container.style.maxWidth},o.prototype.setMaxWidth=function(t){return this.options.maxWidth=t,this._update(),this},o.prototype.setDOMContent=function(t){return this._createContent(),this._content.appendChild(t),this._update(),this},o.prototype.addClassName=function(t){this._container&&this._container.classList.add(t);},o.prototype.removeClassName=function(t){this._container&&this._container.classList.remove(t);},o.prototype.toggleClassName=function(t){if(this._container)return this._container.classList.toggle(t)},o.prototype._createContent=function(){this._content&&i.remove(this._content),this._content=i.create("div","mapboxgl-popup-content",this._container),this.options.closeButton&&(this._closeButton=i.create("button","mapboxgl-popup-close-button",this._content),this._closeButton.type="button",this._closeButton.setAttribute("aria-label","Close popup"),this._closeButton.innerHTML="&#215;",this._closeButton.addEventListener("click",this._onClose));},o.prototype._onMouseUp=function(t){this._update(t.point);},o.prototype._onMouseMove=function(t){this._update(t.point);},o.prototype._onDrag=function(t){this._update(t.point);},o.prototype._update=function(e){var o=this;if(this._map&&(this._lngLat||this._trackPointer)&&this._content&&(this._container||(this._container=i.create("div","mapboxgl-popup",this._map.getContainer()),this._tip=i.create("div","mapboxgl-popup-tip",this._container),this._container.appendChild(this._content),this.options.className&&this.options.className.split(" ").forEach((function(t){return o._container.classList.add(t)})),this._trackPointer&&this._container.classList.add("mapboxgl-popup-track-pointer")),this.options.maxWidth&&this._container.style.maxWidth!==this.options.maxWidth&&(this._container.style.maxWidth=this.options.maxWidth),this._map.transform.renderWorldCopies&&!this._trackPointer&&(this._lngLat=Lr(this._lngLat,this._pos,this._map.transform)),!this._trackPointer||e)){var r=this._pos=this._trackPointer&&e?e:this._map.project(this._lngLat),a=this.options.anchor,n=function e(i){if(i){if("number"==typeof i){var o=Math.round(Math.sqrt(.5*Math.pow(i,2)));return {center:new t.Point(0,0),top:new t.Point(0,i),"top-left":new t.Point(o,o),"top-right":new t.Point(-o,o),bottom:new t.Point(0,-i),"bottom-left":new t.Point(o,-o),"bottom-right":new t.Point(-o,-o),left:new t.Point(i,0),right:new t.Point(-i,0)}}if(i instanceof t.Point||Array.isArray(i)){var r=t.Point.convert(i);return {center:r,top:r,"top-left":r,"top-right":r,bottom:r,"bottom-left":r,"bottom-right":r,left:r,right:r}}return {center:t.Point.convert(i.center||[0,0]),top:t.Point.convert(i.top||[0,0]),"top-left":t.Point.convert(i["top-left"]||[0,0]),"top-right":t.Point.convert(i["top-right"]||[0,0]),bottom:t.Point.convert(i.bottom||[0,0]),"bottom-left":t.Point.convert(i["bottom-left"]||[0,0]),"bottom-right":t.Point.convert(i["bottom-right"]||[0,0]),left:t.Point.convert(i.left||[0,0]),right:t.Point.convert(i.right||[0,0])}}return e(new t.Point(0,0))}(this.options.offset);if(!a){var s,l=this._container.offsetWidth,c=this._container.offsetHeight;s=r.y+n.bottom.y<c?["top"]:r.y>this._map.transform.height-c?["bottom"]:[],r.x<l/2?s.push("left"):r.x>this._map.transform.width-l/2&&s.push("right"),a=0===s.length?"bottom":s.join("-");}var u=r.add(n[a]).round();i.setTransform(this._container,Ar[a]+" translate("+u.x+"px,"+u.y+"px)"),Rr(this._container,a,"popup");}},o.prototype._onClose=function(){this.remove();},o}(t.Evented),Hr={version:t.version,supported:e,setRTLTextPlugin:t.setRTLTextPlugin,getRTLTextPluginStatus:t.getRTLTextPluginStatus,Map:Sr,NavigationControl:Dr,GeolocateControl:Nr,AttributionControl:yr,ScaleControl:qr,FullscreenControl:Gr,Popup:Xr,Marker:Br,Style:je,LngLat:t.LngLat,LngLatBounds:t.LngLatBounds,Point:t.Point,MercatorCoordinate:t.MercatorCoordinate,Evented:t.Evented,config:t.config,prewarm:function(){Ft().acquire(Rt);},clearPrewarmedResources:function(){var t=Bt;t&&(t.isPreloaded()&&1===t.numActive()?(t.release(Rt),Bt=null):console.warn("Could not clear WebWorkers since there are active Map instances that still reference it. The pre-warmed WebWorker pool can only be cleared when all map instances have been removed with map.remove()"));},get accessToken(){return t.config.ACCESS_TOKEN},set accessToken(e){t.config.ACCESS_TOKEN=e;},get baseApiUrl(){return t.config.API_URL},set baseApiUrl(e){t.config.API_URL=e;},get workerCount(){return kt.workerCount},set workerCount(t){kt.workerCount=t;},get maxParallelImageRequests(){return t.config.MAX_PARALLEL_IMAGE_REQUESTS},set maxParallelImageRequests(e){t.config.MAX_PARALLEL_IMAGE_REQUESTS=e;},clearStorage:function(e){t.clearTileCache(e);},workerUrl:""};return Hr}));

  //

  return mapboxgl;

  })));

  });

  var {
    console: console_1
  } = globals;
  var file$1 = "src/components/Map.svelte";

  function create_fragment$1(ctx) {
    var link;
    var t0;
    var div1;
    var legend;
    var t1;
    var div0;
    var current;
    legend = new Legend({
      props: {
        data:
        /*data*/
        ctx[0],
        stops:
        /*stops*/
        ctx[1],
        mapFill:
        /*mapFill*/
        ctx[2],
        label:
        /*legendLabel*/
        ctx[3]
      },
      $$inline: true
    });
    var block = {
      c: function create() {
        link = element("link");
        t0 = space();
        div1 = element("div");
        create_component(legend.$$.fragment);
        t1 = space();
        div0 = element("div");
        this.h();
      },
      l: function claim(nodes) {
        var head_nodes = query_selector_all("[data-svelte=\"svelte-2vjbm0\"]", document.head);
        link = claim_element(head_nodes, "LINK", {
          href: true,
          rel: true
        });
        head_nodes.forEach(detach_dev);
        t0 = claim_space(nodes);
        div1 = claim_element(nodes, "DIV", {
          class: true
        });
        var div1_nodes = children(div1);
        claim_component(legend.$$.fragment, div1_nodes);
        t1 = claim_space(div1_nodes);
        div0 = claim_element(div1_nodes, "DIV", {
          class: true
        });
        children(div0).forEach(detach_dev);
        div1_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(link, "href", "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css");
        attr_dev(link, "rel", "stylesheet");
        add_location(link, file$1, 118, 2, 2943);
        attr_dev(div0, "class", "map svelte-lsrd4t");
        add_location(div0, file$1, 122, 2, 3135);
        attr_dev(div1, "class", "map-wrapper svelte-lsrd4t");
        add_location(div1, file$1, 120, 0, 3049);
      },
      m: function mount(target, anchor) {
        append_dev(document.head, link);
        insert_dev(target, t0, anchor);
        insert_dev(target, div1, anchor);
        mount_component(legend, div1, null);
        append_dev(div1, t1);
        append_dev(div1, div0);
        /*div0_binding*/

        ctx[7](div0);
        current = true;
      },
      p: function update(ctx, _ref) {
        var [dirty] = _ref;
        var legend_changes = {};
        if (dirty &
        /*data*/
        1) legend_changes.data =
        /*data*/
        ctx[0];
        if (dirty &
        /*stops*/
        2) legend_changes.stops =
        /*stops*/
        ctx[1];
        if (dirty &
        /*mapFill*/
        4) legend_changes.mapFill =
        /*mapFill*/
        ctx[2];
        if (dirty &
        /*legendLabel*/
        8) legend_changes.label =
        /*legendLabel*/
        ctx[3];
        legend.$set(legend_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(legend.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(legend.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        detach_dev(link);
        if (detaching) detach_dev(t0);
        if (detaching) detach_dev(div1);
        destroy_component(legend);
        /*div0_binding*/

        ctx[7](null);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$1.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  var MAP_ZOOM = 3;

  function instance$1($$self, $$props, $$invalidate) {
    var $currentYear;
    var $loading;
    validate_store(currentYear, "currentYear");
    component_subscribe($$self, currentYear, $$value => $$invalidate(11, $currentYear = $$value));
    validate_store(loading, "loading");
    component_subscribe($$self, loading, $$value => $$invalidate(12, $loading = $$value));
    var {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots("Map", slots, []);
    var {
      data
    } = $$props;
    var {
      stops
    } = $$props;
    var {
      geoData
    } = $$props;
    var {
      mapFill = "#2f4752"
    } = $$props;
    var {
      legendLabel
    } = $$props;
    var {
      years
    } = $$props;
    var oldCurrentYear; // for the map instance

    var map; // the dom element with the map in it.

    var mapContainer; // This will hold IDs of all our added layers

    var layers = []; // CONFIG STUFF

    mapboxGl.accessToken = "pk.eyJ1IjoicnlhbmJtYXJ4IiwiYSI6ImNrOWlwcnhuZjAyd3Eza250eWdtZHQyc2YifQ.Z-c62_JHPGtbWZf3c5sqnA";
    var CENTER = [122.483349, -2.936083];
    afterUpdate(() => {
      // If the year has changed
      if (oldCurrentYear !== $currentYear) {
        oldCurrentYear = $currentYear;
        layers.forEach(l => {
          var visibilityState = l === "grid-".concat($currentYear) ? "visible" : "none";
          map.setLayoutProperty(l, "visibility", visibilityState);
        });
      }
    });
    onMount( /*#__PURE__*/_asyncToGenerator(function* () {
      // INIT THE MAP
      console.log("Now mapping", {
        geoData
      });
      map = new mapboxGl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: MAP_ZOOM,
        center: CENTER
      });
      map.scrollZoom.disable();
      map.addControl(new mapboxGl.NavigationControl()); // This fires when the map has loaded

      map.on("load", function () {
        // Wait until we got the things
        map.addSource("grid", {
          type: "geojson",
          data: geoData
        }); // Add grid for each of our years

        for (var i = years.start; i <= years.end; i += years.step) {
          var gridID = "grid-".concat(i); // Add our grid ID to our list

          layers.push(gridID); // Add grid and color it using the stops provided

          map.addLayer({
            id: gridID,
            type: "fill",
            source: "grid",
            layout: {
              visibility: "grid-".concat(i) === "grid-".concat($currentYear) ? "visible" : "none"
            },
            paint: {
              "fill-opacity": {
                property: "".concat(i),
                stops
              },
              "fill-color": mapFill,
              "fill-opacity-transition": {
                duration: 300,
                delay: 0
              }
            }
          }); // Let's not waste our time on grid cells without data.
          // Filter them out of the display by checking for
          // a value for the year in questions.

          map.setFilter(gridID, [">=", "".concat(i), 0]);
        }
      });
      map.on("sourcedata", e => {
        if (e.isSourceLoaded) {
          // Do something when the source has finished loading
          set_store_value(loading, $loading = false, $loading);
        }
      });
    }));
    var writable_props = ["data", "stops", "geoData", "mapFill", "legendLabel", "years"];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<Map> was created with unknown prop '".concat(key, "'"));
    });

    function div0_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        mapContainer = $$value;
        $$invalidate(4, mapContainer);
      });
    }

    $$self.$$set = $$props => {
      if ("data" in $$props) $$invalidate(0, data = $$props.data);
      if ("stops" in $$props) $$invalidate(1, stops = $$props.stops);
      if ("geoData" in $$props) $$invalidate(5, geoData = $$props.geoData);
      if ("mapFill" in $$props) $$invalidate(2, mapFill = $$props.mapFill);
      if ("legendLabel" in $$props) $$invalidate(3, legendLabel = $$props.legendLabel);
      if ("years" in $$props) $$invalidate(6, years = $$props.years);
    };

    $$self.$capture_state = () => ({
      currentYear,
      loading,
      Legend,
      onMount,
      afterUpdate,
      mapboxgl: mapboxGl,
      data,
      stops,
      geoData,
      mapFill,
      legendLabel,
      years,
      oldCurrentYear,
      map,
      mapContainer,
      layers,
      CENTER,
      MAP_ZOOM,
      $currentYear,
      $loading
    });

    $$self.$inject_state = $$props => {
      if ("data" in $$props) $$invalidate(0, data = $$props.data);
      if ("stops" in $$props) $$invalidate(1, stops = $$props.stops);
      if ("geoData" in $$props) $$invalidate(5, geoData = $$props.geoData);
      if ("mapFill" in $$props) $$invalidate(2, mapFill = $$props.mapFill);
      if ("legendLabel" in $$props) $$invalidate(3, legendLabel = $$props.legendLabel);
      if ("years" in $$props) $$invalidate(6, years = $$props.years);
      if ("oldCurrentYear" in $$props) oldCurrentYear = $$props.oldCurrentYear;
      if ("map" in $$props) map = $$props.map;
      if ("mapContainer" in $$props) $$invalidate(4, mapContainer = $$props.mapContainer);
      if ("layers" in $$props) layers = $$props.layers;
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [data, stops, mapFill, legendLabel, mapContainer, geoData, years, div0_binding];
  }

  class Map$1 extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$1, create_fragment$1, safe_not_equal, {
        data: 0,
        stops: 1,
        geoData: 5,
        mapFill: 2,
        legendLabel: 3,
        years: 6
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Map",
        options,
        id: create_fragment$1.name
      });
      var {
        ctx
      } = this.$$;
      var props = options.props || {};

      if (
      /*data*/
      ctx[0] === undefined && !("data" in props)) {
        console_1.warn("<Map> was created without expected prop 'data'");
      }

      if (
      /*stops*/
      ctx[1] === undefined && !("stops" in props)) {
        console_1.warn("<Map> was created without expected prop 'stops'");
      }

      if (
      /*geoData*/
      ctx[5] === undefined && !("geoData" in props)) {
        console_1.warn("<Map> was created without expected prop 'geoData'");
      }

      if (
      /*legendLabel*/
      ctx[3] === undefined && !("legendLabel" in props)) {
        console_1.warn("<Map> was created without expected prop 'legendLabel'");
      }

      if (
      /*years*/
      ctx[6] === undefined && !("years" in props)) {
        console_1.warn("<Map> was created without expected prop 'years'");
      }
    }

    get data() {
      return this.$$.ctx[0];
    }

    set data(data) {
      this.$set({
        data
      });
      flush();
    }

    get stops() {
      return this.$$.ctx[1];
    }

    set stops(stops) {
      this.$set({
        stops
      });
      flush();
    }

    get geoData() {
      return this.$$.ctx[5];
    }

    set geoData(geoData) {
      this.$set({
        geoData
      });
      flush();
    }

    get mapFill() {
      return this.$$.ctx[2];
    }

    set mapFill(mapFill) {
      this.$set({
        mapFill
      });
      flush();
    }

    get legendLabel() {
      return this.$$.ctx[3];
    }

    set legendLabel(legendLabel) {
      this.$set({
        legendLabel
      });
      flush();
    }

    get years() {
      return this.$$.ctx[6];
    }

    set years(years) {
      this.$set({
        years
      });
      flush();
    }

  }

  function fade(node, { delay = 0, duration = 400, easing = identity }) {
      const o = +getComputedStyle(node).opacity;
      return {
          delay,
          duration,
          easing,
          css: t => `opacity: ${t * o}`
      };
  }

  /* src/components/Loading.svelte generated by Svelte v3.29.7 */
  var file$2 = "src/components/Loading.svelte";

  function create_fragment$2(ctx) {
    var div;
    var span1;
    var span0;
    var t0;
    var span2;
    var t1;
    var div_transition;
    var current;
    var block = {
      c: function create() {
        div = element("div");
        span1 = element("span");
        span0 = element("span");
        t0 = space();
        span2 = element("span");
        t1 = text(
        /*text*/
        ctx[0]);
        this.h();
      },
      l: function claim(nodes) {
        div = claim_element(nodes, "DIV", {
          class: true
        });
        var div_nodes = children(div);
        span1 = claim_element(div_nodes, "SPAN", {
          class: true
        });
        var span1_nodes = children(span1);
        span0 = claim_element(span1_nodes, "SPAN", {
          class: true
        });
        children(span0).forEach(detach_dev);
        span1_nodes.forEach(detach_dev);
        t0 = claim_space(div_nodes);
        span2 = claim_element(div_nodes, "SPAN", {
          class: true
        });
        var span2_nodes = children(span2);
        t1 = claim_text(span2_nodes,
        /*text*/
        ctx[0]);
        span2_nodes.forEach(detach_dev);
        div_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(span0, "class", "spinner__animation svelte-us4dxl");
        add_location(span0, file$2, 70, 89, 1406);
        attr_dev(span1, "class", "spinner__wrapper svelte-us4dxl");
        add_location(span1, file$2, 70, 57, 1374);
        attr_dev(span2, "class", "spinner__text svelte-us4dxl");
        add_location(span2, file$2, 70, 133, 1450);
        attr_dev(div, "class", "spinner svelte-us4dxl");
        add_location(div, file$2, 70, 0, 1317);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, span1);
        append_dev(span1, span0);
        append_dev(div, t0);
        append_dev(div, span2);
        append_dev(span2, t1);
        current = true;
      },
      p: function update(ctx, _ref) {
        var [dirty] = _ref;
        if (!current || dirty &
        /*text*/
        1) set_data_dev(t1,
        /*text*/
        ctx[0]);
      },
      i: function intro(local) {
        if (current) return;
        add_render_callback(() => {
          if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {
            duration: 150
          }, true);
          div_transition.run(1);
        });
        current = true;
      },
      o: function outro(local) {
        if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {
          duration: 150
        }, false);
        div_transition.run(0);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        if (detaching && div_transition) div_transition.end();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$2.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance$2($$self, $$props, $$invalidate) {
    var {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots("Loading", slots, []);
    var {
      text = "Loading data"
    } = $$props;
    var writable_props = ["text"];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Loading> was created with unknown prop '".concat(key, "'"));
    });

    $$self.$$set = $$props => {
      if ("text" in $$props) $$invalidate(0, text = $$props.text);
    };

    $$self.$capture_state = () => ({
      fade,
      text
    });

    $$self.$inject_state = $$props => {
      if ("text" in $$props) $$invalidate(0, text = $$props.text);
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [text];
  }

  class Loading extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$2, create_fragment$2, safe_not_equal, {
        text: 0
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Loading",
        options,
        id: create_fragment$2.name
      });
    }

    get text() {
      throw new Error("<Loading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set text(value) {
      throw new Error("<Loading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

  }

  /* src/components/Timeline.svelte generated by Svelte v3.29.7 */
  var file$3 = "src/components/Timeline.svelte";

  function get_each_context$1(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[11] = list[i];
    child_ctx[13] = i;
    return child_ctx;
  } // (233:4) {#each years as year, i}


  function create_each_block$1(ctx) {
    var li;
    var button;
    var span;
    var raw_value = formatYear(
    /*year*/
    ctx[11],
    /*i*/
    ctx[13]) + "";
    var button_data_year_value;
    var t;
    var mounted;
    var dispose;
    var block = {
      c: function create() {
        li = element("li");
        button = element("button");
        span = element("span");
        t = space();
        this.h();
      },
      l: function claim(nodes) {
        li = claim_element(nodes, "LI", {
          class: true
        });
        var li_nodes = children(li);
        button = claim_element(li_nodes, "BUTTON", {
          class: true,
          "data-year": true
        });
        var button_nodes = children(button);
        span = claim_element(button_nodes, "SPAN", {
          class: true
        });
        var span_nodes = children(span);
        span_nodes.forEach(detach_dev);
        button_nodes.forEach(detach_dev);
        t = claim_space(li_nodes);
        li_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(span, "class", "timeline__button__year svelte-qg2shx");
        add_location(span, file$3, 234, 189, 5425);
        attr_dev(button, "class", "timeline__button svelte-qg2shx");
        attr_dev(button, "data-year", button_data_year_value =
        /*year*/
        ctx[11]);
        toggle_class(button, "timeline__button--compressed",
        /*years*/
        ctx[2].length > 7);
        toggle_class(button, "timeline__button--active",
        /*year*/
        ctx[11] ==
        /*$currentYear*/
        ctx[1]);
        add_location(button, file$3, 234, 8, 5244);
        attr_dev(li, "class", "svelte-qg2shx");
        add_location(li, file$3, 233, 6, 5231);
      },
      m: function mount(target, anchor) {
        insert_dev(target, li, anchor);
        append_dev(li, button);
        append_dev(button, span);
        span.innerHTML = raw_value;
        append_dev(li, t);

        if (!mounted) {
          dispose = listen_dev(button, "click",
          /*handleClick*/
          ctx[3], false, false, false);
          mounted = true;
        }
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*years*/
        4) {
          toggle_class(button, "timeline__button--compressed",
          /*years*/
          ctx[2].length > 7);
        }

        if (dirty &
        /*years, $currentYear*/
        6) {
          toggle_class(button, "timeline__button--active",
          /*year*/
          ctx[11] ==
          /*$currentYear*/
          ctx[1]);
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(li);
        mounted = false;
        dispose();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block$1.name,
      type: "each",
      source: "(233:4) {#each years as year, i}",
      ctx
    });
    return block;
  } // (244:4) {:else}


  function create_else_block(ctx) {
    var t;
    var block = {
      c: function create() {
        t = text("►");
      },
      l: function claim(nodes) {
        t = claim_text(nodes, "►");
      },
      m: function mount(target, anchor) {
        insert_dev(target, t, anchor);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(t);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_else_block.name,
      type: "else",
      source: "(244:4) {:else}",
      ctx
    });
    return block;
  } // (241:4) {#if playing}


  function create_if_block$1(ctx) {
    var t;
    var block = {
      c: function create() {
        t = text("◼");
      },
      l: function claim(nodes) {
        t = claim_text(nodes, "◼");
      },
      m: function mount(target, anchor) {
        insert_dev(target, t, anchor);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(t);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block$1.name,
      type: "if",
      source: "(241:4) {#if playing}",
      ctx
    });
    return block;
  }

  function create_fragment$3(ctx) {
    var div;
    var span;
    var t0;
    var t1;
    var ol;
    var t2;
    var button;
    var mounted;
    var dispose;
    var each_value =
    /*years*/
    ctx[2];
    validate_each_argument(each_value);
    var each_blocks = [];

    for (var i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    }

    function select_block_type(ctx, dirty) {
      if (
      /*playing*/
      ctx[0]) return create_if_block$1;
      return create_else_block;
    }

    var current_block_type = select_block_type(ctx);
    var if_block = current_block_type(ctx);
    var block = {
      c: function create() {
        div = element("div");
        span = element("span");
        t0 = text("Select a year");
        t1 = space();
        ol = element("ol");

        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }

        t2 = space();
        button = element("button");
        if_block.c();
        this.h();
      },
      l: function claim(nodes) {
        div = claim_element(nodes, "DIV", {
          class: true
        });
        var div_nodes = children(div);
        span = claim_element(div_nodes, "SPAN", {
          id: true,
          class: true
        });
        var span_nodes = children(span);
        t0 = claim_text(span_nodes, "Select a year");
        span_nodes.forEach(detach_dev);
        t1 = claim_space(div_nodes);
        ol = claim_element(div_nodes, "OL", {
          "aria-labelledby": true,
          class: true
        });
        var ol_nodes = children(ol);

        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          each_blocks[_i2].l(ol_nodes);
        }

        ol_nodes.forEach(detach_dev);
        t2 = claim_space(div_nodes);
        button = claim_element(div_nodes, "BUTTON", {
          class: true,
          "aria-label": true
        });
        var button_nodes = children(button);
        if_block.l(button_nodes);
        button_nodes.forEach(detach_dev);
        div_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(span, "id", "timeline-label");
        attr_dev(span, "class", "label svelte-qg2shx");
        add_location(span, file$3, 230, 2, 5078);
        attr_dev(ol, "aria-labelledby", "timeline-label");
        attr_dev(ol, "class", "timeline svelte-qg2shx");
        add_location(ol, file$3, 231, 2, 5141);
        attr_dev(button, "class", "timeline__button timeline__button--play svelte-qg2shx");
        attr_dev(button, "aria-label", "Play the animation over time");
        toggle_class(button, "playing",
        /*playing*/
        ctx[0]);
        add_location(button, file$3, 239, 2, 5552);
        attr_dev(div, "class", "timeline-wrapper svelte-qg2shx");
        add_location(div, file$3, 229, 0, 5045);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, span);
        append_dev(span, t0);
        append_dev(div, t1);
        append_dev(div, ol);

        for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
          each_blocks[_i3].m(ol, null);
        }

        append_dev(div, t2);
        append_dev(div, button);
        if_block.m(button, null);

        if (!mounted) {
          dispose = listen_dev(button, "click",
          /*play*/
          ctx[4], false, false, false);
          mounted = true;
        }
      },
      p: function update(ctx, _ref) {
        var [dirty] = _ref;

        if (dirty &
        /*years, $currentYear, handleClick, formatYear*/
        14) {
          each_value =
          /*years*/
          ctx[2];
          validate_each_argument(each_value);

          var _i4;

          for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
            var child_ctx = get_each_context$1(ctx, each_value, _i4);

            if (each_blocks[_i4]) {
              each_blocks[_i4].p(child_ctx, dirty);
            } else {
              each_blocks[_i4] = create_each_block$1(child_ctx);

              each_blocks[_i4].c();

              each_blocks[_i4].m(ol, null);
            }
          }

          for (; _i4 < each_blocks.length; _i4 += 1) {
            each_blocks[_i4].d(1);
          }

          each_blocks.length = each_value.length;
        }

        if (current_block_type !== (current_block_type = select_block_type(ctx))) {
          if_block.d(1);
          if_block = current_block_type(ctx);

          if (if_block) {
            if_block.c();
            if_block.m(button, null);
          }
        }

        if (dirty &
        /*playing*/
        1) {
          toggle_class(button, "playing",
          /*playing*/
          ctx[0]);
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        destroy_each(each_blocks, detaching);
        if_block.d();
        mounted = false;
        dispose();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$3.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  var ANIMATION_INTERVAL = 2000;

  function formatYear(y, i) {
    // Return the full thing if it is the first.
    if (i === 0) return y; // Otherwise, return an apostrophe and last two characters

    return "&#8217;".concat(y - 2000);
  }

  function instance$3($$self, $$props, $$invalidate) {
    var $currentYear;
    validate_store(currentYear, "currentYear");
    component_subscribe($$self, currentYear, $$value => $$invalidate(1, $currentYear = $$value));
    var {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots("Timeline", slots, []);
    var {
      start
    } = $$props;
    var {
      end
    } = $$props;
    var {
      step
    } = $$props; // Generate our list of years to build the years

    var years = generateYears(); // For the play animation

    var timer; // Monitor the play state.

    var playing = false; // generateYears | Returns an array of

    function generateYears() {
      var retval = [];

      for (var y = start; y <= end; y += step) {
        retval.push(y);
      }

      return retval;
    }

    function handleClick(e) {
      // Switch the current year to the clicked/selected year
      set_store_value(currentYear, $currentYear = this.dataset.year, $currentYear);
    } // play | starts at the beginning and cycles through the available years
    // by switching the store value `currentYear`, the map also will
    // cycle through the available data


    function play(e) {
      if (!playing) {
        // If not playing, then start playing
        $$invalidate(0, playing = true);
        set_store_value(currentYear, $currentYear = start, $currentYear);
        timer = setInterval(() => {
          set_store_value(currentYear, $currentYear += step, $currentYear);

          if ($currentYear === end) {
            clearInterval(timer);
            $$invalidate(0, playing = false);
          }
        }, ANIMATION_INTERVAL);
      } else {
        // If playing, then stop playing.
        $$invalidate(0, playing = false);
        clearInterval(timer);
      }
    }

    var writable_props = ["start", "end", "step"];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Timeline> was created with unknown prop '".concat(key, "'"));
    });

    $$self.$$set = $$props => {
      if ("start" in $$props) $$invalidate(5, start = $$props.start);
      if ("end" in $$props) $$invalidate(6, end = $$props.end);
      if ("step" in $$props) $$invalidate(7, step = $$props.step);
    };

    $$self.$capture_state = () => ({
      currentYear,
      start,
      end,
      step,
      years,
      timer,
      ANIMATION_INTERVAL,
      playing,
      generateYears,
      handleClick,
      play,
      formatYear,
      yearString,
      $currentYear
    });

    $$self.$inject_state = $$props => {
      if ("start" in $$props) $$invalidate(5, start = $$props.start);
      if ("end" in $$props) $$invalidate(6, end = $$props.end);
      if ("step" in $$props) $$invalidate(7, step = $$props.step);
      if ("years" in $$props) $$invalidate(2, years = $$props.years);
      if ("timer" in $$props) timer = $$props.timer;
      if ("playing" in $$props) $$invalidate(0, playing = $$props.playing);
      if ("yearString" in $$props) yearString = $$props.yearString;
    };

    var yearString;

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    $$self.$$.update = () => {
      if ($$self.$$.dirty &
      /*$currentYear*/
      2) {
         yearString = "".concat($currentYear);
      }
    };

    return [playing, $currentYear, years, handleClick, play, start, end, step];
  }

  class Timeline extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$3, create_fragment$3, safe_not_equal, {
        start: 5,
        end: 6,
        step: 7
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Timeline",
        options,
        id: create_fragment$3.name
      });
      var {
        ctx
      } = this.$$;
      var props = options.props || {};

      if (
      /*start*/
      ctx[5] === undefined && !("start" in props)) {
        console.warn("<Timeline> was created without expected prop 'start'");
      }

      if (
      /*end*/
      ctx[6] === undefined && !("end" in props)) {
        console.warn("<Timeline> was created without expected prop 'end'");
      }

      if (
      /*step*/
      ctx[7] === undefined && !("step" in props)) {
        console.warn("<Timeline> was created without expected prop 'step'");
      }
    }

    get start() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set start(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get end() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set end(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get step() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set step(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

  }

  /* src/components/InputSelect.svelte generated by Svelte v3.29.7 */
  var file$4 = "src/components/InputSelect.svelte";

  function get_each_context$2(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[0] = list[i].value;
    child_ctx[4] = list[i].label;
    child_ctx[7] = list[i].disabled;
    child_ctx[8] = list[i].selected;
    return child_ctx;
  } // (85:4) {#if showAll}


  function create_if_block_1(ctx) {
    var option;
    var t_value =
    /*showAll*/
    ctx[3].label + "";
    var t;
    var option_value_value;
    var block = {
      c: function create() {
        option = element("option");
        t = text(t_value);
        this.h();
      },
      l: function claim(nodes) {
        option = claim_element(nodes, "OPTION", {
          value: true,
          selected: true
        });
        var option_nodes = children(option);
        t = claim_text(option_nodes, t_value);
        option_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        option.__value = option_value_value =
        /*showAll*/
        ctx[3].value;
        option.value = option.__value;
        option.selected = true;
        add_location(option, file$4, 85, 6, 1893);
      },
      m: function mount(target, anchor) {
        insert_dev(target, option, anchor);
        append_dev(option, t);
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*showAll*/
        8 && t_value !== (t_value =
        /*showAll*/
        ctx[3].label + "")) set_data_dev(t, t_value);

        if (dirty &
        /*showAll*/
        8 && option_value_value !== (option_value_value =
        /*showAll*/
        ctx[3].value)) {
          prop_dev(option, "__value", option_value_value);
          option.value = option.__value;
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(option);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block_1.name,
      type: "if",
      source: "(85:4) {#if showAll}",
      ctx
    });
    return block;
  } // (89:6) {#if label}


  function create_if_block$2(ctx) {
    var option;
    var t_value =
    /*label*/
    ctx[4] + "";
    var t;
    var option_value_value;
    var option_disabled_value;
    var option_selected_value;
    var block = {
      c: function create() {
        option = element("option");
        t = text(t_value);
        this.h();
      },
      l: function claim(nodes) {
        option = claim_element(nodes, "OPTION", {
          value: true,
          disabled: true,
          selected: true
        });
        var option_nodes = children(option);
        t = claim_text(option_nodes, t_value);
        option_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        option.__value = option_value_value =
        /*value*/
        ctx[0];
        option.value = option.__value;
        option.disabled = option_disabled_value =
        /*disabled*/
        ctx[7];
        option.selected = option_selected_value =
        /*selected*/
        ctx[8];
        add_location(option, file$4, 89, 8, 2061);
      },
      m: function mount(target, anchor) {
        insert_dev(target, option, anchor);
        append_dev(option, t);
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*options*/
        4 && t_value !== (t_value =
        /*label*/
        ctx[4] + "")) set_data_dev(t, t_value);

        if (dirty &
        /*options*/
        4 && option_value_value !== (option_value_value =
        /*value*/
        ctx[0])) {
          prop_dev(option, "__value", option_value_value);
          option.value = option.__value;
        }

        if (dirty &
        /*options*/
        4 && option_disabled_value !== (option_disabled_value =
        /*disabled*/
        ctx[7])) {
          prop_dev(option, "disabled", option_disabled_value);
        }

        if (dirty &
        /*options*/
        4 && option_selected_value !== (option_selected_value =
        /*selected*/
        ctx[8])) {
          prop_dev(option, "selected", option_selected_value);
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(option);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block$2.name,
      type: "if",
      source: "(89:6) {#if label}",
      ctx
    });
    return block;
  } // (88:4) {#each options as { value, label, disabled, selected }


  function create_each_block$2(key_1, ctx) {
    var first;
    var if_block_anchor;
    var if_block =
    /*label*/
    ctx[4] && create_if_block$2(ctx);
    var block = {
      key: key_1,
      first: null,
      c: function create() {
        first = empty();
        if (if_block) if_block.c();
        if_block_anchor = empty();
        this.h();
      },
      l: function claim(nodes) {
        first = empty();
        if (if_block) if_block.l(nodes);
        if_block_anchor = empty();
        this.h();
      },
      h: function hydrate() {
        this.first = first;
      },
      m: function mount(target, anchor) {
        insert_dev(target, first, anchor);
        if (if_block) if_block.m(target, anchor);
        insert_dev(target, if_block_anchor, anchor);
      },
      p: function update(ctx, dirty) {
        if (
        /*label*/
        ctx[4]) {
          if (if_block) {
            if_block.p(ctx, dirty);
          } else {
            if_block = create_if_block$2(ctx);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(first);
        if (if_block) if_block.d(detaching);
        if (detaching) detach_dev(if_block_anchor);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block$2.name,
      type: "each",
      source: "(88:4) {#each options as { value, label, disabled, selected }",
      ctx
    });
    return block;
  }

  function create_fragment$4(ctx) {
    var label_1;
    var t0;
    var t1;
    var div;
    var select;
    var if_block_anchor;
    var each_blocks = [];
    var each_1_lookup = new Map();
    var mounted;
    var dispose;
    var if_block =
    /*showAll*/
    ctx[3] && create_if_block_1(ctx);
    var each_value =
    /*options*/
    ctx[2];
    validate_each_argument(each_value);

    var get_key = ctx =>
    /*value*/
    ctx[0];

    validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    for (var i = 0; i < each_value.length; i += 1) {
      var child_ctx = get_each_context$2(ctx, each_value, i);
      var key = get_key(child_ctx);
      each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    }

    var block = {
      c: function create() {
        label_1 = element("label");
        t0 = text(
        /*label*/
        ctx[4]);
        t1 = space();
        div = element("div");
        select = element("select");
        if (if_block) if_block.c();
        if_block_anchor = empty();

        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }

        this.h();
      },
      l: function claim(nodes) {
        label_1 = claim_element(nodes, "LABEL", {
          for: true,
          class: true
        });
        var label_1_nodes = children(label_1);
        t0 = claim_text(label_1_nodes,
        /*label*/
        ctx[4]);
        label_1_nodes.forEach(detach_dev);
        t1 = claim_space(nodes);
        div = claim_element(nodes, "DIV", {
          class: true
        });
        var div_nodes = children(div);
        select = claim_element(div_nodes, "SELECT", {
          class: true,
          id: true
        });
        var select_nodes = children(select);
        if (if_block) if_block.l(select_nodes);
        if_block_anchor = empty();

        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          each_blocks[_i2].l(select_nodes);
        }

        select_nodes.forEach(detach_dev);
        div_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(label_1, "for",
        /*id*/
        ctx[1]);
        attr_dev(label_1, "class", "svelte-1rv2iiv");
        add_location(label_1, file$4, 81, 0, 1758);
        attr_dev(select, "class", "select__input svelte-1rv2iiv");
        attr_dev(select, "id",
        /*id*/
        ctx[1]);
        if (
        /*value*/
        ctx[0] === void 0) add_render_callback(() =>
        /*select_change_handler*/
        ctx[6].call(select));
        add_location(select, file$4, 83, 2, 1813);
        attr_dev(div, "class", "select svelte-1rv2iiv");
        add_location(div, file$4, 82, 0, 1790);
      },
      m: function mount(target, anchor) {
        insert_dev(target, label_1, anchor);
        append_dev(label_1, t0);
        insert_dev(target, t1, anchor);
        insert_dev(target, div, anchor);
        append_dev(div, select);
        if (if_block) if_block.m(select, null);
        append_dev(select, if_block_anchor);

        for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
          each_blocks[_i3].m(select, null);
        }

        select_option(select,
        /*value*/
        ctx[0]);

        if (!mounted) {
          dispose = [listen_dev(select, "input",
          /*input_handler*/
          ctx[5], false, false, false), listen_dev(select, "change",
          /*select_change_handler*/
          ctx[6])];
          mounted = true;
        }
      },
      p: function update(ctx, _ref) {
        var [dirty] = _ref;
        if (dirty &
        /*label*/
        16) set_data_dev(t0,
        /*label*/
        ctx[4]);

        if (dirty &
        /*id*/
        2) {
          attr_dev(label_1, "for",
          /*id*/
          ctx[1]);
        }

        if (
        /*showAll*/
        ctx[3]) {
          if (if_block) {
            if_block.p(ctx, dirty);
          } else {
            if_block = create_if_block_1(ctx);
            if_block.c();
            if_block.m(select, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }

        if (dirty &
        /*options*/
        4) {
          var _each_value =
          /*options*/
          ctx[2];
          validate_each_argument(_each_value);
          validate_each_keys(ctx, _each_value, get_each_context$2, get_key);
          each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, _each_value, each_1_lookup, select, destroy_block, create_each_block$2, null, get_each_context$2);
        }

        if (dirty &
        /*id*/
        2) {
          attr_dev(select, "id",
          /*id*/
          ctx[1]);
        }

        if (dirty &
        /*value, options, showAll*/
        13) {
          select_option(select,
          /*value*/
          ctx[0]);
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(label_1);
        if (detaching) detach_dev(t1);
        if (detaching) detach_dev(div);
        if (if_block) if_block.d();

        for (var _i4 = 0; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d();
        }

        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$4.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance$4($$self, $$props, $$invalidate) {
    var {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots("InputSelect", slots, []);
    var {
      label
    } = $$props,
        {
      id
    } = $$props;
    var {
      value
    } = $$props;
    var {
      options = []
    } = $$props;
    var {
      showAll = ""
    } = $$props;
    var writable_props = ["label", "id", "value", "options", "showAll"];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<InputSelect> was created with unknown prop '".concat(key, "'"));
    });

    function input_handler(event) {
      bubble($$self, event);
    }

    function select_change_handler() {
      value = select_value(this);
      $$invalidate(0, value);
      $$invalidate(2, options);
      $$invalidate(3, showAll);
    }

    $$self.$$set = $$props => {
      if ("label" in $$props) $$invalidate(4, label = $$props.label);
      if ("id" in $$props) $$invalidate(1, id = $$props.id);
      if ("value" in $$props) $$invalidate(0, value = $$props.value);
      if ("options" in $$props) $$invalidate(2, options = $$props.options);
      if ("showAll" in $$props) $$invalidate(3, showAll = $$props.showAll);
    };

    $$self.$capture_state = () => ({
      label,
      id,
      value,
      options,
      showAll
    });

    $$self.$inject_state = $$props => {
      if ("label" in $$props) $$invalidate(4, label = $$props.label);
      if ("id" in $$props) $$invalidate(1, id = $$props.id);
      if ("value" in $$props) $$invalidate(0, value = $$props.value);
      if ("options" in $$props) $$invalidate(2, options = $$props.options);
      if ("showAll" in $$props) $$invalidate(3, showAll = $$props.showAll);
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [value, id, options, showAll, label, input_handler, select_change_handler];
  }

  class InputSelect extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$4, create_fragment$4, safe_not_equal, {
        label: 4,
        id: 1,
        value: 0,
        options: 2,
        showAll: 3
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "InputSelect",
        options,
        id: create_fragment$4.name
      });
      var {
        ctx
      } = this.$$;
      var props = options.props || {};

      if (
      /*label*/
      ctx[4] === undefined && !("label" in props)) {
        console.warn("<InputSelect> was created without expected prop 'label'");
      }

      if (
      /*id*/
      ctx[1] === undefined && !("id" in props)) {
        console.warn("<InputSelect> was created without expected prop 'id'");
      }

      if (
      /*value*/
      ctx[0] === undefined && !("value" in props)) {
        console.warn("<InputSelect> was created without expected prop 'value'");
      }
    }

    get label() {
      return this.$$.ctx[4];
    }

    set label(label) {
      this.$set({
        label
      });
      flush();
    }

    get id() {
      return this.$$.ctx[1];
    }

    set id(id) {
      this.$set({
        id
      });
      flush();
    }

    get value() {
      return this.$$.ctx[0];
    }

    set value(value) {
      this.$set({
        value
      });
      flush();
    }

    get options() {
      return this.$$.ctx[2];
    }

    set options(options) {
      this.$set({
        options
      });
      flush();
    }

    get showAll() {
      return this.$$.ctx[3];
    }

    set showAll(showAll) {
      this.$set({
        showAll
      });
      flush();
    }

  }

  /* src/components/Nav.svelte generated by Svelte v3.29.7 */
  var {
    Object: Object_1
  } = globals;
  var file$5 = "src/components/Nav.svelte";

  function create_fragment$5(ctx) {
    var nav;
    var timeline;
    var t;
    var div;
    var inputselect;
    var updating_value;
    var current;
    var timeline_spread_levels = [{
      label:
      /*yearLabel*/
      ctx[0]
    },
    /*years*/
    ctx[2]];
    var timeline_props = {};

    for (var i = 0; i < timeline_spread_levels.length; i += 1) {
      timeline_props = assign(timeline_props, timeline_spread_levels[i]);
    }

    timeline = new Timeline({
      props: timeline_props,
      $$inline: true
    });

    function inputselect_value_binding(value) {
      /*inputselect_value_binding*/
      ctx[8].call(null, value);
    }

    var inputselect_props = {
      id: "data",
      label:
      /*dataLabel*/
      ctx[1],
      options:
      /*options*/
      ctx[5]
    };

    if (
    /*$activeData*/
    ctx[4] !== void 0) {
      inputselect_props.value =
      /*$activeData*/
      ctx[4];
    }

    inputselect = new InputSelect({
      props: inputselect_props,
      $$inline: true
    });
    binding_callbacks.push(() => bind(inputselect, "value", inputselect_value_binding));
    /*inputselect_binding*/

    ctx[9](inputselect);
    var block = {
      c: function create() {
        nav = element("nav");
        create_component(timeline.$$.fragment);
        t = space();
        div = element("div");
        create_component(inputselect.$$.fragment);
        this.h();
      },
      l: function claim(nodes) {
        nav = claim_element(nodes, "NAV", {
          class: true
        });
        var nav_nodes = children(nav);
        claim_component(timeline.$$.fragment, nav_nodes);
        t = claim_space(nav_nodes);
        div = claim_element(nav_nodes, "DIV", {
          class: true
        });
        var div_nodes = children(div);
        claim_component(inputselect.$$.fragment, div_nodes);
        div_nodes.forEach(detach_dev);
        nav_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(div, "class", "select-wrapper svelte-v4cxpm");
        add_location(div, file$5, 45, 2, 938);
        attr_dev(nav, "class", "nav svelte-v4cxpm");
        add_location(nav, file$5, 43, 0, 874);
      },
      m: function mount(target, anchor) {
        insert_dev(target, nav, anchor);
        mount_component(timeline, nav, null);
        append_dev(nav, t);
        append_dev(nav, div);
        mount_component(inputselect, div, null);
        current = true;
      },
      p: function update(ctx, _ref) {
        var [dirty] = _ref;
        var timeline_changes = dirty &
        /*yearLabel, years*/
        5 ? get_spread_update(timeline_spread_levels, [dirty &
        /*yearLabel*/
        1 && {
          label:
          /*yearLabel*/
          ctx[0]
        }, dirty &
        /*years*/
        4 && get_spread_object(
        /*years*/
        ctx[2])]) : {};
        timeline.$set(timeline_changes);
        var inputselect_changes = {};
        if (dirty &
        /*dataLabel*/
        2) inputselect_changes.label =
        /*dataLabel*/
        ctx[1];

        if (!updating_value && dirty &
        /*$activeData*/
        16) {
          updating_value = true;
          inputselect_changes.value =
          /*$activeData*/
          ctx[4];
          add_flush_callback(() => updating_value = false);
        }

        inputselect.$set(inputselect_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(timeline.$$.fragment, local);
        transition_in(inputselect.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(timeline.$$.fragment, local);
        transition_out(inputselect.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(nav);
        destroy_component(timeline);
        /*inputselect_binding*/

        ctx[9](null);
        destroy_component(inputselect);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$5.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance$5($$self, $$props, $$invalidate) {
    var $activeData;
    validate_store(activeData, "activeData");
    component_subscribe($$self, activeData, $$value => $$invalidate(4, $activeData = $$value));
    var {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots("Nav", slots, []);
    var {
      data
    } = $$props;
    var {
      yearLabel
    } = $$props;
    var {
      dataLabel
    } = $$props;
    var {
      years
    } = $$props;
    var {
      firstData
    } = $$props;
    var options = Object.keys(data).map(d => {
      return {
        label: data[d].label,
        value: d,
        selected: d === firstData
      };
    }); // The acutal input el.

    var dataMenu;
    var writable_props = ["data", "yearLabel", "dataLabel", "years", "firstData"];
    Object_1.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Nav> was created with unknown prop '".concat(key, "'"));
    });

    function inputselect_value_binding(value) {
      $activeData = value;
      activeData.set($activeData);
    }

    function inputselect_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        dataMenu = $$value;
        $$invalidate(3, dataMenu);
      });
    }

    $$self.$$set = $$props => {
      if ("data" in $$props) $$invalidate(6, data = $$props.data);
      if ("yearLabel" in $$props) $$invalidate(0, yearLabel = $$props.yearLabel);
      if ("dataLabel" in $$props) $$invalidate(1, dataLabel = $$props.dataLabel);
      if ("years" in $$props) $$invalidate(2, years = $$props.years);
      if ("firstData" in $$props) $$invalidate(7, firstData = $$props.firstData);
    };

    $$self.$capture_state = () => ({
      Timeline,
      InputSelect,
      activeData,
      data,
      yearLabel,
      dataLabel,
      years,
      firstData,
      options,
      dataMenu,
      $activeData
    });

    $$self.$inject_state = $$props => {
      if ("data" in $$props) $$invalidate(6, data = $$props.data);
      if ("yearLabel" in $$props) $$invalidate(0, yearLabel = $$props.yearLabel);
      if ("dataLabel" in $$props) $$invalidate(1, dataLabel = $$props.dataLabel);
      if ("years" in $$props) $$invalidate(2, years = $$props.years);
      if ("firstData" in $$props) $$invalidate(7, firstData = $$props.firstData);
      if ("options" in $$props) $$invalidate(5, options = $$props.options);
      if ("dataMenu" in $$props) $$invalidate(3, dataMenu = $$props.dataMenu);
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [yearLabel, dataLabel, years, dataMenu, $activeData, options, data, firstData, inputselect_value_binding, inputselect_binding];
  }

  class Nav extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$5, create_fragment$5, safe_not_equal, {
        data: 6,
        yearLabel: 0,
        dataLabel: 1,
        years: 2,
        firstData: 7
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Nav",
        options,
        id: create_fragment$5.name
      });
      var {
        ctx
      } = this.$$;
      var props = options.props || {};

      if (
      /*data*/
      ctx[6] === undefined && !("data" in props)) {
        console.warn("<Nav> was created without expected prop 'data'");
      }

      if (
      /*yearLabel*/
      ctx[0] === undefined && !("yearLabel" in props)) {
        console.warn("<Nav> was created without expected prop 'yearLabel'");
      }

      if (
      /*dataLabel*/
      ctx[1] === undefined && !("dataLabel" in props)) {
        console.warn("<Nav> was created without expected prop 'dataLabel'");
      }

      if (
      /*years*/
      ctx[2] === undefined && !("years" in props)) {
        console.warn("<Nav> was created without expected prop 'years'");
      }

      if (
      /*firstData*/
      ctx[7] === undefined && !("firstData" in props)) {
        console.warn("<Nav> was created without expected prop 'firstData'");
      }
    }

    get data() {
      throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set data(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get yearLabel() {
      throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set yearLabel(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get dataLabel() {
      throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set dataLabel(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get years() {
      throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set years(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get firstData() {
      throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set firstData(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

  }

  /* src/components/DataDescription.svelte generated by Svelte v3.29.7 */
  var file$6 = "src/components/DataDescription.svelte";

  function create_fragment$6(ctx) {
    var dl;
    var dt;
    var t0;
    var dd;
    var t1;
    var block = {
      c: function create() {
        dl = element("dl");
        dt = element("dt");
        t0 = text(
        /*label*/
        ctx[0]);
        dd = element("dd");
        t1 = text(
        /*description*/
        ctx[1]);
        this.h();
      },
      l: function claim(nodes) {
        dl = claim_element(nodes, "DL", {
          class: true
        });
        var dl_nodes = children(dl);
        dt = claim_element(dl_nodes, "DT", {
          class: true
        });
        var dt_nodes = children(dt);
        t0 = claim_text(dt_nodes,
        /*label*/
        ctx[0]);
        dt_nodes.forEach(detach_dev);
        dd = claim_element(dl_nodes, "DD", {
          class: true
        });
        var dd_nodes = children(dd);
        t1 = claim_text(dd_nodes,
        /*description*/
        ctx[1]);
        dd_nodes.forEach(detach_dev);
        dl_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(dt, "class", "description__name svelte-x695rw");
        add_location(dt, file$6, 27, 2, 466);
        attr_dev(dd, "class", "description__text svelte-x695rw");
        add_location(dd, file$6, 28, 2, 511);
        attr_dev(dl, "class", "description svelte-x695rw");
        add_location(dl, file$6, 26, 0, 439);
      },
      m: function mount(target, anchor) {
        insert_dev(target, dl, anchor);
        append_dev(dl, dt);
        append_dev(dt, t0);
        append_dev(dl, dd);
        append_dev(dd, t1);
      },
      p: function update(ctx, _ref) {
        var [dirty] = _ref;
        if (dirty &
        /*label*/
        1) set_data_dev(t0,
        /*label*/
        ctx[0]);
        if (dirty &
        /*description*/
        2) set_data_dev(t1,
        /*description*/
        ctx[1]);
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(dl);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$6.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance$6($$self, $$props, $$invalidate) {
    var {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots("DataDescription", slots, []);
    var {
      label = "Label"
    } = $$props;
    var {
      description = "Description"
    } = $$props;
    var writable_props = ["label", "description"];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<DataDescription> was created with unknown prop '".concat(key, "'"));
    });

    $$self.$$set = $$props => {
      if ("label" in $$props) $$invalidate(0, label = $$props.label);
      if ("description" in $$props) $$invalidate(1, description = $$props.description);
    };

    $$self.$capture_state = () => ({
      label,
      description
    });

    $$self.$inject_state = $$props => {
      if ("label" in $$props) $$invalidate(0, label = $$props.label);
      if ("description" in $$props) $$invalidate(1, description = $$props.description);
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [label, description];
  }

  class DataDescription extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$6, create_fragment$6, safe_not_equal, {
        label: 0,
        description: 1
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "DataDescription",
        options,
        id: create_fragment$6.name
      });
    }

    get label() {
      throw new Error("<DataDescription>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set label(value) {
      throw new Error("<DataDescription>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get description() {
      throw new Error("<DataDescription>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set description(value) {
      throw new Error("<DataDescription>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

  }

  var file$7 = "src/App.svelte"; // (104:4) {#if $loading}

  function create_if_block_2(ctx) {
    var loading_1;
    var current;
    loading_1 = new Loading({
      $$inline: true
    });
    var block = {
      c: function create() {
        create_component(loading_1.$$.fragment);
      },
      l: function claim(nodes) {
        claim_component(loading_1.$$.fragment, nodes);
      },
      m: function mount(target, anchor) {
        mount_component(loading_1, target, anchor);
        current = true;
      },
      i: function intro(local) {
        if (current) return;
        transition_in(loading_1.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(loading_1.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(loading_1, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block_2.name,
      type: "if",
      source: "(104:4) {#if $loading}",
      ctx
    });
    return block;
  } // (107:4) {#if geoData}


  function create_if_block_1$1(ctx) {
    var map_1;
    var current;
    var map_1_props = {
      loading,
      gridFile:
      /*grid*/
      ctx[1],
      data:
      /*data*/
      ctx[0],
      stops:
      /*stops*/
      ctx[5],
      mapFill:
      /*mapFill*/
      ctx[6],
      years:
      /*years*/
      ctx[4],
      geoData:
      /*geoData*/
      ctx[10],
      legendLabel:
      /*legendLabel*/
      ctx[7]
    };
    map_1 = new Map$1({
      props: map_1_props,
      $$inline: true
    });
    /*map_1_binding*/

    ctx[16](map_1);
    var block = {
      c: function create() {
        create_component(map_1.$$.fragment);
      },
      l: function claim(nodes) {
        claim_component(map_1.$$.fragment, nodes);
      },
      m: function mount(target, anchor) {
        mount_component(map_1, target, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        var map_1_changes = {};
        if (dirty &
        /*grid*/
        2) map_1_changes.gridFile =
        /*grid*/
        ctx[1];
        if (dirty &
        /*data*/
        1) map_1_changes.data =
        /*data*/
        ctx[0];
        if (dirty &
        /*stops*/
        32) map_1_changes.stops =
        /*stops*/
        ctx[5];
        if (dirty &
        /*mapFill*/
        64) map_1_changes.mapFill =
        /*mapFill*/
        ctx[6];
        if (dirty &
        /*years*/
        16) map_1_changes.years =
        /*years*/
        ctx[4];
        if (dirty &
        /*geoData*/
        1024) map_1_changes.geoData =
        /*geoData*/
        ctx[10];
        if (dirty &
        /*legendLabel*/
        128) map_1_changes.legendLabel =
        /*legendLabel*/
        ctx[7];
        map_1.$set(map_1_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(map_1.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(map_1.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        /*map_1_binding*/
        ctx[16](null);
        destroy_component(map_1, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block_1$1.name,
      type: "if",
      source: "(107:4) {#if geoData}",
      ctx
    });
    return block;
  } // (111:2) {#if dataNote}


  function create_if_block$3(ctx) {
    var div;
    var raw_value = marked(
    /*dataNote*/
    ctx[8]) + "";
    var block = {
      c: function create() {
        div = element("div");
        this.h();
      },
      l: function claim(nodes) {
        div = claim_element(nodes, "DIV", {
          class: true
        });
        var div_nodes = children(div);
        div_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(div, "class", "note svelte-dwkbwa");
        add_location(div, file$7, 111, 4, 2934);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        div.innerHTML = raw_value;
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*dataNote*/
        256 && raw_value !== (raw_value = marked(
        /*dataNote*/
        ctx[8]) + "")) div.innerHTML = raw_value;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block$3.name,
      type: "if",
      source: "(111:2) {#if dataNote}",
      ctx
    });
    return block;
  }

  function create_fragment$7(ctx) {
    var div1;
    var nav;
    var t0;
    var datadescription;
    var t1;
    var div0;
    var t2;
    var t3;
    var current;
    nav = new Nav({
      props: {
        data:
        /*data*/
        ctx[0],
        yearLabel:
        /*yearLabel*/
        ctx[2],
        dataLabel:
        /*dataLabel*/
        ctx[3],
        years:
        /*years*/
        ctx[4],
        firstData:
        /*firstData*/
        ctx[9]
      },
      $$inline: true
    });
    var datadescription_spread_levels = [
    /*descriptionData*/
    ctx[13]];
    var datadescription_props = {};

    for (var i = 0; i < datadescription_spread_levels.length; i += 1) {
      datadescription_props = assign(datadescription_props, datadescription_spread_levels[i]);
    }

    datadescription = new DataDescription({
      props: datadescription_props,
      $$inline: true
    });
    var if_block0 =
    /*$loading*/
    ctx[14] && create_if_block_2(ctx);
    var if_block1 =
    /*geoData*/
    ctx[10] && create_if_block_1$1(ctx);
    var if_block2 =
    /*dataNote*/
    ctx[8] && create_if_block$3(ctx);
    var block = {
      c: function create() {
        div1 = element("div");
        create_component(nav.$$.fragment);
        t0 = space();
        create_component(datadescription.$$.fragment);
        t1 = space();
        div0 = element("div");
        if (if_block0) if_block0.c();
        t2 = space();
        if (if_block1) if_block1.c();
        t3 = space();
        if (if_block2) if_block2.c();
        this.h();
      },
      l: function claim(nodes) {
        div1 = claim_element(nodes, "DIV", {
          class: true
        });
        var div1_nodes = children(div1);
        claim_component(nav.$$.fragment, div1_nodes);
        t0 = claim_space(div1_nodes);
        claim_component(datadescription.$$.fragment, div1_nodes);
        t1 = claim_space(div1_nodes);
        div0 = claim_element(div1_nodes, "DIV", {
          class: true
        });
        var div0_nodes = children(div0);
        if (if_block0) if_block0.l(div0_nodes);
        t2 = claim_space(div0_nodes);
        if (if_block1) if_block1.l(div0_nodes);
        div0_nodes.forEach(detach_dev);
        t3 = claim_space(div1_nodes);
        if (if_block2) if_block2.l(div1_nodes);
        div1_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(div0, "class", "map-wrapper svelte-dwkbwa");
        add_location(div0, file$7, 102, 2, 2690);
        attr_dev(div1, "class", "projections svelte-dwkbwa");
        add_location(div1, file$7, 99, 0, 2536);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div1, anchor);
        mount_component(nav, div1, null);
        append_dev(div1, t0);
        mount_component(datadescription, div1, null);
        append_dev(div1, t1);
        append_dev(div1, div0);
        if (if_block0) if_block0.m(div0, null);
        append_dev(div0, t2);
        if (if_block1) if_block1.m(div0, null);
        append_dev(div1, t3);
        if (if_block2) if_block2.m(div1, null);
        /*div1_binding*/

        ctx[17](div1);
        current = true;
      },
      p: function update(ctx, _ref) {
        var [dirty] = _ref;
        var nav_changes = {};
        if (dirty &
        /*data*/
        1) nav_changes.data =
        /*data*/
        ctx[0];
        if (dirty &
        /*yearLabel*/
        4) nav_changes.yearLabel =
        /*yearLabel*/
        ctx[2];
        if (dirty &
        /*dataLabel*/
        8) nav_changes.dataLabel =
        /*dataLabel*/
        ctx[3];
        if (dirty &
        /*years*/
        16) nav_changes.years =
        /*years*/
        ctx[4];
        if (dirty &
        /*firstData*/
        512) nav_changes.firstData =
        /*firstData*/
        ctx[9];
        nav.$set(nav_changes);
        var datadescription_changes = dirty &
        /*descriptionData*/
        8192 ? get_spread_update(datadescription_spread_levels, [get_spread_object(
        /*descriptionData*/
        ctx[13])]) : {};
        datadescription.$set(datadescription_changes);

        if (
        /*$loading*/
        ctx[14]) {
          if (if_block0) {
            if (dirty &
            /*$loading*/
            16384) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_2(ctx);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(div0, t2);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });
          check_outros();
        }

        if (
        /*geoData*/
        ctx[10]) {
          if (if_block1) {
            if_block1.p(ctx, dirty);

            if (dirty &
            /*geoData*/
            1024) {
              transition_in(if_block1, 1);
            }
          } else {
            if_block1 = create_if_block_1$1(ctx);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(div0, null);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, () => {
            if_block1 = null;
          });
          check_outros();
        }

        if (
        /*dataNote*/
        ctx[8]) {
          if (if_block2) {
            if_block2.p(ctx, dirty);
          } else {
            if_block2 = create_if_block$3(ctx);
            if_block2.c();
            if_block2.m(div1, null);
          }
        } else if (if_block2) {
          if_block2.d(1);
          if_block2 = null;
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(nav.$$.fragment, local);
        transition_in(datadescription.$$.fragment, local);
        transition_in(if_block0);
        transition_in(if_block1);
        current = true;
      },
      o: function outro(local) {
        transition_out(nav.$$.fragment, local);
        transition_out(datadescription.$$.fragment, local);
        transition_out(if_block0);
        transition_out(if_block1);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div1);
        destroy_component(nav);
        destroy_component(datadescription);
        if (if_block0) if_block0.d();
        if (if_block1) if_block1.d();
        if (if_block2) if_block2.d();
        /*div1_binding*/

        ctx[17](null);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$7.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance$7($$self, $$props, $$invalidate) {
    var $activeData;
    var $currentYear;
    var $loading;
    validate_store(activeData, "activeData");
    component_subscribe($$self, activeData, $$value => $$invalidate(19, $activeData = $$value));
    validate_store(currentYear, "currentYear");
    component_subscribe($$self, currentYear, $$value => $$invalidate(20, $currentYear = $$value));
    validate_store(loading, "loading");
    component_subscribe($$self, loading, $$value => $$invalidate(14, $loading = $$value));
    var {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots("App", slots, []);
    var {
      data = []
    } = $$props;
    var {
      grid = ""
    } = $$props;
    var {
      yearLabel = "year"
    } = $$props;
    var {
      dataLabel = "data"
    } = $$props;
    var {
      years
    } = $$props;
    var {
      stops = []
    } = $$props;
    var {
      mapFill
    } = $$props;
    var {
      gridID
    } = $$props;
    var {
      legendLabel
    } = $$props;
    var {
      dataNote
    } = $$props;
    var {
      firstData
    } = $$props;
    var oldData = firstData;
    var geoData;
    var map;
    var container;
    onMount( /*#__PURE__*/_asyncToGenerator(function* () {
      set_store_value(currentYear, $currentYear = years.start, $currentYear);
      $$invalidate(10, geoData = yield getMapData(grid, firstData, data, gridID));
    }));
    afterUpdate( /*#__PURE__*/_asyncToGenerator(function* () {
      // Check to make sure this update is for new data
      if (oldData !== $activeData && $activeData) {
        // activate loading mode
        set_store_value(loading, $loading = true, $loading); // Remember what we had, to check next time.

        oldData = $activeData; // Clear out the mapped data, which will destroy the instance of the component

        $$invalidate(10, geoData = null); // get the new data for the map. When it loads, this will trigger a new map.

        $$invalidate(10, geoData = yield getMapData(grid, $activeData, data, gridID));
      }
    }));
    var writable_props = ["data", "grid", "yearLabel", "dataLabel", "years", "stops", "mapFill", "gridID", "legendLabel", "dataNote", "firstData"];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<App> was created with unknown prop '".concat(key, "'"));
    });

    function map_1_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        map = $$value;
        $$invalidate(11, map);
      });
    }

    function div1_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        container = $$value;
        $$invalidate(12, container);
      });
    }

    $$self.$$set = $$props => {
      if ("data" in $$props) $$invalidate(0, data = $$props.data);
      if ("grid" in $$props) $$invalidate(1, grid = $$props.grid);
      if ("yearLabel" in $$props) $$invalidate(2, yearLabel = $$props.yearLabel);
      if ("dataLabel" in $$props) $$invalidate(3, dataLabel = $$props.dataLabel);
      if ("years" in $$props) $$invalidate(4, years = $$props.years);
      if ("stops" in $$props) $$invalidate(5, stops = $$props.stops);
      if ("mapFill" in $$props) $$invalidate(6, mapFill = $$props.mapFill);
      if ("gridID" in $$props) $$invalidate(15, gridID = $$props.gridID);
      if ("legendLabel" in $$props) $$invalidate(7, legendLabel = $$props.legendLabel);
      if ("dataNote" in $$props) $$invalidate(8, dataNote = $$props.dataNote);
      if ("firstData" in $$props) $$invalidate(9, firstData = $$props.firstData);
    };

    $$self.$capture_state = () => ({
      activeData,
      currentYear,
      loading,
      onMount,
      afterUpdate,
      getMapData,
      marked,
      Map: Map$1,
      Loading,
      Nav,
      DataDescription,
      data,
      grid,
      yearLabel,
      dataLabel,
      years,
      stops,
      mapFill,
      gridID,
      legendLabel,
      dataNote,
      firstData,
      oldData,
      geoData,
      map,
      container,
      descriptionData,
      $activeData,
      $currentYear,
      $loading
    });

    $$self.$inject_state = $$props => {
      if ("data" in $$props) $$invalidate(0, data = $$props.data);
      if ("grid" in $$props) $$invalidate(1, grid = $$props.grid);
      if ("yearLabel" in $$props) $$invalidate(2, yearLabel = $$props.yearLabel);
      if ("dataLabel" in $$props) $$invalidate(3, dataLabel = $$props.dataLabel);
      if ("years" in $$props) $$invalidate(4, years = $$props.years);
      if ("stops" in $$props) $$invalidate(5, stops = $$props.stops);
      if ("mapFill" in $$props) $$invalidate(6, mapFill = $$props.mapFill);
      if ("gridID" in $$props) $$invalidate(15, gridID = $$props.gridID);
      if ("legendLabel" in $$props) $$invalidate(7, legendLabel = $$props.legendLabel);
      if ("dataNote" in $$props) $$invalidate(8, dataNote = $$props.dataNote);
      if ("firstData" in $$props) $$invalidate(9, firstData = $$props.firstData);
      if ("oldData" in $$props) oldData = $$props.oldData;
      if ("geoData" in $$props) $$invalidate(10, geoData = $$props.geoData);
      if ("map" in $$props) $$invalidate(11, map = $$props.map);
      if ("container" in $$props) $$invalidate(12, container = $$props.container);
      if ("descriptionData" in $$props) $$invalidate(13, descriptionData = $$props.descriptionData);
    };

    var descriptionData;

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    $$self.$$.update = () => {
      if ($$self.$$.dirty &
      /*$activeData, data, firstData*/
      524801) {
         $$invalidate(13, descriptionData = $activeData ? data[$activeData] : data[firstData]);
      }
    };

    return [data, grid, yearLabel, dataLabel, years, stops, mapFill, legendLabel, dataNote, firstData, geoData, map, container, descriptionData, $loading, gridID, map_1_binding, div1_binding];
  }

  class App extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$7, create_fragment$7, safe_not_equal, {
        data: 0,
        grid: 1,
        yearLabel: 2,
        dataLabel: 3,
        years: 4,
        stops: 5,
        mapFill: 6,
        gridID: 15,
        legendLabel: 7,
        dataNote: 8,
        firstData: 9
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "App",
        options,
        id: create_fragment$7.name
      });
      var {
        ctx
      } = this.$$;
      var props = options.props || {};

      if (
      /*years*/
      ctx[4] === undefined && !("years" in props)) {
        console.warn("<App> was created without expected prop 'years'");
      }

      if (
      /*mapFill*/
      ctx[6] === undefined && !("mapFill" in props)) {
        console.warn("<App> was created without expected prop 'mapFill'");
      }

      if (
      /*gridID*/
      ctx[15] === undefined && !("gridID" in props)) {
        console.warn("<App> was created without expected prop 'gridID'");
      }

      if (
      /*legendLabel*/
      ctx[7] === undefined && !("legendLabel" in props)) {
        console.warn("<App> was created without expected prop 'legendLabel'");
      }

      if (
      /*dataNote*/
      ctx[8] === undefined && !("dataNote" in props)) {
        console.warn("<App> was created without expected prop 'dataNote'");
      }

      if (
      /*firstData*/
      ctx[9] === undefined && !("firstData" in props)) {
        console.warn("<App> was created without expected prop 'firstData'");
      }
    }

    get data() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set data(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get grid() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set grid(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get yearLabel() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set yearLabel(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get dataLabel() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set dataLabel(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get years() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set years(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get stops() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set stops(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get mapFill() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set mapFill(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get gridID() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set gridID(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get legendLabel() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set legendLabel(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get dataNote() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set dataNote(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    get firstData() {
      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

    set firstData(value) {
      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }

  }

  document.addEventListener("DOMContentLoaded", function (e) {
    // Look for our containers
    for (var el of document.querySelectorAll(".orbitas-projections-map")) {
      // Find the first config script
      var config = JSON.parse(el.parentNode.querySelector("script.config").innerHTML); // Instantiate our app

      var _app = new App({
        hydrate: true,
        target: el,
        props: _objectSpread2({}, config)
      });
    }
  });
  var app$1 = app;

  return app$1;

}());
//# sourceMappingURL=bundle.js.map
