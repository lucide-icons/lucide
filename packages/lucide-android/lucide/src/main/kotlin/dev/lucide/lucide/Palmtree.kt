package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Palmtree: ImageVector
    get() {
        if (_palmtree != null) {
            return _palmtree!!
        }
        _palmtree = Builder(name = "Palmtree", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(13.0f, 8.0f)
                curveToRelative(0.0f, -2.76f, -2.46f, -5.0f, -5.5f, -5.0f)
                reflectiveCurveTo(2.0f, 5.24f, 2.0f, 8.0f)
                horizontalLineToRelative(2.0f)
                lineToRelative(1.0f, -1.0f)
                lineToRelative(1.0f, 1.0f)
                horizontalLineToRelative(4.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(13.0f, 7.14f)
                arcTo(5.82f, 5.82f, 0.0f, false, true, 16.5f, 6.0f)
                curveToRelative(3.04f, 0.0f, 5.5f, 2.24f, 5.5f, 5.0f)
                horizontalLineToRelative(-3.0f)
                lineToRelative(-1.0f, -1.0f)
                lineToRelative(-1.0f, 1.0f)
                horizontalLineToRelative(-3.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(5.89f, 9.71f)
                curveToRelative(-2.15f, 2.15f, -2.3f, 5.47f, -0.35f, 7.43f)
                lineToRelative(4.24f, -4.25f)
                lineToRelative(0.7f, -0.7f)
                lineToRelative(0.71f, -0.71f)
                lineToRelative(2.12f, -2.12f)
                curveToRelative(-1.95f, -1.96f, -5.27f, -1.8f, -7.42f, 0.35f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(11.0f, 15.5f)
                curveToRelative(0.5f, 2.5f, -0.17f, 4.5f, -1.0f, 6.5f)
                horizontalLineToRelative(4.0f)
                curveToRelative(2.0f, -5.5f, -0.5f, -12.0f, -1.0f, -14.0f)
            }
        }
        .build()
        return _palmtree!!
    }

private var _palmtree: ImageVector? = null
