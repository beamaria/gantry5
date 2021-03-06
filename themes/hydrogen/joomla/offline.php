<?php
defined('_JEXEC') or die;

// Bootstrap Gantry framework or fail gracefully (inside included file).
$gantry = include __DIR__ . '/includes/gantry.php';

/** @var \Gantry\Framework\Theme $theme */
$theme = $gantry['theme'];

ob_start();
include JPATH_THEMES . '/system/offline.php';
$html = ob_get_clean();
$start = strpos($html, '<body>') + 6;
$end = strpos($html, '</body>', $start);

$context = array(
    'message' => substr($html, $start, $end - $start)
);

// Render the page.
echo $theme
    ->setLayout('_offline')
    ->render('offline.html.twig', $context);
