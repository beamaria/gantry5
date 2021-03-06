<?php

/**
 * @package   Gantry5
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2015 RocketTheme, LLC
 * @license   GNU/GPLv2 and later
 *
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace Gantry\Admin;

use Gantry\Component\Request\Request;
use Gantry\Component\Response\JsonResponse;
use Gantry\Component\Response\Response;
use Gantry\Component\Router\Router as BaseRouter;
use Joomla\Registry\Registry;

class Router extends BaseRouter
{
    public function boot()
    {
        \JHtml::_('behavior.keepalive');

        $app = \JFactory::getApplication();
        $input = $app->input;

        /** @var Request $request */
        $request = $this->container['request'];

        $this->method = $request->getMethod();
        $this->path = explode('/', $input->getString('view'));
        $this->resource = array_shift($this->path) ?: 'themes';
        $this->format = $input->getCmd('format', 'html');
        $ajax = ($this->format == 'json');

        $this->params = [
            'user' => \JFactory::getUser(),
            'ajax' => $ajax,
            'location' => $this->resource,
            'method' => $this->method,
            'format' => $this->format,
            'params' => isset($_POST['params']) && is_string($_POST['params']) ? json_decode($_POST['params'], true) : []
        ];

        // If style is set, resolve the template and load it.
        $style = $input->getInt('style', 0);
        if ($style) {
            \JTable::addIncludePath(JPATH_ADMINISTRATOR . '/components/com_templates/tables');
            $table = \JTable::getInstance('Style', 'TemplatesTable');
            $table->load($style);

            $this->container['theme.path'] = JPATH_SITE . '/templates/' . $table->template;
            $this->container['theme.name'] = $table->template;
        }

        $this->container['base_url'] = \JUri::base(true) . '/index.php?option=com_gantry5';

        $this->container['ajax_suffix'] = '&format=json';

        $this->container['routes'] = [
            '1' => '&view=%s&style=' . $style,

            'themes' => '&view=themes',
            'picker/layouts' => '&view=layouts&style=' . $style,
            'picker/particles' => '&view=particles&style=' . $style
        ];
    }

    protected function send(Response $response)
    {
        // Output HTTP header.
        $app = \JFactory::getApplication();
        $document = \JFactory::getDocument();
        $document->setCharset($response->charset);
        $document->setMimeEncoding($response->mimeType);

        header("HTTP/1.1 {$response->getStatus()}", true, $response->getStatusCode());
        header("Content-Type: {$response->mimeType}; charset={$response->charset}");
        foreach ($response->getHeaders() as $key => $values) {
            $replace = true;
            foreach ($values as $value) {
                $app->setHeader($key, $value, $replace);
                $replace = false;
            }
        }
        echo $response;

        if ($response instanceof JsonResponse) {
            // It is much faster and safer to exit now than to let Joomla to send the response.
            $app->sendHeaders();
            $app->close();
        }
    }
}
