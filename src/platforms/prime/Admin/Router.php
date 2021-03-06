<?php
namespace Gantry\Admin;

use Gantry\Component\Request\Request;
use Gantry\Component\Router\Router as BaseRouter;

class Router extends BaseRouter
{
    public function boot()
    {
        /** @var Request $request */
        $request = $this->container['request'];

        // Split normalized request path to its parts.
        $parts = array_filter(explode('/', PAGE_PATH), function($var) { return $var !== ''; });

        $theme = isset($this->container['theme.name']) ? $this->container['theme.name'] : '';

        if ($theme) {
            $this->container['theme.path'] = PRIME_ROOT . '/themes/' . $theme;
            $this->container['theme.name'] = $theme;
        }

        $this->load();

        if ($theme && isset($parts[0]) && $parts[0] == 'admin') {
            // We are inside admin; we can skip the first part.
            array_shift($parts);

            // Second parameter is the resource.
            $this->resource = array_shift($parts) ?: 'about';

        } else {
            // We are not inside admin or style doesn't exist; fall back to theme listing.
            $theme = '';
            $parts = [];
            $this->resource = 'themes';
        }

        // Figure out the action we want to make.
        $this->method = $request->getMethod();
        $this->path = $parts;
        $this->format = PAGE_EXTENSION;
        $ajax = ($this->format == 'json');

        $this->params = [
            'ajax' => $ajax,
            'location' => $this->resource,
            'method' => $this->method,
            'format' => $this->format,
            'params' => isset($_POST['params']) && is_string($_POST['params']) ? json_decode($_POST['params'], true) : []
        ];

        $this->container['base_url'] = rtrim(PRIME_URI, '/') . "/{$theme}/admin";

        $this->container['ajax_suffix'] = '.json';

        $this->container['routes'] = [
            '1' => '/%s',
            'themes' => '',

            'picker/layouts' => '/layouts',
            'picker/particles' => '/particles'
        ];
    }
}
